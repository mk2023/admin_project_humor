export default function Unauthorized() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a08",
        color: "#e8e6df",
        fontFamily: "monospace",
        gap: "1rem",
      }}
    >
      <div style={{ fontSize: "48px", opacity: 0.3 }}>⊘</div>
      <div style={{ fontSize: "14px", letterSpacing: "0.1em", color: "#ff4444" }}>
        ACCESS DENIED
      </div>
      <div style={{ fontSize: "12px", color: "#6b6960" }}>
        Your account does not have superadmin privileges.
      </div>
      <a
        href="/"
        style={{
          marginTop: "1rem",
          padding: "8px 20px",
          border: "1px solid #232320",
          color: "#e8e6df",
          textDecoration: "none",
          fontSize: "12px",
          letterSpacing: "0.1em",
        }}
      >
        ← Back to Login
      </a>
    </main>
  );
}
