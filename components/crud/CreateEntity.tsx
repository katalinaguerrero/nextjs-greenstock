"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@/hooks/useMutation";

type Props<T> = {
  Form: React.ComponentType<{
    onSubmit: (data: T) => void;
    loading?: boolean;
  }>;
  onCreate: (data: T) => Promise<void>;
  redirectTo: string;
};

export function CreateEntity<T>({
  Form,
  onCreate,
  redirectTo,
}: Props<T>) {
  const router = useRouter();

  const { mutate, loading } = useMutation(onCreate);

  const handleSubmit = async (data: T) => {
    await mutate(data);
    router.push(redirectTo);
  };

  return <Form onSubmit={handleSubmit} loading={loading} />;
}