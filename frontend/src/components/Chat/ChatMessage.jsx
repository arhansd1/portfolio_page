export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
      style={{ '--delay': '0.1s' }}
    >
      <div 
        className={`relative max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed backdrop-blur-sm transition-all duration-300 ${
          isUser 
            ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg' 
            : 'bg-gray-800/80 text-gray-100 border border-gray-700/50 shadow-md'
        }`}
      >
        <p className="whitespace-pre-line">{message.content}</p>
        
        {/* Message tail */}
        {!isUser && (
          <div className="absolute -left-2 top-4 w-3 h-3 bg-gray-800/80 transform rotate-45 border-l border-t border-gray-700/50"></div>
        )}
        {isUser && (
          <div className="absolute -right-2 top-4 w-3 h-3 bg-gradient-to-br from-blue-600 to-blue-500 transform rotate-45"></div>
        )}
      </div>
    </div>
  );
}