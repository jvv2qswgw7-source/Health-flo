export default function Planner() {
  return (
    <main style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1>Create your plan</h1>

      <textarea
        placeholder="Example: Low UPF dinner for 5 people"
        style={{
          width: "100%",
          minHeight: 120,
          padding: 12,
          fontSize: 16,
        }}
      />

      <br /><br />

      <button
        style={{
          padding: "12px 20px",
          fontSize: 16,
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: 8,
        }}
      >
        Create my plan
      </button>
    </main>
  );
}
