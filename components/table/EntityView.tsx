/* eslint-disable @typescript-eslint/no-explicit-any */
export function EntityView<T>({
  data,
  config,
  backTo,
  editTo,
}: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h1 className="font-bold">{config.title}</h1>

        <div className="flex gap-2">
          <a href={backTo}>Volver</a>
          {editTo && <a href={editTo}>Editar</a>}
        </div>
      </div>

      <div className="border p-4 rounded-xl">
        {config.fields.map((f: any) => (
          <div key={f.label}>
            <b>{f.label}:</b> {f.render(data)}
          </div>
        ))}
      </div>
    </div>
  );
}