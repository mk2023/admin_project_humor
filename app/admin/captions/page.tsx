import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

function parsePageParam(page: unknown) {
  const raw = typeof page === "string" ? page : Array.isArray(page) ? page[0] : undefined;
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

const thStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  color: "var(--muted)",
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "1px solid var(--border)",
  fontWeight: 400,
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: 12,
  borderBottom: "1px solid var(--border)",
  maxWidth: 300,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const formatCell = (val: string | number | boolean | null) => {
  if (val === null || val === undefined) return <span style={{ color: "var(--muted)" }}>—</span>;
  if (typeof val === "boolean") return <span style={{ color: val ? "var(--accent)" : "var(--muted)" }}>{val ? "✓" : "✗"}</span>;
  const str = String(val);
  return str.length > 80 ? str.slice(0, 80) + "…" : str;
};

export default async function CaptionsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string | string[] }>;
}) {
  const supabase = createAdminClient();

  const resolvedSearchParams = (await searchParams) ?? {};
  const page = parsePageParam(resolvedSearchParams.page);
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const [{ data: captions, error, count }] = await Promise.all([
    supabase
      .from("captions")
      .select("id, content, is_public, is_featured, like_count, profile_id, created_datetime_utc", { count: "exact" })
      .not("content", "is", null)
      .neq("content", "")
      .order("created_datetime_utc", { ascending: false })
      .range(from, to),
  ]);

  if (error) {
    return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {error.message}</div>;
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);

  const rows =
    (captions ?? []).map((r: any) => [
      r.id as string,
      r.content as string | null,
      r.is_public as boolean | null,
      r.is_featured as boolean | null,
      r.like_count as number | null,
      r.profile_id as string | null,
      r.created_datetime_utc?.slice(0, 10) ?? null,
    ]) ?? [];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>
          Captions that have nonempty content
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          {total.toLocaleString()} total · Page {safePage + 1} of {totalPages} · read-only
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID", "Content", "Public", "Featured", "Likes", "Profile ID", "Created"].map((c) => (
                <th key={c} style={thStyle}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={tdStyle}>
                    {formatCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>No data found.</div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Showing {total === 0 ? 0 : safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, total)} of {total.toLocaleString()}
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <a
            href="/admin/captions?page=0"
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              color: safePage === 0 ? "var(--muted)" : "var(--text)",
              pointerEvents: safePage === 0 ? "none" : "auto",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            ⇤ First
          </a>
          <a
            href={`/admin/captions?page=${Math.max(0, safePage - 1)}`}
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              color: safePage === 0 ? "var(--muted)" : "var(--text)",
              pointerEvents: safePage === 0 ? "none" : "auto",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            ← Prev
          </a>
          <div style={{ display: "flex", gap: 4 }}>
            {Array.from({ length: totalPages }, (_, i) => i)
              .slice(Math.max(0, safePage - 2), safePage + 3)
              .map((i) => (
                <a
                  key={i}
                  href={`/admin/captions?page=${i}`}
                  style={{
                    width: 32,
                    height: 32,
                    display: "grid",
                    placeItems: "center",
                    border: `1px solid ${i === safePage ? "var(--accent)" : "var(--border)"}`,
                    background: i === safePage ? "var(--accent)" : "transparent",
                    color: i === safePage ? "#0a0a08" : "var(--muted)",
                    fontSize: 11,
                    textDecoration: "none",
                  }}
                >
                  {i + 1}
                </a>
              ))}
          </div>
          <a
            href={`/admin/captions?page=${Math.min(totalPages - 1, safePage + 1)}`}
            style={{
              padding: "6px 14px",
              border: "1px solid var(--border)",
              color: safePage >= totalPages - 1 ? "var(--muted)" : "var(--text)",
              pointerEvents: safePage >= totalPages - 1 ? "none" : "auto",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Next →
          </a>
        </div>
      </div>
    </div>
  );
}