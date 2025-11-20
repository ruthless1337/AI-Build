import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Key } from 'lucide-react';

export default function ChatArea({ messages, isLoading, activeTool, hasApiKey, openApiModal }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-8">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold mb-4">AI Lead Qualification</h1>
          <p className="text-gray-400 text-center max-w-2xl mb-8">
            Let AI agents automatically qualify leads, score prospects, and route hot opportunities to your sales team.
          </p>
          <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-6 max-w-md">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Key className="w-5 h-5 text-blue-500" />
              Erste Schritte
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Um die AI zu nutzen, benötigst du einen OpenAI API Key oder verbinde dich mit dem Backend.
            </p>
            <button
              onClick={openApiModal}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg transition-colors text-sm"
            >
              API Key einrichten
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} activeTool={activeTool} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-black-600 rounded-full"></div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}