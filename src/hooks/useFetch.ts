/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD";

const useFetch = <E = any>(
  url: string,
  method: HttpMethod,
  body?: BodyInit | null | undefined
) => {
  const [data, setData] = useState<E | undefined>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    fetch(url, {
      method: body ? "GET" : "POST",
      body,
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

    return abortController.abort();
  }, []);

  return {
    data,
    error,
    loading,
  };
};

export { useFetch };
