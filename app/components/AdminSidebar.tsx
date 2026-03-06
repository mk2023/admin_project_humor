"use client";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

const NAV = [
  { href: "/admin", icon: "◈", label: "Overview" },
  { href: "/admin/users", icon: "◉", label: "Users" },
  { href: "/admin/images", icon: "▣", label: "Images" },
  { href: "/admin/captions", icon: "❝", label: "Captions" },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div
      style={{
        width: 220,
        flexShrink: 0,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 24px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic" }}>
          Humorlab
        </div>
        <div
          style={{
            fontSize: 9,
            letterSpacing: "0.2em",
            color: "var(--accent)",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Admin Console
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                fontSize: 12,
                letterSpacing: "0.05em",
                color: active ? "var(--accent)" : "var(--muted)",
                border: `1px solid ${active ? "var(--accent)" : "transparent"}`,
                background: active ? "#0e1a00" : "transparent",
                marginBottom: 2,
                transition: "all 0.12s",
              }}
            >
              <span style={{ fontSize: 14, width: 18, textAlign: "center" }}>
                {item.icon}
              </span>
              {item.label}
            </a>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: 16,
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
          Signed in as
          <br />
          <span style={{ color: "var(--text)", fontWeight: 500 }}>{email}</span>
        </div>
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "6px 12px",
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text)",
            fontSize: 11,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
