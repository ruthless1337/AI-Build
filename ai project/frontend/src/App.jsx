import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import InputArea from './components/InputArea';
import Header from './components/Header';
import ApiKeyModal from './components/ApiKeyModal';
import { useChat } from './hooks/useChat';
import { useApiKey } from './hooks/useApiKey';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showApiModal, setShowApiModal] = useState(false);
  const { apiKey, backendKey, setApiKey, setBackendKey } = useApiKey();
  const { messages, isLoading, activeTool, setActiveTool, sendMessage, clearChat } = useChat(apiKey, backendKey);

  return (
    <div className="flex h-screen bg-[#1a1a1a] text-gray-200">
      <ApiKeyModal
        show={showApiModal}
        onClose={() => setShowApiModal(false)}
        apiKey={apiKey}
        backendKey={backendKey}
        setApiKey={setApiKey}
        setBackendKey={setBackendKey}
      />

      <Sidebar
        sidebarOpen={sidebarOpen}
        activeTool={activeTool}
        setActiveTool={setActiveTool}
        clearChat={clearChat}
        openApiModal={() => setShowApiModal(true)}
        hasApiKey={!!apiKey || !!backendKey}
      />

      <div className="flex-1 flex flex-col">
        <Header
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <ChatArea
          messages={messages}
          isLoading={isLoading}
          activeTool={activeTool}
          hasApiKey={!!apiKey || !!backendKey}
          openApiModal={() => setShowApiModal(true)}
        />

        <InputArea
          onSend={sendMessage}
          isLoading={isLoading}
          activeTool={activeTool}
          hasApiKey={!!apiKey || !!backendKey}
        />
      </div>
    </div>
  );
}