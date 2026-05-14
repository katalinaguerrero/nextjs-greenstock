/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@/hooks/useMutation";

type BaseFormProps<T> = {
  onSubmit: (data: T) => void;
  loading?: boolean;
};

type Props<T, P = Record<string, never>> = {
  Form: React.ComponentType<BaseFormProps<T> & P>;
  onCreate: (data: T) => Promise<void>;
  redirectTo: string;
  formProps?: P;
};

export function CreateEntity<T, P = {}>({
  Form,
  onCreate,
  redirectTo,
  formProps,
}: Props<T, P>) {
  const router = useRouter();

  const { mutate, loading } = useMutation(onCreate);

  const handleSubmit = async (data: T) => {
    await mutate(data);
    router.push(redirectTo);
  };

  return (
    <Form
      {...(formProps as P)}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}