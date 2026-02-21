import { cn } from "../../lib/utils";

export default function Input({ label, error, className, ...props }) {
  return (
    <label className="block space-y-2 text-sm">
      {label && <span className="text-text-muted">{label}</span>}
      <input
        className={cn(
          "w-full rounded-xl border border-border bg-dark-light px-4 py-2.5 text-sm text-text outline-none transition focus:border-primary/70",
          error && "border-secondary focus:border-secondary",
          className,
        )}
        {...props}
      />
      {error && <span className="text-xs text-secondary">{error}</span>}
    </label>
  );
}
