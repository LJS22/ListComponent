import { useState, useEffect } from 'react';

type UseFetchResult<T> = {
    data: T | null;
    loading: boolean;
    error: Error | null;
};

// A very simple, alternative idea to tanstack. Would implement based on business requirements.
export function useFetch<T>(url: string, options?: RequestInit): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const json = (await response.json()) as T;
                setData(json);
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') return;
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, []);

    return { data, loading, error };
}
