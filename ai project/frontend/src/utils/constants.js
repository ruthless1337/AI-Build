/**
 * Application Constants
 */

export const TOOLS = [
    {
      name: 'Image Creator',
      icon: 'Image',
      description: 'Erstelle Bilder mit DALL-E 3',
      model: 'dall-e-3',
      type: 'image'
    },
    {
      name: 'Image Enhance',
      icon: 'Sparkles',
      description: 'Verbessere und optimiere Bilder',
      model: 'dall-e-3',
      type: 'image'
    },
    {
      name: 'Video Creator',
      icon: 'Video',
      description: 'Erstelle Video-Skripte und Konzepte',
      model: 'gpt-4',
      type: 'text'
    },
    {
      name: 'Text Creator',
      icon: 'FileText',
      description: 'Generiere hochwertige Texte',
      model: 'gpt-4',
      type: 'text'
    },
    {
      name: 'Code Composer',
      icon: 'Code',
      description: 'Schreibe und optimiere Code',
      model: 'gpt-4',
      type: 'code'
    },
    {
      name: 'Website Builder',
      icon: 'Globe',
      description: 'Erstelle vollständige Websites',
      model: 'gpt-4',
      type: 'code'
    }
  ];
  
  export const MODELS = {
    GPT4: 'gpt-4',
    GPT4_TURBO: 'gpt-4-turbo-preview',
    GPT35: 'gpt-3.5-turbo',
    DALLE3: 'dall-e-3',
    DALLE2: 'dall-e-2'
  };
  
  export const IMAGE_SIZES = {
    SMALL: '256x256',
    MEDIUM: '512x512',
    LARGE: '1024x1024',
    DALLE3_SQUARE: '1024x1024',
    DALLE3_PORTRAIT: '1024x1792',
    DALLE3_LANDSCAPE: '1792x1024'
  };
  
  export const API_ENDPOINTS = {
    CHAT: '/chat',
    IMAGE: '/image',
    CODE: '/code',
    STREAM: '/chat/stream',
    HEALTH: '/health'
  };
  
  export const ERROR_MESSAGES = {
    NO_API_KEY: 'Bitte setze zuerst deinen API Key in den Einstellungen.',
    API_ERROR: 'Ein Fehler ist bei der API-Anfrage aufgetreten.',
    NETWORK_ERROR: 'Netzwerkfehler. Bitte überprüfe deine Internetverbindung.',
    RATE_LIMIT: 'Rate Limit erreicht. Bitte warte einen Moment.',
    INVALID_REQUEST: 'Ungültige Anfrage. Bitte überprüfe deine Eingabe.'
  };
  
  export const SUCCESS_MESSAGES = {
    API_KEY_SAVED: 'API Key erfolgreich gespeichert!',
    MESSAGE_SENT: 'Nachricht gesendet!',
    IMAGE_GENERATED: 'Bild erfolgreich generiert!',
    CODE_GENERATED: 'Code erfolgreich generiert!'
  };