import { useEffect, useState } from "react";

export default function useFetch<T>(url: string, options?: RequestInit) {
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<T | unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const api: string | undefined = process.env.API_ENDPOINT;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(api + url, options);
        const json = await res.json();
        setResponse(json);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [url, options]);

  return { response, error, isLoading };
}

export function useFetchServer(url: string, options?: RequestInit) {
  const api: string | undefined = process.env.API_ENDPOINT;

  const fetchData = async () => {
    try {
      const res = await fetch(api + url, options);
      const json = await res.json();
      return json;
    } catch (error) {
      return error;
    }
  };

  return fetchData();
}
