import { useState, useEffect } from "react";

type FetchReturnType<T> = {
  data: T | undefined;
  error: any | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  revalidate: () => void;
};

/**
 * Custom hook for fetching data from an API.
 *
 * @template T - The type of the data returned by the API.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [reqOpt] - Optional request options for the fetch API.
 * @returns {{
 *   data: T | undefined,
 *   error: any | undefined,
 *   isLoading: boolean,
 *   isError: boolean,
 *   isSuccess: boolean,
 *   revalidate: () => void
 * }} - An object containing the fetched data, error information, loading state,
 * and a function to revalidate the data.
 */
export const useFetch = <T>(
  url: string,
  reqOpt?: RequestInit,
): FetchReturnType<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, reqOpt);
      const responseData: T = await res.json();

      if (res.ok) {
        setIsSuccess(true);
        setData(responseData);
        setError(undefined);
      } else {
        setIsSuccess(false);
        setError(responseData);
        setData(undefined);
      }
    } catch (e) {
      setIsSuccess(false);
      setData(undefined);
      setError(e instanceof Error ? e : new Error("An unknown error occurred"));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url, reqOpt]);

  const revalidate = () => fetchData();

  return { data, error, isLoading, isError: !isSuccess, isSuccess, revalidate };
};
