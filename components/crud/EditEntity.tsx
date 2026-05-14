"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@/hooks/useMutation";

type Props<TForm extends object, TEntity extends object> = {
  initialData: TEntity;

  Form: React.ComponentType<{
    initialData?: TEntity;
    onSubmit: (data: TForm) => void;
    loading?: boolean;
  } & Record<string, unknown>>;

  onUpdate: (data: TForm) => Promise<void>;
  redirectTo: string;
  formProps?: Record<string, unknown>;
};

export function EditEntity<TForm extends object, TEntity extends object>({
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