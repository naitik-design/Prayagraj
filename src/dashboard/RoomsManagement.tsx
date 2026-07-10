import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Save, CheckCircle2, Loader2, Star, Check } from 'lucide-react';

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([
    { id: 1, name: 'Deluxe Room', price: 2500, available: true, featured: true },
    { id: 2, name: 'Family Suite', price: 4500, available: true, featured: false },
    { id: 3, name: 'Royal Tent', price: 6000, available: false, featured: true },
  ]);

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif tracking-wide">Room Management</h1>
          <p className="text-white/50 text-sm mt-1">Manage pricing, availability, and featured rooms.</p>
        </div>
        <button className="bg-[#D4AF37] hover:bg-[#E8C76A] text-black px-6 py-3 rounded-xl font-medium tracking-wide flex items-center gap-2 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <Plus className="w-5 h-5" />
          <span>Add Room</span>
        </button>
      </div>

      <div className="bg-[#0E0E10] border border-white/5 rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-sm uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">Room Name</th>
                <th className="px-6 py-4 font-medium">Price (₹)</th>
                <th className="px-6 py-4 font-medium">Availability</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium">{room.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-white/50">₹</span>
                      <input 
                        type="number" 
                        defaultValue={room.price}
                        className="bg-transparent border-b border-transparent focus:border-[#D4AF37] focus:outline-none w-24 py-1 transition-colors"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={room.available} className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/30 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <button className={`p-2 rounded-full transition-colors ${room.featured ? 'text-[#D4AF37] bg-[#D4AF37]/10' : 'text-white/20 hover:text-white/50'}`}>
                      <Star className={`w-5 h-5 ${room.featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button className="p-2 text-white/40 hover:text-[#D4AF37] transition-colors rounded-lg hover:bg-[#D4AF37]/10" title="Manage Images">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/10" title="Edit Details">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white/40 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10" title="Delete Room">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end items-center gap-4 pt-4">
        <AnimatePresence>
          {saved && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex items-center gap-2 text-green-400 text-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Changes saved successfully</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-xl font-medium tracking-wide flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </motion.div>
  );
}
