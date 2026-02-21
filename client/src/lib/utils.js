import clsx from "clsx";

export function cn(...classes) {
  return clsx(classes);
}

export function formatTime(timestamp) {
  if (!timestamp) return "";
  try {
    const date = new Date(timestamp);
    return date.toLocaleString();
  } catch {
    return "";
  }
}

export function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
