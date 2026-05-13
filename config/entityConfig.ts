export type EntityField<T> = {
  label: string;
  render: (item: T) => React.ReactNode;
};

export type EntityConfig<T> = {
  title: string;
  fields: EntityField<T>[];
};