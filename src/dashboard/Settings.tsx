import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApi } from './useApi';
import { Save, Loader2 } from 'lucide-react';

export default function Settings() {
  const { data: settings, loading, mutate } = useApi('settings', {});
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) setFormData(settings);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    await mutate('PUT', formData);
    setSaving(false);
  };

  if (loading && !Object.keys(formData).length) return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif tracking-wide">Hotel Settings</h1>
        <button onClick={handleSave} disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl flex gap-2 items-center font-medium">
          {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
          Save Settings
        </button>
      </div>

      <div className="bg-[#0E0E10] border border-white/5 p-6 rounded-2xl space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-white/50 mb-1">Hotel Name</label>
            <input value={formData.hotelName || ''} onChange={e => setFormData({...formData, hotelName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Email</label>
            <input value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Phone</label>
            <input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">WhatsApp</label>
            <input value={formData.whatsapp || ''} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37]" />
          </div>
          <div className="col-span-2">
            <label className="block text-xs text-white/50 mb-1">Address</label>
            <input value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37]" />
          </div>
        </div>
      </div>
      
      <div className="bg-[#0E0E10] border border-white/5 p-6 rounded-2xl space-y-4">
        <h2 className="text-xl font-serif text-[#D4AF37] mb-4">AI Chatbot Configuration</h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={formData.chatbotEnabled || false} onChange={e => setFormData({...formData, chatbotEnabled: e.target.checked})} className="w-5 h-5 accent-[#D4AF37]"/>
          <span>Enable AI Concierge</span>
        </label>
        <div className="pt-4">
          <label className="block text-xs text-white/50 mb-1">System Prompt (Instructions for AI)</label>
          <textarea value={formData.chatbotPrompt || ''} onChange={e => setFormData({...formData, chatbotPrompt: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm focus:border-[#D4AF37] h-48 font-mono" />
        </div>
      </div>
    </motion.div>
  );
}
