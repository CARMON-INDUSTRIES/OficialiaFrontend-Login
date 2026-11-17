const preferenceKey = "municipal-notification-sounds";
let currentAudio;

export function notificationSoundsEnabled() {
  return localStorage.getItem(preferenceKey) === "on";
}

export function setNotificationSoundsEnabled(enabled) {
  localStorage.setItem(preferenceKey, enabled ? "on" : "off");
  if (!enabled) currentAudio?.pause();
}

export function playNotificationSound(source) {
  if (!notificationSoundsEnabled()) return;
  currentAudio?.pause();
  currentAudio = new Audio(source);
  currentAudio.play().catch(() => {
    // The browser may block audio until the user interacts with the page.
  });
}
