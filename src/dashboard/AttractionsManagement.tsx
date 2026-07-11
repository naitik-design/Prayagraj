import { useState } from 'react';
import { motion } from 'motion/react';
import { useApi } from './useApi';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

export default function AttractionsManagement() {
  const { data: attractions, loading, mutate } = useApi('attractions', []);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem.id) {
      await mutate('PUT', editingItem, `/${editingItem.id}`);
    } else {
      await mutate('POST', editingItem);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this attraction?')) {
      await mutate('DELETE', null, `/${id}`);
    }
  };

  if (loading && !attractions) return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif tracking-wide">Attractions</h1>
        <button 
          onClick={() => { setEditingItem({ name: '', location: '', distance: '', description: '', image: '' }); setIsModalOpen(true); }}
          className="bg-[#D4AF37] hover:bg-[#E8C76A] text-black px-6 py-2 rounded-xl font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Attraction
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((item: any) => (
          <div key={item.id} className="bg-[#0E0E10] border border-white/5 rounded-2xl overflow-hidden group">
            <div className="h-40 bg-white/10 relative">
              {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-white/30">No Image</div>}
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={() => { setEditingItem({...item}); setIsModalOpen(true); }} className="p-2 bg-black/50 text-white rounded hover:bg-black"><Edit2 className="w-4 h-4"/></button>
                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/80 text-white rounded hover:bg-red-500"><Trash2 className="w-4 h-4"/></button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-medium text-lg text-[#D4AF37]">{item.name}</h3>
              <p className="text-sm text-white/50 mb-2">{item.location} ({item.distance})</p>
              <p className="text-sm text-white/70 line-clamp-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-[#0E0E10] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-serif">{editingItem.id ? 'Edit Attraction' : 'Add Attraction'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs text-white/50 mb-1">Name</label>
                <input required value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1">Location</label>
                  <input required value={editingItem.location} onChange={e => setEditingItem({...editingItem, location: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1">Distance</label>
                  <input required value={editingItem.distance} onChange={e => setEditingItem({...editingItem, distance: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37]" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Description</label>
                <textarea required value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37] h-20" />
              </div>
              <div>
                <label className="block text-xs text-white/50 mb-1">Image URL or Base64</label>
                <input value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-sm focus:border-[#D4AF37]" />
              </div>
              <div className="flex justify-end gap-3 pt-4">
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
