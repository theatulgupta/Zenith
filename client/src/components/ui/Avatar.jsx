import { cn, initials } from "../../lib/utils";

export default function Avatar({ name, size = "md", className }) {
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-lg",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-primary/20 text-primary",
        sizes[size],
        className,
      )}
    >
      {initials(name || "U")}
    </div>
  );
}
