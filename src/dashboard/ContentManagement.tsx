import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useApi } from './useApi';
import { Save, Loader2 } from 'lucide-react';

export default function ContentManagement() {
  const { data: content, loading, mutate } = useApi('content', {});
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (content) setFormData(content);
  }, [content]);

  const handleSave = async () => {
    setSaving(true);
    await mutate('PUT', formData);
    setSaving(false);
  };

  if (loading && !Object.keys(formData).length) return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif tracking-wide">Website Content</h1>
        <button onClick={handleSave} disabled={saving} className="bg-[#D4AF37] text-black px-6 py-2 rounded-xl flex gap-2 items-center font-medium">
          {saving ? <Loader2 className="w-4 h-4 animate-spin"/> : <Save className="w-4 h-4"/>}
          Save All Changes
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-[#0E0E10] border border-white/5 p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-serif text-[#D4AF37]">Hero Section</h2>
          <div>
            <label className="block text-xs text-white/50 mb-1">Title</label>
            <input value={formData?.hero?.title || ''} onChange={e => setFormData({...formData, hero: {...formData.hero, title: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37]" />
          </div>
          <div>
            <label className="block text-xs text-white/50 mb-1">Subtitle</label>
            <textarea value={formData?.hero?.subtitle || ''} onChange={e => setFormData({...formData, hero: {...formData.hero, subtitle: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37] h-24" />
          </div>
        </div>

        <div className="bg-[#0E0E10] border border-white/5 p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-serif text-[#D4AF37]">About Section</h2>
          <div>
            <label className="block text-xs text-white/50 mb-1">About Text</label>
            <textarea value={formData?.about?.text || ''} onChange={e => setFormData({...formData, about: {...formData.about, text: e.target.value}})} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-[#D4AF37] h-32" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
