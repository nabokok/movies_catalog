import { useState, useEffect } from 'react';

function useFetch<T = unknown>(url: string): { data: T | null; loading: boolean; error: string | null; } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setData(data);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setLoading(false);
          setError(err.message);
        }
      });

  }, [url]);

  return { data, loading, error };
}

export default useFetch;
