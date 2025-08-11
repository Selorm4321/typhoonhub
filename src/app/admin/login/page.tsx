"use client";

import * as React from "react";

export default function AdminLogin() {
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") || "/admin/invest" : "/admin/invest";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error("Bad response");
      window.location.href = next;
    } catch {
      alert("Invalid password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full rounded-lg border px-3 py-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
