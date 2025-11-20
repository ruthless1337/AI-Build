import React from 'react';

export default function MessageBubble({ message, activeTool }) {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-[#2a2a2a] rounded-2xl px-4 py-3' : ''}`}>
        {message.type !== 'user' && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-black-600 rounded-full"></div>
            {message.content && <span className="text-xs text-gray-400">{message.type === 'image' ? 'Image Created' : activeTool}</span>}
          </div>
        )}
        
        {message.image && (
          <img
            src={message.image}
            alt="Generated"
            className="rounded-xl shadow-lg w-full max-w-md"
          />
        )}
        
        {message.type === 'code' ? (
          <pre className="bg-[#0f0f0f] p-4 rounded-lg overflow-x-auto text-sm border border-[#2a2a2a]">
            <code className="text-green-400">{message.content}</code>
          </pre>
        ) : message.type === 'error' ? (
          <div className="bg-red-900/20 border border-red-800 text-red-400 p-4 rounded-lg text-sm">
            {message.content}
          </div>
        ) : (
          !message.image && <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
}