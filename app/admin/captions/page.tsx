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

  const { count: totalCount, error: totalCountError } = await supabase
    .from("captions")
    .select("*", { count: "exact", head: true })
    .not("content", "is", null)
    .neq("content", "");

  if (totalCountError) {
    return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {totalCountError.message}</div>;
  }

  const { count: votedCount, error: votedCountError } = await supabase
    .from("captions")
    .select("*", { count: "exact", head: true })
    .not("content", "is", null)
    .neq("content", "")
    .not("like_count", "is", null)
    .neq("like_count", 0);

  if (votedCountError) {
    return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {votedCountError.message}</div>;
  }

  const total = totalCount ?? 0;
  const votedTotal = votedCount ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);

  const pageFrom = safePage * PAGE_SIZE;
  const pageTo = pageFrom + PAGE_SIZE - 1;
  const captions: any[] = [];

  if (pageFrom < votedTotal) {
    const votedFrom = pageFrom;
    const votedTo = Math.min(pageTo, votedTotal - 1);
    const { data: votedData, error: votedError } = await supabase
      .from("captions")
      .select("id, content, is_public, is_featured, profile_id, created_datetime_utc, like_count")
      .not("content", "is", null)
      .neq("content", "")
      .not("like_count", "is", null)
      .neq("like_count", 0)
      .order("like_count", { ascending: false })
      .order("created_datetime_utc", { ascending: false })
      .range(votedFrom, votedTo);

    if (votedError) {
      return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {votedError.message}</div>;
    }
    captions.push(...(votedData ?? []));
  }

  if (captions.length < PAGE_SIZE) {
    const remaining = PAGE_SIZE - captions.length;
    const unvotedFrom = Math.max(0, pageFrom - votedTotal);
    const unvotedTo = unvotedFrom + remaining - 1;

    const { data: unvotedData, error: unvotedError } = await supabase
      .from("captions")
      .select("id, content, is_public, is_featured, profile_id, created_datetime_utc, like_count")
      .not("content", "is", null)
      .neq("content", "")
      .or("like_count.eq.0,like_count.is.null")
      .order("created_datetime_utc", { ascending: false })
      .range(unvotedFrom, unvotedTo);

    if (unvotedError) {
      return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {unvotedError.message}</div>;
    }
    captions.push(...(unvotedData ?? []));
  }

  const captionIds = captions.map((c: any) => c.id as string);

  const voteCounts: Record<string, { upvotes: number; downvotes: number }> = {};
  if (captionIds.length > 0) {
    const { data: votes, error: votesError } = await supabase
      .from("caption_votes")
      .select("caption_id, vote_value")
      .in("caption_id", captionIds)
      // Ensure we don't undercount due to API row limits when
      // aggregating votes across many captions on a page.
      .limit(50000);

    if (votesError) {
      return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {votesError.message}</div>;
    }

    for (const vote of votes ?? []) {
      const captionId = vote.caption_id as string;
      if (!voteCounts[captionId]) {
        voteCounts[captionId] = { upvotes: 0, downvotes: 0 };
      }

      const voteValue = Number(vote.vote_value);
      if (voteValue > 0) voteCounts[captionId].upvotes += 1;
      if (voteValue < 0) voteCounts[captionId].downvotes += 1;
    }
  }

  const rows =
    (captions ?? []).map((r: any) => [
      r.id as string,
      r.content as string | null,
      r.is_public as boolean | null,
      r.is_featured as boolean | null,
      voteCounts[r.id]?.upvotes ?? 0,
      voteCounts[r.id]?.downvotes ?? 0,
      r.profile_id as string | null,
      r.created_datetime_utc?.slice(0, 10) ?? null,
    ]) ?? [];

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>
          Captions and their votes
        </div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          {total.toLocaleString()} total · Page {safePage + 1} of {totalPages} · read-only
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID", "Content", "Public", "Featured", "Upvotes", "Downvotes", "Profile ID", "Created"].map((c) => (
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