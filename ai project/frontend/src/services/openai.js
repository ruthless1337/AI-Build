import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api';

const toolConfigs = {
  'Image Creator': {
    type: 'image',
    model: 'dall-e-3',
    endpoint: '/image'
  },
  'Image Enhance': {
    type: 'image',
    model: 'dall-e-3',
    endpoint: '/image'
  },
  'Video Creator': {
    type: 'text',
    model: 'gpt-4',
    endpoint: '/chat',
    systemPrompt: 'Du bist ein Experte für Video-Skripte und Storytelling. Erstelle kreative und strukturierte Video-Skripte.'
  },
  'Text Creator': {
    type: 'text',
    model: 'gpt-4',
    endpoint: '/chat',
    systemPrompt: 'Du bist ein professioneller Texter. Erstelle hochwertige, gut strukturierte Texte.'
  },
  'Code Composer': {
    type: 'code',
    model: 'gpt-4',
    endpoint: '/code',
    systemPrompt: 'Du bist ein Experten-Programmierer. Gib immer vollständigen, funktionierenden Code zurück.'
  },
  'Website Builder': {
    type: 'code',
    model: 'gpt-4',
    endpoint: '/code',
    systemPrompt: 'Du bist ein Experte für Webentwicklung. Erstelle vollständige HTML/CSS/JS Websites.'
  }
};

export async function callBackendAPI(userInput, toolName, backendKey) {
  const config = toolConfigs[toolName] || toolConfigs['Text Creator'];

  try {
    if (config.type === 'image') {
      const response = await axios.post(
        `${BACKEND_URL}${config.endpoint}`,
        { prompt: userInput },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': backendKey
          }
        }
      );

      return {
        type: 'image',
        content: 'Image Created',
        image: response.data.data.url
      };
    } else if (config.type === 'code') {
      const response = await axios.post(
        `${BACKEND_URL}${config.endpoint}`,
        { 
          prompt: userInput,
          language: 'javascript'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': backendKey
          }
        }
      );

      return {
        type: 'code',
        content: response.data.data.code
      };
    } else {
      const response = await axios.post(
        `${BACKEND_URL}${config.endpoint}`,
        {
          messages: [
            { role: 'system', content: config.systemPrompt },
            { role: 'user', content: userInput }
          ],
          model: config.model
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': backendKey
          }
        }
      );

      return {
        type: 'text',
        content: response.data.data.content
      };
    }
  } catch (error) {
    console.error('Backend API Error:', error);
    throw new Error(error.response?.data?.message || error.message || 'Backend API call failed');
  }
}

// client side
export async function callOpenAI(userInput, toolName, apiKey) {
  const config = toolConfigs[toolName] || toolConfigs['Text Creator'];

  try {
    if (config.type === 'image') {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: userInput,
          n: 1,
          size: '1024x1024',
          quality: 'standard'
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Image generation failed');
      }

      const data = await response.json();
      return {
        type: 'image',
        content: 'Image Created',
        image: data.data[0].url
      };
    } else {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: config.model,
          messages: [
            { role: 'system', content: config.systemPrompt },
            { role: 'user', content: userInput }
          ],
          temperature: 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API call failed');
      }

      const data = await response.json();
      return {
        type: config.type,
        content: data.choices[0].message.content
      };
    }
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(error.message || 'OpenAI API call failed');
  }
}

export async function streamChat(userInput, toolName, backendKey, onChunk) {
  const config = toolConfigs[toolName] || toolConfigs['Text Creator'];

  try {
    const response = await fetch(`${BACKEND_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': backendKey
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: config.systemPrompt },
          { role: 'user', content: userInput }
        ],
        model: config.model
      })
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;
          
          try {
            const parsed = JSON.parse(data);
            if (parsed.content) {
              onChunk(parsed.content);
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Stream Error:', error);
    throw error;
  }
}