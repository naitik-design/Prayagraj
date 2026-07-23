import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export function useApi(endpoint: string, initialData: any = null) {
  const [data, setData] = useState<any>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated } = useAuth();

  const fetchToken = () => localStorage.getItem('hotel_admin_token') || sessionStorage.getItem('hotel_admin_token');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${fetchToken()}`
        }
      });
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) {
        if (contentType.includes('application/json')) {
          const errJson = await res.json();
          throw new Error(errJson.error || 'Failed to fetch');
        } else {
          const text = await res.text();
          throw new Error(`Server returned HTTP ${res.status}: ${text.slice(0, 100)}`);
        }
      }
      const json = await res.json();
      setData(json);
    } catch (e: any) {
      console.error(`Error fetching /api/${endpoint}:`, e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const mutate = async (method: string, payload?: any, urlSuffix: string = '') => {
    try {
      setLoading(true);
      const res = await fetch(`/api/${endpoint}${urlSuffix}`, {
        method,
        headers: {
          'Authorization': `Bearer ${fetchToken()}`,
          'Content-Type': 'application/json'
        },
        body: payload ? JSON.stringify(payload) : undefined
      });
      if (!res.ok) throw new Error('Mutation failed');
      await fetchData();
      return true;
    } catch (e: any) {
      setError(e.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate, refetch: fetchData };
}
