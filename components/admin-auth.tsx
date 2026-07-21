"use client";

import { useState, useEffect } from "react";

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("klr_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple frontend auth, ideally should be an API call but works for basic hiding
    if (password === "KLadmin2026" || password === "klrenovator") {
      localStorage.setItem("klr_admin_auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-2xl font-black text-slate-900 text-center">Admin Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>
        {error && <p className="mb-4 text-sm text-red-500 font-medium">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 px-4 py-3 font-black text-white hover:bg-sky-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
