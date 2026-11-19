"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

const themeKey = "municipal-theme";

export default function ThemeToggle() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => {
      const enabled = localStorage.getItem(themeKey) === "dark";
      document.documentElement.classList.toggle("dark", enabled);
      setDark(enabled);
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  if (pathname === "/" || pathname === "/login") return null;

  const label = dark ? "Activar modo claro" : "Activar modo oscuro";
  const Icon = dark ? Sun : Moon;

  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={() => {
        const enabled = !dark;
        document.documentElement.classList.toggle("dark", enabled);
        localStorage.setItem(themeKey, enabled ? "dark" : "light");
        setDark(enabled);
      }}
      className="fixed right-6 top-4 z-[60] grid size-12 place-items-center rounded-full border border-[#BC995B] bg-[#691B31] text-white shadow-md hover:bg-[#A02142]"
    >
      <Icon size={26} aria-hidden="true" />
    </button>
  );
}
