import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'motion/react';

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      if (!isPlaying && audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            // Silently handle autoplay prevention
            setIsPlaying(false);
          });
      }
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        preload="auto"
      />
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className="flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 text-[#C9A227] px-4 py-3 rounded-full shadow-lg"
      >
        {isPlaying ? (
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest text-white/90 font-medium">Lofi Vibes</span>
            <div className="flex gap-0.5 h-3 items-end ml-1">
              <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 bg-[#C9A227] rounded-full" />
              <motion.div animate={{ height: [8, 4, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-[#C9A227] rounded-full" />
              <motion.div animate={{ height: [4, 10, 4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-[#C9A227] rounded-full" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-white/70">
            <VolumeX className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-medium">Play Music</span>
          </div>
        )}
      </motion.button>
    </div>
  );
}
