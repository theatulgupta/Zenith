import { cn } from "../../lib/utils";

export default function Modal({ open, onClose, title, children, className }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        className={cn(
          "w-full max-w-lg rounded-2xl border border-border bg-dark-light p-5 shadow-2xl animate-scale-in",
          className,
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg bg-dark-lighter px-2 py-1 text-xs text-text-muted hover:text-text"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
