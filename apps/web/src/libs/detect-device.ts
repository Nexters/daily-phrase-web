"use client";

export const detectDevice = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("android")) return "android";
  if (userAgent.includes("iphone")) return "ios";
  if (userAgent.includes("ipad")) return "ipad";
  if (userAgent.includes("ipod")) return "ipod";
  if (userAgent.includes("macintosh")) return "mac";
  return null;
};
