import { useState } from 'react';
import { motion } from 'motion/react';
import { useApi } from './useApi';
import { Trash2, Upload, Plus } from 'lucide-react';

export default function GalleryManagement() {
  const { data: gallery, loading, mutate } = useApi('gallery', []);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target?.result as string;
        await mutate('POST', { url: base64, title: file.name });
      };
      reader.readAsDataURL(file);
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete image?')) {
      await mutate('DELETE', null, `/${id}`);
    }
  };

  if (loading && !gallery) return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-serif tracking-wide">Gallery</h1>
        <label className="bg-[#D4AF37] hover:bg-[#E8C76A] text-black px-6 py-2 rounded-xl font-medium cursor-pointer flex gap-2 items-center">
          <Upload className="w-4 h-4"/>
          {uploading ? 'Uploading...' : 'Upload Images'}
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} disabled={uploading} />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {gallery.map((img: any) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden bg-white/5 border border-white/5 aspect-square">
            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <button onClick={() => handleDelete(img.id)} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
                <Trash2 className="w-5 h-5"/>
              </button>
            </div>
          </div>
        ))}
        {gallery.length === 0 && (
          <div className="col-span-full py-20 text-center text-white/50 border border-dashed border-white/20 rounded-2xl">
            No images uploaded yet.
          </div>
        )}
      </div>
    </motion.div>
  );
}
