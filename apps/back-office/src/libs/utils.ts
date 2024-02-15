import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGCD(num1: number, num2: number) {
  let gcd = 1;

  for (let i = 2; i <= Math.min(num1, num2); i++) {
    if (num1 % i === 0 && num2 % i === 0) {
      gcd = i;
    }
  }

  return gcd;
}

export function renderFileSize(size: number) {
  if (size < 1000) {
    return `${size}KB`;
  }

  return `${(size / 1000).toFixed(1)}MB`;
}
