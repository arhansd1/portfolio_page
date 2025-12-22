export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] p-4 ${
        isUser 
          ? 'bg-gray-800 text-gray-100' 
          : 'bg-zinc-900 text-gray-300 border border-gray-800'
      }`}>
        <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}