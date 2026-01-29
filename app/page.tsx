"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);

    if (text.trim().length < 3) {
      setError("Please type a bit more detail 🙂");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/healthflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "Something went wrong.");
        setLoading(false);
        return;
      }

      setResult(data);
    } catch {
      setError("Server error. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1>HealthFlow</h1>
      <p>Tell me what kind of meal plan you want today.</p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Example: Low-UPF simple meal for 5"
          rows={4}
          style={{ width: "100%", padding: 12 }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 12,
            padding: "10px 16px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: 6,
          }}
        >
          {loading ? "Creating plan…" : "Create my plan"}
        </button>
      </form>

      {error && (
        <p style={{ color: "crimson", marginTop: 12 }}>
          {error}
        </p>
      )}

      {result && (
        <pre
          style={{
            marginTop: 16,
            background: "#f4f4f5",
            padding: 12,
            whiteSpace: "pre-wrap",
          }}
        >
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}
