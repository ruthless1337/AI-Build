import React from 'react';
import { Search, Menu } from 'lucide-react';

export default function Header({ toggleSidebar }) {
  return (
    <div className="h-16 border-b border-[#2a2a2a] flex items-center justify-between px-6">
      <button
        onClick={toggleSidebar}
        className="p-2 hover:bg-[#2a2a2a] rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg pl-10 pr-20 py-2 text-sm focus:outline-none focus:border-[#4a4a4a] w-80"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">⌘K</span>
        </div>
        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-black-600 rounded-full"></div>
      </div>
    </div>
  );
}