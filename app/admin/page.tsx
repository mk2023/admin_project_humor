import { createAdminClient } from "@/lib/supabase/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createAdminClient();

  const [
    { count: userCount },
    { count: imageCount },
    { count: captionCount },
    { data: topCaptions },
    { data: recentImages },
    { data: recentUsers },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("images").select("*", { count: "exact", head: true }),
    supabase.from("captions").select("*", { count: "exact", head: true }),
    supabase
      .from("captions")
      .select("id, content, profile_id, image_id")
      .order("created_datetime_utc", { ascending: false })
      .limit(5),
    supabase
      .from("images")
      .select("id, url, created_datetime_utc, profile_id")
      .order("created_datetime_utc", { ascending: false })
      .limit(5),
    supabase
      .from("profiles")
      .select("id, email, created_datetime_utc")
      .order("created_datetime_utc", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Total Users", value: userCount ?? 0, icon: "◉", accent: true },
    { label: "Images", value: imageCount ?? 0, icon: "▣", accent: false },
    { label: "Captions", value: captionCount ?? 0, icon: "❝", accent: false },
    {
      label: "Captions / Image",
      value:
        imageCount && captionCount
          ? (captionCount / imageCount).toFixed(1)
          : "—",
      icon: "÷",
      accent2: true,
    },
  ];

  return (
    <div style={{ padding: "32px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>
          Overview
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          Platform analytics
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 32,
        }}
      >
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderTop: `2px solid ${s.accent ? "var(--accent)" : s.accent2 ? "var(--accent2)" : "var(--border)"}`,
              padding: 24,
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.2em",
                color: "var(--muted)",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontFamily: "var(--serif)",
                fontSize: 42,
                lineHeight: 1,
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                position: "absolute",
                right: 16,
                bottom: 12,
                fontSize: 36,
                opacity: 0.06,
              }}
            >
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Two-col panels */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
        {/* Recent captions */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 20,
            }}
          >
            Recent Captions
          </div>
          {(topCaptions ?? []).map((c) => (
            <div
              key={c.id}
              style={{
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 13,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
              }}
            >
              "{c.content}"
            </div>
          ))}
          {!topCaptions?.length && (
            <div style={{ color: "var(--muted)", fontSize: 13 }}>No captions yet.</div>
          )}
        </div>

        {/* Recent users */}
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24 }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 20,
            }}
          >
            Recent Users
          </div>
          {(recentUsers ?? []).map((u) => (
            <div
              key={u.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                fontSize: 13,
              }}
            >
              <span>{u.email}</span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>
                {u.created_datetime_utc?.slice(0, 10)}
              </span>
            </div>
          ))}
          {!recentUsers?.length && (
            <div style={{ color: "var(--muted)", fontSize: 13 }}>No users yet.</div>
          )}
        </div>
      </div>

      {/* Recent images */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: 24 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 20,
          }}
        >
          Recent Images
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {(recentImages ?? []).map((img) => (
            <div key={img.id} style={{ position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt=""
                style={{
                  width: 120,
                  height: 90,
                  objectFit: "cover",
                  display: "block",
                  border: "1px solid var(--border)",
                  filter: "grayscale(20%)",
                }}
              />
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>
                {img.created_datetime_utc?.slice(0, 10)}
              </div>
            </div>
          ))}
          {!recentImages?.length && (
            <div style={{ color: "var(--muted)", fontSize: 13 }}>No images yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
