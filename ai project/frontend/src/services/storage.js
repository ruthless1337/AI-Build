/**
 * Local Storage Helper Functions
 */

const STORAGE_KEYS = {
    OPENAI_API_KEY: 'openai_api_key',
    BACKEND_API_KEY: 'backend_api_key',
    CHAT_HISTORY: 'chat_history',
    USER_PREFERENCES: 'user_preferences',
    ACTIVE_TOOL: 'active_tool'
  };
  
  /**
   * Save data to localStorage
   */
  export function saveToStorage(key, data) {
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }
  
  /**
   * Load data from localStorage
   */
  export function loadFromStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  }
  
  /**
   * Remove data from localStorage
   */
  export function removeFromStorage(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
  
  /**
   * Clear all app data from localStorage
   */
  export function clearAllStorage() {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
  
  /**
   * Save chat history
   */
  export function saveChatHistory(messages) {
    return saveToStorage(STORAGE_KEYS.CHAT_HISTORY, messages);
  }
  
  /**
   * Load chat history
   */
  export function loadChatHistory() {
    return loadFromStorage(STORAGE_KEYS.CHAT_HISTORY, []);
  }
  
  /**
   * Save user preferences
   */
  export function savePreferences(preferences) {
    return saveToStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }
  
  /**
   * Load user preferences
   */
  export function loadPreferences() {
    return loadFromStorage(STORAGE_KEYS.USER_PREFERENCES, {
      theme: 'dark',
      language: 'de',
      defaultModel: 'gpt-4'
    });
  }
  
  /**
   * Save active tool
   */
  export function saveActiveTool(toolName) {
    return saveToStorage(STORAGE_KEYS.ACTIVE_TOOL, toolName);
  }
  
  /**
   * Load active tool
   */
  export function loadActiveTool() {
    return loadFromStorage(STORAGE_KEYS.ACTIVE_TOOL, 'Text Creator');
  }
  
  /**
   * Check if storage is available
   */
  export function isStorageAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  /**
   * Get storage size (approximate)
   */
  export function getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2) + ' KB';
  }
  
  export { STORAGE_KEYS };