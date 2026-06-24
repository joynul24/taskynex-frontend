import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL || '';

  const fetchApi = useCallback(async (endpoint, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      // Allow passing full URLs (e.g. for external APIs) or relative endpoints
      const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong processing your request');
      }

      return data;
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [baseUrl]);

  return { fetchApi, loading, error };
}

