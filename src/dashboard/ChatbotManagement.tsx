import { motion } from 'motion/react';
import { useApi } from './useApi';

export default function ChatbotManagement() {
  const { data: conversations, loading } = useApi('conversations', []);

  if (loading && !conversations) return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif tracking-wide">AI Chat History</h1>
      </div>

      <div className="space-y-4">
        {conversations.slice().reverse().map((conv: any) => (
          <div key={conv.id} className="bg-[#0E0E10] border border-white/5 p-6 rounded-2xl">
            <div className="text-xs text-white/40 mb-4">{new Date(conv.timestamp).toLocaleString()}</div>
            <div className="space-y-3">
              {conv.messages.map((msg: any, i: number) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.sender === 'user' ? 'bg-[#D4AF37] text-black rounded-tr-none' : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {conversations.length === 0 && <div className="text-center py-20 text-white/40">No conversations yet.</div>}
      </div>
    </motion.div>
  );
}
