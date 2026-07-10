import { motion } from 'motion/react';
import { Construction } from 'lucide-react';

export default function Placeholder({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[60vh] text-center"
    >
      <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
        <Construction className="w-10 h-10 text-[#D4AF37]" />
      </div>
      <h1 className="text-3xl font-serif tracking-wide mb-2">{title} Management</h1>
      <p className="text-white/50 max-w-md">This section is currently under development. Advanced controls for {title.toLowerCase()} will be available here soon.</p>
    </motion.div>
  );
}
