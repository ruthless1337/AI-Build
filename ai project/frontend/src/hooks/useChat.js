import { useState } from 'react';
import { callOpenAI, callBackendAPI } from '../services/openai';

export function useChat(apiKey, backendKey) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState('Text Creator');

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = {
      type: 'user',
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let aiResponse;

      if (backendKey) {
        aiResponse = await callBackendAPI(userInput, activeTool, backendKey);
      } 
      else if (apiKey) {
        aiResponse = await callOpenAI(userInput, activeTool, apiKey);
      } 
      else {
        aiResponse = {
          type: 'error',
          content: 'Bitte setze zuerst deinen API Key in den Einstellungen.'
        };
      }

      setMessages(prev => [...prev, {
        ...aiResponse,
        timestamp: new Date()
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        type: 'error',
        content: `Fehler: ${error.message}`,
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    isLoading,
    activeTool,
    setActiveTool,
    sendMessage,
    clearChat
  };
}