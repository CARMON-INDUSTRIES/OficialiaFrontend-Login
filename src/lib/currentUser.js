import axios from "axios";
import { apiBase } from "./apiBase";

const pending = new Map();
let cached;
const lifetime = 30000;

export function cacheCurrentUser(token, user) {
  cached = { token, user, expires: Date.now() + lifetime };
}

export function getCachedUser(token) {
  return cached?.token === token && cached.expires > Date.now() ? cached.user : null;
}

export function clearCurrentUser() {
  cached = undefined;
}

export function loadCurrentUser(token) {
  const user = getCachedUser(token);
  if (user) return Promise.resolve(user);

  if (!pending.has(token)) {
    const request = axios.get(apiBase + "/Roles/actual", {
      headers: { Authorization: "Bearer " + token },
    }).then(({ data }) => {
      cacheCurrentUser(token, data);
      return data;
    }).finally(() => pending.delete(token));
    pending.set(token, request);
  }
  return pending.get(token);
}
