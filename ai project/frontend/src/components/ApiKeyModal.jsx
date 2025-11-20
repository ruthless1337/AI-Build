import React, { useState } from 'react';
import { Key, X } from 'lucide-react';

export default function ApiKeyModal({ show, onClose, apiKey, backendKey, setApiKey, setBackendKey }) {
  const [tempApiKey, setTempApiKey] = useState(apiKey || '');
  const [tempBackendKey, setTempBackendKey] = useState(backendKey || '');
  const [useBackend, setUseBackend] = useState(false);

  if (!show) return null;

  const handleSave = () => {
    if (useBackend) {
      setBackendKey(tempBackendKey);
      setApiKey('');
    } else {
      setApiKey(tempApiKey);
      setBackendKey('');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#2a2a2a] rounded-2xl p-6 w-full max-w-md border border-[#3a3a3a] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Key className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold">API Einstellungen</h2>
        </div>

        {/* Toggle zwischen Direct und Backend */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUseBackend(false)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm transition-colors ${
              !useBackend ? 'bg-blue-600 text-white' : 'bg-[#1a1a1a] text-gray-400'
            }`}
          >
            Direct OpenAI
          </button>
          <button
            onClick={() => setUseBackend(true)}
            className={`flex-1 py-2 px-4 rounded-lg text-sm transition-colors ${
              useBackend ? 'bg-blue-600 text-white' : 'bg-[#1a1a1a] text-gray-400'
            }`}
          >
            Backend API
          </button>
        </div>

        {!useBackend ? (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Gib deinen OpenAI API Key ein. Dieser wird lokal im Browser gespeichert.
            </p>
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 mb-4"
            />
            <p className="text-xs text-gray-500 mb-4">
              Deinen API Key erhältst du auf: <br/>
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                platform.openai.com/api-keys
              </a>
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400 mb-4">
              Gib deinen Backend API Key ein (aus .env: API_SECRET_KEY).
            </p>
            <input
              type="password"
              value={tempBackendKey}
              onChange={(e) => setTempBackendKey(e.target.value)}
              placeholder="Backend API Key"
              className="w-full bg-[#1a1a1a] border border-[#3a3a3a] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 mb-4"
            />
            <p className="text-xs text-gray-500 mb-4">
              Das Backend muss unter <code className="bg-[#1a1a1a] px-2 py-1 rounded">http://localhost:5000</code> laufen.
            </p>
          </>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-[#3a3a3a] hover:bg-[#4a4a4a] py-2 rounded-lg transition-colors"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            disabled={useBackend ? !tempBackendKey.trim() : !tempApiKey.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 py-2 rounded-lg transition-colors"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}