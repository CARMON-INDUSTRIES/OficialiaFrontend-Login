import axios from "axios";
import { apiBase } from "./apiBase";

const pending = new Map();

// Share concurrent requests only. Later visits revalidate roles with the API.
export function loadCurrentUser(token) {
  if (!pending.has(token)) {
    const request = axios.get(apiBase + "/Roles/actual", {
      headers: { Authorization: "Bearer " + token },
    }).then(({ data }) => data).finally(() => pending.delete(token));
    pending.set(token, request);
  }
  return pending.get(token);
}
