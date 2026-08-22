"use client";

import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────
// Admin gate.
//
// Previously this component hardcoded the password ("KLadmin2026") directly
// in client source and stored a plain `localStorage` flag — meaning the
// password was readable in the public repo and in every visitor's JS
// bundle, and the gate could be bypassed from the browser console.
//
// It now posts to /api/admin/login, which compares against the
// ADMIN_PASSWORD env var server-side and sets a signed HttpOnly cookie.
// This component only ever knows "authenticated: true/false".
// ─────────────────────────────────────────────────────────────────────────

type Status = "checking" | "locked" | "unlocked" | "unconfigured";

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<Status>("checking");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/session", { cache: "no-store" });
      const data = await res.json();
      if (!data.configured) return setStatus("unconfigured");
      setStatus(data.authenticated ? "unlocked" : "locked");
    } catch {
      setStatus("locked");
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setPassword("");
        setStatus("unlocked");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password.");
      }
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setStatus("locked");
  };

  if (status === "checking") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <p className="text-sm font-semibold text-slate-600">Checking session…</p>
      </div>
    );
  }

  if (status === "unconfigured") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="mb-2 text-lg font-black text-amber-900">Admin login not configured</h2>
          <p className="text-sm text-amber-800">
            Set <code className="font-mono font-bold">ADMIN_PASSWORD</code> and{" "}
            <code className="font-mono font-bold">ADMIN_SESSION_SECRET</code> in your environment
            variables, then redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (status === "unlocked") {
    return (
      <>
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-600 transition-colors hover:bg-slate-100"
          >
            Log out
          </button>
        </div>
        {children}
      </>
    );
  }

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <h2 className="mb-6 text-center text-2xl font-black text-slate-900">Admin Login</h2>
        <div className="mb-4">
          <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            required
          />
        </div>
        {error && <p className="mb-4 text-sm font-medium text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-sky-600 px-4 py-3 font-black text-white transition-colors hover:bg-sky-700 disabled:opacity-60"
        >
          {submitting ? "Checking…" : "Login"}
        </button>
      </form>
    </div>
  );
}
