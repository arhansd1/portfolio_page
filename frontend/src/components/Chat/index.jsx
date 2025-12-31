import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SelectionUI from './SelectionUI';
import { sendChatMessage } from '../../services/api';
import { MessageCircle } from 'lucide-react';
import { ALL_EXPERIENCES, ALL_PROJECTS } from '../../data/portfolioItems';

export default function Chat({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello!!! I can help you know more about me , my experience or my Projects . What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationState, setConversationState] = useState(null);
  const [needs_interrupt, setNeedsInterrupt] = useState(false); 
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper function to get selection options based on current topic
  const getSelectionOptions = () => {
    const topic = conversationState?.current_topic;
    
    if (topic === 'experience') {
      return ALL_EXPERIENCES;
    } else if (topic === 'projects') {
      return ALL_PROJECTS;
    } else {
      // If topic is null, show both
      return [...ALL_EXPERIENCES, ...ALL_PROJECTS];
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    
    try {
      const data = await sendChatMessage(
        [...messages, { role: 'user', content: userMessage }],
        conversationState
      );
      
      console.log('Response data:', data);
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      setConversationState(data.state);
      
      // Check if HITL triggered
      if (data.needs_interrupt) {
        console.log('Interrupt triggered');
        setNeedsInterrupt(true);
      } else {
        setNeedsInterrupt(false);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }
    
    setLoading(false);
  };

  // Handle selection from UI
  const handleSelection = async (selectedOption) => {
    console.log('Selection made:', selectedOption);
    
    // Add selection to messages as JSON
    const selectionMessage = JSON.stringify(selectedOption);
    setMessages(prev => [...prev, { 
      role: 'user', 
      content: `Selected: ${selectedOption.display}` 
    }]);
    
    // Clear selection UI
    setNeedsInterrupt(false);
    setLoading(true);
    
    try {
      const data = await sendChatMessage(
        [...messages, { role: 'user', content: selectionMessage }],
        conversationState
      );
      
      console.log('Response after selection:', data);
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
      setConversationState(data.state);
      
      // Check if another interrupt is needed (shouldn't happen normally)
      if (data.needs_interrupt) {
        setNeedsInterrupt(true);
      }
    } catch (error) {
      console.error('Selection error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) {
    return (
      <>
        {/* Info Panel - Hidden when chat is open */}
        <div className="w-1/3 flex flex-col items-center justify-center px-16 py-12">
          <div className="max-w-lg space-y-10 text-gray-300">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-light text-white leading-snug">
                <span className="font-semibold">Want to know more about my</span>
                <br />
                <span className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                  work & experience?
                </span>
              </h2>
              <p className="text-lg text-gray-400">
                Chat with my AI-powered assistant!
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                <p className="text-base text-gray-300 leading-relaxed">
                  It <span className="text-purple-400 font-semibold">remembers everything</span> about my projects and technical background
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                <p className="text-base text-gray-300 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Intelligently navigates</span> you to the exact section you're looking for
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0"></div>
                <p className="text-base text-gray-300 leading-relaxed">
                  Ask <span className="text-pink-400 font-semibold">anything</span> - from tech stacks to project details
                </p>
              </div>
            </div>

            {/* Arrow pointing down to chat button */}
            <div className="absolute right-2 bottom-20 flex flex-col items-center gap-2">
              <span className="text-blue-400 text-xl font-semibold animate-pulse">Start Chatting!</span>
              <svg className="w-12 h-12 text-blue-400 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Chat Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-12 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      </>
    );
  }

  return (
    <div 
      className="fixed top-0 right-0 h-full w-1/3 flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden shadow-2xl" 
      ref={chatContainerRef} 
      style={{ zIndex: 50 }}
    >
      {/* Header */}
      <div className="bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 p-5 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)] animate-pulse"></div>
          <h3 className="font-medium text-gray-200 text-[15px] tracking-wide">Chat with me</h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        
        {/* Selection UI when needs_interrupt */}
        {needs_interrupt && !loading && (
          <SelectionUI 
            options={getSelectionOptions()}
            onSelect={handleSelection}
          />
        )}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl px-4 py-3 max-w-xs">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm p-4">
        <ChatInput 
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading || needs_interrupt}
        />
      </div>
    </div>
  );
}