import { Send } from 'lucide-react';

export default function ChatInput({ value, onChange, onSend, loading }) {
  return (
    <div className="border-t border-gray-800 p-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSend()}
          placeholder="Ask about my background..."
          className="flex-1 bg-zinc-900 border border-gray-800 px-4 py-3 focus:outline-none focus:border-gray-600 text-sm"
        />
        <button
          onClick={onSend}
          disabled={loading || !value.trim()}
          className="px-6 bg-white text-black hover:bg-gray-200 disabled:bg-gray-800 disabled:text-gray-600 transition-colors"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}