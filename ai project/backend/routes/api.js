import express from 'express';
import OpenAI from 'openai';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.get('/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

router.post('/chat', authenticate, async (req, res) => {
  try {
    const { messages, model = 'gpt-4', temperature = 0.7, max_tokens = 2000 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Messages array is required'
      });
    }

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens
    });

    res.json({
      success: true,
      data: {
        content: completion.choices[0].message.content,
        model: completion.model,
        usage: completion.usage
      }
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(error.status || 500).json({
      error: 'API Error',
      message: error.message || 'Failed to generate response'
    });
  }
});

router.post('/image', authenticate, async (req, res) => {
  try {
    const { prompt, model = 'dall-e-3', size = '1024x1024', quality = 'standard', n = 1 } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Prompt is required'
      });
    }

    const response = await openai.images.generate({
      model,
      prompt,
      n,
      size,
      quality
    });

    res.json({
      success: true,
      data: {
        url: response.data[0].url,
        revised_prompt: response.data[0].revised_prompt
      }
    });

  } catch (error) {
    console.error('Image API Error:', error);
    res.status(error.status || 500).json({
      error: 'API Error',
      message: error.message || 'Failed to generate image'
    });
  }
});

router.post('/code', authenticate, async (req, res) => {
  try {
    const { prompt, language = 'javascript' } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Prompt is required'
      });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `You are an expert programmer. Generate clean, well-documented ${language} code. Only return the code without explanations unless asked.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 3000
    });

    res.json({
      success: true,
      data: {
        code: completion.choices[0].message.content,
        language,
        usage: completion.usage
      }
    });

  } catch (error) {
    console.error('Code API Error:', error);
    res.status(error.status || 500).json({
      error: 'API Error',
      message: error.message || 'Failed to generate code'
    });
  }
});

router.post('/chat/stream', authenticate, async (req, res) => {
  try {
    const { messages, model = 'gpt-4' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Messages array is required'
      });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const stream = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
      temperature: 0.7
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Stream API Error:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});

export default router;