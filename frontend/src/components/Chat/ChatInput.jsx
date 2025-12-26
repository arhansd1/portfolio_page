import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSend, loading }) {
  return (
    <div className="px-6 pb-6 pt-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Ask about my background..."
          className="flex-1 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 text-sm text-gray-100 placeholder-gray-500 transition-all duration-200 shadow-sm"
        />
        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-800 disabled:text-gray-500 transition-all duration-200 shadow-md hover:shadow-lg disabled:shadow-sm disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send size={18} className="transform -translate-x-px" />
        </button>
      </div>
    </div>
  );
}