"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@/hooks/useMutation";

type Props<TForm, TEntity> = {
  initialData: TEntity;

  Form: React.ComponentType<{
    initialData?: TEntity;
    onSubmit: (data: TForm) => void;
    loading?: boolean;
  } & Record<string, any>>;

  onUpdate: (data: TForm) => Promise<void>;
  redirectTo: string;
  formProps?: Record<string, any>;
};

export function EditEntity<TForm, TEntity>({
  initialData,
  Form,
  onUpdate,
  redirectTo,
  formProps,
}: Props<TForm, TEntity>) {
  const router = useRouter();

  const { mutate, loading } = useMutation(onUpdate);

  const handleSubmit = async (data: TForm) => {
    await mutate(data);
    router.push(redirectTo);
  };

  return (
    <Form
      initialData={initialData}
      onSubmit={handleSubmit}
      loading={loading}
      {...formProps}
    />
  );
}