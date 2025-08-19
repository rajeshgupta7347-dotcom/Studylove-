export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://studylove-backend-98.onrender.com";

async function send(path, method="GET", body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try {
    const json = JSON.parse(text);
    if (!res.ok) throw json;
    return json;
  } catch {
    if (!res.ok) throw new Error(text || "Request failed");
    return { raw: text };
  }
}

export const api = {
  register: ({username,password}) => send("/register","POST",{username,password}),
  login: ({username,password,key}) => send("/login","POST",{username,password,key}),
  leaderboard: () => send("/leaderboard","GET"),
  daily: () => send("/challenge/daily","GET"),
  genKey: ({key,validityHours}) => send("/admin/generateKey","POST",{key,validityHours}),
  ban: ({username}) => send("/admin/ban","POST",{username}),
  unban: ({username}) => send("/admin/unban","POST",{username}),
};
