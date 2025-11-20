import React, { useState } from 'react';
import { Send, Plus } from 'lucide-react';

export default function InputArea({ onSend, isLoading, activeTool, hasApiKey }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || isLoading || !hasApiKey) return;
    onSend(input);
    setInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#2a2a2a] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#2a2a2a] rounded-2xl border border-[#3a3a3a] focus-within:border-[#4a4a4a] transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Schreibe eine Nachricht an ${activeTool}...`}
            className="w-full bg-transparent px-5 py-4 text-sm resize-none focus:outline-none"
            rows="3"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex gap-2">
              <button className="p-2 hover:bg-[#3a3a3a] rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !hasApiKey}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed p-2.5 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
        {!hasApiKey && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Setze deinen API Key in den Einstellungen, um die AI zu nutzen
          </p>
        )}
      </div>
    </div>
  );
}