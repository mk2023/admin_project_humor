import GoogleLoginButton from "@/app/components/GoogleLogin";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a08",
        gap: "1.5rem",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "2.5rem",
            fontStyle: "italic",
            color: "#e8e6df",
            marginBottom: "0.5rem",
          }}
        >
          Humorlab
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#c8f55a",
          }}
        >
          Admin Console
        </div>
      </div>
      <GoogleLoginButton />
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "12px",
          color: "#6b6960",
          marginTop: "0.5rem",
        }}
      >
        Superadmin access only
      </p>
    </main>
  );
}
