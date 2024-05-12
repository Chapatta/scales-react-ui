import { useState, useEffect } from 'react';

export type ApiResult<T> = {
  data: T[];
  loading: boolean;
  error: string | null;
};

const useApi = <T>(url: string): ApiResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function (optional)
    return () => {
      // Perform any cleanup if necessary
    };
  }, [url]); // Run effect whenever the URL changes

  return { data, loading, error };
};

export default useApi;