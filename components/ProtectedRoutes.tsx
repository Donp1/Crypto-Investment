"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number; // expiration time in seconds
}

export default function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime || !token) {
        localStorage.removeItem("token");
        router.push("/login");
      } else {
        setLoading(false);
      }
    } catch (err) {
      // Invalid token
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
