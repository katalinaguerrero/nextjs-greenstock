"use client";

import { useState } from "react";

export function useMutation<T>(fn: (data: T) => Promise<void>) {
  const [loading, setLoading] = useState(false);

  const mutate = async (data: T) => {
    setLoading(true);
    try {
      await fn(data);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading };
}