import { useState, useEffect } from 'react';
import defaultData from '../database.json';

export function usePublicData() {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    Promise.all([
      fetch('/api/rooms').then(r => {
        if (!r.ok) throw new Error('Failed to fetch rooms');
        return r.json();
      }),
      fetch('/api/content').then(r => {
        if (!r.ok) throw new Error('Failed to fetch content');
        return r.json();
      }),
      fetch('/api/settings').then(r => {
        if (!r.ok) throw new Error('Failed to fetch settings');
        return r.json();
      })
    ]).then(([rooms, content, settings]) => {
      setData({ rooms, content, settings });
    }).catch(err => {
      console.warn("API fetch failed, falling back to bundled default data:", err);
      setData({
        rooms: defaultData.rooms,
        content: defaultData.content,
        settings: defaultData.settings
      });
    });
  }, []);
  
  return data;
}

