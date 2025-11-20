import { useState, useEffect } from 'react';

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState('');
  const [backendKey, setBackendKeyState] = useState('');

  useEffect(() => {
    const savedApiKey = localStorage.getItem('openai_api_key');
    const savedBackendKey = localStorage.getItem('backend_api_key');
    
    if (savedApiKey) setApiKeyState(savedApiKey);
    if (savedBackendKey) setBackendKeyState(savedBackendKey);
  }, []);

 // api save shit 
  const setApiKey = (key) => {
    if (key) {
      localStorage.setItem('openai_api_key', key);
      localStorage.removeItem('backend_api_key');
    } else {
      localStorage.removeItem('openai_api_key');
    }
    setApiKeyState(key);
  };

  const setBackendKey = (key) => {
    if (key) {
      localStorage.setItem('backend_api_key', key);
      localStorage.removeItem('openai_api_key');
    } else {
      localStorage.removeItem('backend_api_key');
    }
    setBackendKeyState(key);
  };

  const clearKeys = () => {
    localStorage.removeItem('openai_api_key');
    localStorage.removeItem('backend_api_key');
    setApiKeyState('');
    setBackendKeyState('');
  };

  return {
    apiKey,
    backendKey,
    setApiKey,
    setBackendKey,
    clearKeys,
    hasKey: !!(apiKey || backendKey),
    isUsingBackend: !!backendKey && !apiKey
  };
}