import { useState, useEffect } from 'react';

export function usePublicData() {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    Promise.all([
      fetch('/api/rooms').then(r => r.json()),
      fetch('/api/content').then(r => r.json()),
      fetch('/api/settings').then(r => r.json())
    ]).then(([rooms, content, settings]) => {
      setData({ rooms, content, settings });
    });
  }, []);
  
  return data;
}
