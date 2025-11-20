import React from 'react';
import { Image, Sparkles, Video, FileText, Code, Globe, Menu, Settings } from 'lucide-react';

const tools = [
  { name: 'Image Creator', icon: Image },
  { name: 'Image Enhance', icon: Sparkles },
  { name: 'Video Creator', icon: Video },
  { name: 'Text Creator', icon: FileText },
  { name: 'Code Composer', icon: Code },
  { name: 'Website Builder', icon: Globe }
];

export default function Sidebar({ sidebarOpen, activeTool, setActiveTool, clearChat, openApiModal, hasApiKey }) {
  return (
    <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-[#0f0f0f] border-r border-[#2a2a2a] flex flex-col overflow-hidden`}>
      {/* Logo */}
      <div className="p-5 flex items-center justify-between border-b border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-black-600 rounded-lg flex items-center justify-center font-bold text-white">
            C
          </div>
          <div className="w-8 h-8 border border-[#3a3a3a] rounded-lg flex items-center justify-center">
            <Menu className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <button 
          onClick={clearChat}
          className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-gray-200 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium"
        >
          New Chat
        </button>
      </div>

      {/* Tools Section */}
      <div className="px-4 py-2 flex-1 overflow-y-auto">
        <div className="text-xs text-gray-500 mb-3 font-medium">Tools</div>
        <div className="space-y-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.name}
                onClick={() => setActiveTool(tool.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                  activeTool === tool.name
                    ? 'bg-[#2a2a2a] text-white'
                    : 'text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-[#2a2a2a]">
        <button
          onClick={openApiModal}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm text-gray-400 hover:bg-[#1f1f1f] hover:text-gray-200"
        >
          <Settings className="w-4 h-4" />
          <span>API Einstellungen</span>
        </button>
        {hasApiKey && (
          <div className="mt-2 text-xs text-green-500 flex items-center gap-2 px-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            API Key gesetzt
          </div>
        )}
      </div>
    </div>
  );
}