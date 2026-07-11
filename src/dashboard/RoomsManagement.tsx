import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Edit2, Trash2, Save, CheckCircle2, Loader2, Star, X } from 'lucide-react';
import { useApi } from './useApi';

export default function RoomsManagement() {
  const { data: rooms, loading, mutate } = useApi('rooms', []);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingRoom.id) {
      await mutate('PUT', editingRoom, `/${editingRoom.id}`);
    } else {
      await mutate('POST', editingRoom);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      await mutate('DELETE', null, `/${id}`);
    }
  };

  if (loading && !rooms) return <div className="text-white/50 h-[50vh] flex items-center justify-center">Loading rooms...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif tracking-wide">Room Management</h1>
        </div>
        <button 
          onClick={() => { setEditingRoom({ name: '', price: 0, discount: 0, type: '', capacity: 2, available: true, featured: false, amenities: [], images: [] }); setIsModalOpen(true); }}
          className="bg-[#D4AF37] hover:bg-[#E8C76A] text-black px-6 py-3 rounded-xl font-medium tracking-wide flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Room
        </button>
      </div>

      <div className="bg-[#0E0E10] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-sm uppercase tracking-widest">
              <th className="px-6 py-4 font-medium">Room Name</th>
              <th className="px-6 py-4 font-medium">Price (₹)</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rooms.map((room: any) => (
              <tr key={room.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4 font-medium">
                  {room.name} {room.featured && <Star className="inline w-4 h-4 text-[#D4AF37] fill-current ml-2" />}
                </td>
                <td className="px-6 py-4">₹{room.price}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${room.available ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {room.available ? 'Available' : 'Occupied'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => { setEditingRoom({...room}); setIsModalOpen(true); }} className="p-2 text-white/40 hover:text-white rounded-lg hover:bg-white/10">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(room.id)} className="p-2 text-white/40 hover:text-red-400 rounded-lg hover:bg-red-400/10">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-[#0E0E10] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-serif">{editingRoom.id ? 'Edit Room' : 'Add Room'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Name</label>
                  <input required value={editingRoom.name} onChange={e => setEditingRoom({...editingRoom, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Type</label>
                  <input required value={editingRoom.type} onChange={e => setEditingRoom({...editingRoom, type: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Price</label>
                  <input type="number" required value={editingRoom.price} onChange={e => setEditingRoom({...editingRoom, price: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37] focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Capacity</label>
                  <input type="number" required value={editingRoom.capacity} onChange={e => setEditingRoom({...editingRoom, capacity: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37] focus:outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingRoom.available} onChange={e => setEditingRoom({...editingRoom, available: e.target.checked})} />
                  <span className="text-sm">Available</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editingRoom.featured} onChange={e => setEditingRoom({...editingRoom, featured: e.target.checked})} />
                  <span className="text-sm">Featured</span>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm bg-white/5 hover:bg-white/10">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-sm bg-[#D4AF37] text-black hover:bg-[#E8C76A] flex items-center gap-2"><Save className="w-4 h-4"/> Save</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
