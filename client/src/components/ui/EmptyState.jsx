export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-dark-light p-6 text-center">
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
