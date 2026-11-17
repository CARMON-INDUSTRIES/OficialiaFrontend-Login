"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { notificationSoundsEnabled, setNotificationSoundsEnabled } from "@/lib/notificationSounds";

export default function NotificationSoundToggle() {
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    const sync = () => setEnabled(notificationSoundsEnabled());
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  if (enabled === null) return null;

  const label = enabled ? "Desactivar sonidos" : "Activar sonidos";
  const Icon = enabled ? Volume2 : VolumeX;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        setNotificationSoundsEnabled(!enabled);
        setEnabled(!enabled);
      }}
      className={`fixed bottom-6 right-6 z-30 grid size-14 place-items-center rounded-full border shadow-md outline-offset-4 ${
        enabled ? "border-[#691B31] bg-[#691B31] text-white" : "border-[#691B31] bg-white text-[#691B31]"
      }`}
    >
      <Icon size={28} aria-hidden="true" />
    </button>
  );
}
