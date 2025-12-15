export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401 || res.status === 403) {
    window.location.href = "/URDS"; // force sign in
    throw new Error("Unauthorized");
  }

  return res.json();
}
