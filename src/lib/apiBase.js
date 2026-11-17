const defaultOrigin = process.env.NODE_ENV === "development"
  ? "http://localhost:5204"
  : "https://oficialialoginbackend.somee.com";

export const apiBase = (process.env.NEXT_PUBLIC_API_URL?.trim() || defaultOrigin)
  .replace(/\/+$/, "") + "/api";
