"use client";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

const NAV = [
  { href: "/admin", icon: "◈", label: "Overview" },
  { href: "/admin/users", icon: "◉", label: "Users" },
  { href: "/admin/images", icon: "▣", label: "Images" },
  { href: "/admin/captions", icon: "❝", label: "Captions" },
  { href: "/admin/caption-requests", icon: "→", label: "Caption Requests" },
  { href: "/admin/caption-examples", icon: "✦", label: "Caption Examples" },
  { href: "/admin/humor-flavors", icon: "◇", label: "Humor Flavors" },
  { href: "/admin/humor-flavor-steps", icon: "◫", label: "Flavor Steps" },
  { href: "/admin/humor-mix", icon: "⊕", label: "Humor Mix" },
  { href: "/admin/terms", icon: "T", label: "Terms" },
  { href: "/admin/llm-models", icon: "⬡", label: "LLM Models" },
  { href: "/admin/llm-providers", icon: "⬢", label: "LLM Providers" },
  { href: "/admin/llm-prompt-chains", icon: "⛓", label: "Prompt Chains" },
  { href: "/admin/llm-responses", icon: "↩", label: "LLM Responses" },
  { href: "/admin/allowed-domains", icon: "◎", label: "Allowed Domains" },
  { href: "/admin/whitelist", icon: "✉", label: "Whitelist Emails" },
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
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "24px 20px 16px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 22, fontStyle: "italic" }}>Humorlab</div>
        <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--accent)", textTransform: "uppercase", marginTop: 4 }}>
          Admin Console
        </div>
      </div>

      <nav style={{ flex: 1, padding: "10px 8px" }}>
        {NAV.map((item) => {
          const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
          return (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 10px",
                fontSize: 11,
                letterSpacing: "0.04em",
                color: active ? "var(--accent)" : "var(--muted)",
                border: `1px solid ${active ? "var(--accent)" : "transparent"}`,
                background: active ? "#0e1a00" : "transparent",
                marginBottom: 2,
                transition: "all 0.12s",
                textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 12, width: 16, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </a>
          );
        })}
      </nav>

      <div style={{ padding: 14, borderTop: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
          Signed in as<br />
          <span style={{ color: "var(--text)", fontWeight: 500, wordBreak: "break-all" }}>{email}</span>
        </div>
        <button
          onClick={logout}
          style={{
            width: "100%", padding: "6px 12px", background: "transparent",
            border: "1px solid var(--border)", color: "var(--text)", fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}