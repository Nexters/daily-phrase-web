import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function numberWithCommas(x: number | string) {
  if (!x) return "0";

  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getAspectRatioArray(str: string) {
  if (!str || typeof str !== "string") {
    return [1, 1];
  }

  return str.split(":") as unknown as [number, number];
}

export function getAspectRatio(str: string) {
  const [w, h] = getAspectRatioArray(str);
  return w / h;
}
