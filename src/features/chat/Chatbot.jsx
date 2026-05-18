import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentToken, LogOut } from '../auth/authSlice';
import toast from 'react-hot-toast';
import { 
  FileText, 
  Trash2, 
  UploadCloud, 
  Send, 
  Database, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  FolderOpen,
  PlusCircle,
  MessageSquare,
  Calendar,
  Star,
  Eye,
  Cpu,
  Layers,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const Chatbot = ({ 
  initialCreateView = false,
  activeChatId,
  setActiveChatId,
  chatSessions = [],
  fetchChatSessions,
  remainingSlots = 10,
  handleToggleStar
}) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showCreateView, setShowCreateView] = useState(false);
  const [widgetTab, setWidgetTab] = useState('preview');
  const token = useSelector(selectCurrentToken);

  const fetchChatHistory = async (chatId) => {
    if (!token || !chatId) return;
    try {
      const response = await fetch(`http://localhost:8000/chats/${chatId}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store'
      });
      if (response.status === 401) {
        dispatch(LogOut());
        return;
      }
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setMessages(data);
        } else {
          const currentSession = chatSessions.find(s => s.chat_id === chatId);
          const fname = currentSession ? currentSession.filename : 'your file';
          setMessages([
            { role: 'bot', text: `Hello! I have loaded your file "${fname}" for this chat. Ask me any questions about its contents!` }
          ]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch chat history:', error);
    }
  };

  useEffect(() => {
    if (activeChatId) {
      fetchChatHistory(activeChatId);
      setShowCreateView(false);
    } else {
      setMessages([]);
    }
  }, [activeChatId, chatSessions]);

  useEffect(() => {
    if (initialCreateView) {
      setShowCreateView(true);
      setActiveChatId(null);
    }
  }, [initialCreateView]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeChatId) return;

    const userMessage = { role: 'user', text: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/query', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          question: userMessage.text,
          chat_id: activeChatId
        }),
      });

      if (response.status === 401) {
        dispatch(LogOut());
        return;
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botMessage = { 
        role: 'bot', 
        text: data.answer,
        sources: data.sources
      };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error('Error fetching from chat API:', error);
      const errorMessage = { role: 'bot', text: 'Sorry, there was an error processing your request.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDatabase = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/ingest', {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        alert("Knowledge database successfully updated!");
      } else {
        alert("Failed to update database.");
      }
    } catch (error) {
      console.error("Update DB error:", error);
      alert("Error updating database.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleCreateSession(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      await handleCreateSession(e.target.files[0]);
    }
  };

  const handleCreateSession = async (file) => {
    if (remainingSlots <= 0) {
      alert("You have reached the maximum limit of 10 chat sessions. Please delete an existing session first.");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch('http://localhost:8000/chat-sessions', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.status === 401) {
        dispatch(LogOut());
        return;
      }

      if (response.ok) {
        const data = await response.json();
        toast.success(`File "${data.filename}" uploaded successfully!`);
        await fetchChatSessions(data.chat_id);
      } else {
        const errorData = await response.json();
        toast.error(`Failed to create chat: ${errorData.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Create session error:", error);
      toast.error("Error creating chat session.");
    } finally {
      setIsLoading(false);
      const fileInput = document.getElementById('file-upload-input');
      if (fileInput) fileInput.value = '';
    }
  };

  const currentSession = chatSessions.find(s => s.chat_id === activeChatId);
  const currentFilename = currentSession?.filename || 'Document';
  const downloadUrl = `http://localhost:8000/user-files/${encodeURIComponent(currentFilename)}/download`;
  const viewUrl = `http://localhost:8000/user-files/${encodeURIComponent(currentFilename)}/view`;

  let formattedDate = 'Recently uploaded';
  if (currentSession?.created_at) {
    try {
      formattedDate = new Date(currentSession.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch(e){}
  }

  return (
    <div className="w-full h-[calc(100vh-12rem)] min-h-[550px] overflow-hidden flex flex-col">
      {showCreateView || !activeChatId ? (
        <div className="flex-1 bg-[#13141A] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-xl">
          {/* Create New Chat Session Screen */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white/[0.002]">
            <div className="max-w-md w-full flex flex-col items-center gap-6">
              <div className="size-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center">
                <PlusCircle className="size-8 text-indigo-400" />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold mb-2">Start a New Conversation</h2>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  Upload a single document (PDF, DOCX, TXT) to create a dedicated chat room.
                  Our AI will extract and search answers exclusively from this file.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                  isDragging 
                    ? 'border-indigo-500 bg-indigo-500/5 text-indigo-400' 
                    : 'border-white/5 bg-white/[0.005] hover:bg-white/[0.01] text-gray-400 hover:text-gray-300'
                } ${remainingSlots === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {remainingSlots > 0 ? (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <UploadCloud className={`size-10 ${isDragging ? 'text-indigo-400 animate-bounce' : 'text-gray-500'}`} />
                    <p className="text-sm">
                      Drag & drop your document here, or{' '}
                      <label className="text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer underline transition-colors">
                        browse files
                        <input id="file-upload-input" type="file" className="hidden" onChange={handleFileInput} />
                      </label>
                    </p>
                    <span className="text-xs text-gray-500 font-light">Supports PDF, DOCX, TXT up to 10MB</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 text-red-400 text-sm font-light py-2">
                    <Trash2 className="size-8 opacity-75 mb-1" />
                    <span>You have reached your limit of 10 chat sessions. Delete an existing conversation to create a new one.</span>
                  </div>
                )}
              </div>

              {chatSessions.length > 0 && (
                <button
                  onClick={() => {
                    setShowCreateView(false);
                    setActiveChatId(chatSessions[0].chat_id);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-400 font-light transition-colors"
                >
                  Cancel and return to active chat
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
          {/* Left Panel: Document Preview Widget */}
          <div className="w-full lg:w-5/12 bg-[#13141A] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-xl shrink-0">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="size-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <FileText className="size-4 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white text-base font-bold truncate" title={currentFilename}>
                    {currentFilename}
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide">
                    <Sparkles className="size-3 animate-pulse" />
                    <span>Indexed Workspace</span>
                  </span>
                </div>
              </div>

              <a 
                href={downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer shrink-0"
                title="Open Document in New Tab"
              >
                <ExternalLink className="size-4" />
              </a>
            </div>

            {/* Premium Tab Buttons */}
            <div className="flex border-b border-white/5 p-1 bg-white/[0.01]">
              <button
                onClick={() => setWidgetTab('preview')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  widgetTab === 'preview' 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Eye className="size-4" />
                <span>Live Preview</span>
              </button>
              <button
                onClick={() => setWidgetTab('metadata')}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  widgetTab === 'metadata' 
                    ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Cpu className="size-4" />
                <span>RAG Metadata</span>
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
              {widgetTab === 'preview' ? (
                <div className="flex-1 w-full h-full bg-white relative overflow-hidden flex flex-col">
                  <iframe 
                    src={viewUrl}
                    className="w-full flex-1 border-0 bg-white"
                    title="Document Preview"
                  />
                  <div className="p-2 bg-gray-900 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400 px-4 shrink-0">
                    <span>Format: {currentFilename.split('.').pop()?.toUpperCase() || 'PDF'}</span>
                    <a href={downloadUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline flex items-center gap-1 font-semibold">
                      <span>Pop out viewer</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto p-6 space-y-6 text-base font-light text-gray-300 custom-scrollbar">
                  <div className="flex flex-col gap-1 border-b border-white/5 pb-4">
                    <span className="text-indigo-400 text-xs font-extrabold uppercase tracking-wider">Vector Embedding Status</span>
                    <h4 className="text-white font-extrabold text-lg">Active Memory Node</h4>
                    <p className="text-gray-300 text-sm mt-1 leading-relaxed">
                      This document is chunked and stored in the localized FAISS vector index. The private RAG agent dynamically searches these chunks during conversation.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1C1D24] border border-white/5 p-4 rounded-xl flex flex-col gap-1">
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Embedding Model</span>
                      <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-0.5">
                        <Sparkles className="size-3.5 text-indigo-400" />
                        <span>all-MiniLM-L6-v2</span>
                      </span>
                    </div>
                    <div className="bg-[#1C1D24] border border-white/5 p-4 rounded-xl flex flex-col gap-1">
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Dimensions</span>
                      <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-0.5">
                        <Layers className="size-3.5 text-indigo-400" />
                        <span>384 Vectors</span>
                      </span>
                    </div>
                    <div className="bg-[#1C1D24] border border-white/5 p-4 rounded-xl flex flex-col gap-1">
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Uploaded</span>
                      <span className="text-white font-bold text-sm flex items-center gap-1.5 mt-0.5">
                        <Calendar className="size-3.5 text-indigo-400" />
                        <span>{formattedDate}</span>
                      </span>
                    </div>
                    <div className="bg-[#1C1D24] border border-white/5 p-4 rounded-xl flex flex-col gap-1">
                      <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Privacy Shield</span>
                      <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 mt-0.5">
                        <ShieldCheck className="size-3.5 text-emerald-400" />
                        <span>Isolated Vault</span>
                      </span>
                    </div>
                  </div>

                  <div className="bg-indigo-600/5 border border-indigo-500/10 p-4 rounded-xl flex flex-col gap-2">
                    <span className="text-indigo-400 text-base font-extrabold uppercase tracking-wide">How citations work</span>
                    <span className="text-gray-100 text-base font-semibold leading-relaxed tracking-wide">
                      When the chatbot replies, it includes exact similarity scores and source filenames. You can reference the original document here on the left to verify the information instantly.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Active Chat Thread */}
          <div className="flex-1 bg-[#13141A] border border-white/5 rounded-2xl flex flex-col overflow-hidden shadow-xl min-w-[320px]">
            {/* Chat Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-4">
                <Bot className="size-5 text-indigo-500 animate-pulse shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-white text-lg font-bold truncate">
                      Chat: {chatSessions.find(s => s.chat_id === activeChatId)?.filename || 'Document'}
                    </h2>
                    {handleToggleStar && (
                      <button
                        onClick={() => handleToggleStar(activeChatId)}
                        className="text-gray-500 hover:text-yellow-400 p-1 transition-all rounded hover:bg-white/5 shrink-0"
                        title={chatSessions.find(s => s.chat_id === activeChatId)?.is_starred ? "Unstar Chat" : "Star Chat"}
                      >
                        <Star className={`size-4 ${chatSessions.find(s => s.chat_id === activeChatId)?.is_starred ? 'text-yellow-400 fill-yellow-400' : ''}`} />
                      </button>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>Retrieval-Augmented Generation (RAG) Active</span>
                  </span>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((msg, index) => {
                const isBot = msg.role === 'bot';
                return (
                  <div key={index} className={`flex w-full gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
                    {isBot && (
                      <div className="size-8 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                        <Bot className="size-4 text-indigo-400" />
                      </div>
                    )}
                    
                    <div className="flex flex-col max-w-[80%] gap-1">
                      <div className={`px-4 py-3 rounded-2xl text-base leading-relaxed ${
                        isBot 
                          ? 'bg-[#1C1D24] text-gray-200 border border-white/[0.03] rounded-tl-none' 
                          : 'bg-indigo-600 text-white rounded-tr-none shadow-[0_4px_12px_rgba(79,70,229,0.15)]'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        
                        {/* Sources */}
                        {isBot && msg.sources && msg.sources.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-white/5 text-[11px]">
                            <div className="flex items-center gap-1 text-gray-400 font-semibold mb-1">
                              <Sparkles className="size-3 text-indigo-400" />
                              <span>Sources:</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                              {msg.sources.map((src, i) => (
                                <span 
                                  key={i} 
                                  className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/5 text-gray-300 font-light truncate max-w-[200px]" 
                                  title={src.source}
                                >
                                  {src.source} ({Math.round(src.similarity * 100)}%)
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isBot && (
                      <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                        <User className="size-4 text-gray-300" />
                      </div>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex w-full gap-3 justify-start">
                  <div className="size-8 rounded-lg bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <Bot className="size-4 text-indigo-400" />
                  </div>
                  <div className="bg-[#1C1D24] border border-white/[0.03] rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                    <Loader2 className="size-4 text-indigo-400 animate-spin" />
                    <span className="text-gray-400 text-xs font-light">Thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Form */}
            <form className="p-6 pt-2 bg-white/[0.005] flex gap-2.5" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question about this document..."
                className="flex-1 bg-[#1C1D24] border border-white/5 hover:border-white/10 focus:border-indigo-500/50 text-white rounded-xl px-4 py-3 text-sm font-light outline-none transition-all placeholder:text-gray-500"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white font-medium rounded-xl transition-all cursor-pointer shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:shadow-none flex items-center justify-center shrink-0 gap-1.5 text-sm"
                disabled={isLoading || !inputValue.trim()}
              >
                <span>Send</span>
                <Send className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


