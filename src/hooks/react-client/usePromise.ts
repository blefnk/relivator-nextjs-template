"use client";

import { useState } from "react";

type UsePromise<T> = {
  data?: null | T;
  error?: Error | null;
  isLoading: boolean;
  isRejected: boolean;
  isResolved: boolean;
};

type AsyncFunction<T, P extends any[]> = (...parameters: P) => Promise<T>;

export default function usePromise<T, P extends any[]>(
  function_: AsyncFunction<T, P>,
): [UsePromise<T>, (...parameters: P) => Promise<T>] {
  const [isLoading, setLoading] = useState(false);
  const [isResolved, setResolved] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<null | T>(null);

  const call = async (...parameters: P): Promise<T> => {
    setLoading(true);
    setResolved(false);
    setRejected(false);
    setError(null);

    try {
      const res = await function_(...parameters);

      setData(res);
      setResolved(true);

      return res;
    } catch (error_) {
      setError(error_ as Error);
      setRejected(true);

      throw error_;
    } finally {
      setLoading(false);
    }
  };

  return [
    {
      data,
      error,
      isLoading,
      isRejected,
      isResolved,
    },
    call,
  ];
}
