export async function registerUser({
  name,
  email,
  password,
  country,
  currency,
  phone,
  username,
}: {
  name: string;
  email: string;
  password: string;
  country: string;
  currency: string;
  phone: string;
  username: string;
}) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      country,
      currency,
      phone,
      username,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Registration failed");
  }

  // Store token
  localStorage.setItem("token", data.token);

  return data.user;
}

export async function loginUser(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Login failed");
  }

  // Save token
  localStorage.setItem("token", data.token);

  return data.user;
}

export function logoutUser() {
  localStorage.removeItem("token");
}
