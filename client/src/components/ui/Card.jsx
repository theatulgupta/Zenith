import { cn } from "../../lib/utils";

export default function Card({ className, children }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface/80 p-5 shadow-lg shadow-black/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
