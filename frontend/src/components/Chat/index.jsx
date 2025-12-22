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
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
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