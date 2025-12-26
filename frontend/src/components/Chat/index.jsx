import { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickOptions from './QuickOptions';
import { sendChatMessage } from '../../services/api';
import { portfolioData } from '../../data/portfolioData';
import { MessageCircle } from 'lucide-react';

export default function Chat({ scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you learn about my background. What would you like to know?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
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

  const handleOptionClick = (option) => {
    setShowOptions(false);
    scrollToSection(option.section);
    
    let response = '';
    if (option.section === 'experience') {
      response = `I have ${portfolioData.experience.length} key roles:\n\n${portfolioData.experience.map(exp => 
        `${exp.role} at ${exp.company} (${exp.period})\n${exp.description}`
      ).join('\n\n')}`;
    } else if (option.section === 'projects') {
      response = `Here are my notable projects:\n\n${portfolioData.projects.map(proj => 
        `• ${proj.name}\nTech: ${proj.tech}\n${proj.description}`
      ).join('\n\n')}`;
    } else if (option.section === 'skills') {
      response = `My technical skills:\n\n${Object.entries(portfolioData.skills).map(([cat, skills]) => 
        `${cat}: ${skills.join(', ')}`
      ).join('\n')}`;
    } else {
      response = `You can reach me at:\n📧 ${portfolioData.email}\n💼 ${portfolioData.linkedin}\n💻 ${portfolioData.github}`;
    }
    
    setMessages(prev => [...prev, 
      { role: 'user', content: `Tell me about ${option.label.toLowerCase()}` },
      { role: 'assistant', content: response }
    ]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);
    setShowOptions(false);

    try {
      const data = await sendChatMessage([...messages, { role: 'user', content: userMessage }]);
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    }
    
    setLoading(false);
    setTimeout(() => setShowOptions(true), 1000);
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
    <div className="fixed top-0 right-0 h-full w-1/3 flex flex-col bg-zinc-950 overflow-hidden border-l border-zinc-800" ref={chatContainerRef} style={{ zIndex: 50 }}>
      <div className="bg-zinc-900 p-4 flex justify-between items-center border-b border-zinc-800">
        <h3 className="font-semibold">Chat with me</h3>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        
        <QuickOptions show={showOptions && messages.length > 0} onOptionClick={handleOptionClick} />
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-gray-800 p-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t border-zinc-800 p-4">
        <ChatInput 
          value={input}
          onChange={setInput}
          onSend={handleSend}
          loading={loading}
        />
      </div>
    </div>
  );
}