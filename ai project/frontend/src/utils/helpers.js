/**
 * Helper Utility Functions
 */

/**
 * Format timestamp to readable string
 */
export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
  
    // 1 minute
    if (diff < 60000) {
      return 'Gerade eben';
    }
  
    // 1 hour
    if (diff < 3600000) {
      const minutes = Math.floor(diff / 60000);
      return `Vor ${minutes} Minute${minutes > 1 ? 'n' : ''}`;
    }
  
    // 1 day
    if (diff < 86400000) {
      const hours = Math.floor(diff / 3600000);
      return `Vor ${hours} Stunde${hours > 1 ? 'n' : ''}`;
    }
  
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  export function validateApiKey(key) {
    if (!key) return false;
    
    if (key.startsWith('sk-')) {
      return key.length > 20;
    }
    
    return key.length >= 8;
  }
  
  export async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.error('Copy to clipboard failed:', error);
      return false;
    }
  }
  
  export function downloadAsFile(content, filename = 'download.txt', mimeType = 'text/plain') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  export function detectCodeLanguage(code) {
    const languagePatterns = {
      javascript: /\b(const|let|var|function|=>|console\.log)\b/,
      python: /\b(def|import|from|print|if __name__)\b/,
      html: /<\/?[a-z][\s\S]*>/i,
      css: /\{[\s\S]*:[^}]+\}/,
      java: /\b(public|private|class|void|static)\b/,
      cpp: /\b(#include|iostream|std::)\b/
    };
  
    for (const [lang, pattern] of Object.entries(languagePatterns)) {
      if (pattern.test(code)) {
        return lang;
      }
    }
  
    return 'text';
  }
  
  export function formatCode(code, language = 'javascript') {
    try {
      return code.trim();
    } catch (error) {
      return code;
    }
  }
  
  export function parseErrorMessage(error) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    return 'Ein unbekannter Fehler ist aufgetreten.';
  }
  
  export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  export function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }
  
  export function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
  }

  export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }