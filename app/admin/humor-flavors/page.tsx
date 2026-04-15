import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import HumorFlavorsClient from "@/app/components/HumorFlavorsClient";
export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;

function parsePageParam(page: unknown) {
  const raw = typeof page === "string" ? page : Array.isArray(page) ? page[0] : undefined;
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
}

export default async function HumorFlavorsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string | string[] }>;
}) {
  const supabase = createAdminClient();

  const resolvedSearchParams = (await searchParams) ?? {};
  const page = parsePageParam(resolvedSearchParams.page);
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error, count } = await supabase
    .from("humor_flavors")
    .select("id, slug, description, created_datetime_utc", { count: "exact" })
    .order("id")
    .range(from, to);

  if (error) {
    return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {error.message}</div>;
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages - 1);

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Humor Flavors</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          {total.toLocaleString()} flavors · Page {safePage + 1} of {totalPages} · read-only
        </div>
      </div>

      <HumorFlavorsClient flavors={data ?? []} />

      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Showing {total === 0 ? 0 : safePage * PAGE_SIZE + 1}–{Math.min((safePage + 1) * PAGE_SIZE, total)} of {total.toLocaleString()}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <a
              href="/admin/humor-flavors?page=0"
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
              href={`/admin/humor-flavors?page=${Math.max(0, safePage - 1)}`}
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
                    href={`/admin/humor-flavors?page=${i}`}
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
              href={`/admin/humor-flavors?page=${Math.min(totalPages - 1, safePage + 1)}`}
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
      )}
    </div>
  );
}