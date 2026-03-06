import { createSupabaseClient } from "@/lib/supabase/supabaseServer";

export const dynamic = "force-dynamic";

export default async function CaptionsPage() {
  const supabase = await createSupabaseClient();

  const { data: captions, error } = await supabase
    .from("captions")
    .select(
      "id, content, created_datetime_utc, modified_datetime_utc, profile_id, image_id, images(url), profiles(email)"
    )
    .order("created_datetime_utc", { ascending: false });

  if (error)
    return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {error.message}</div>;

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Captions</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          {captions?.length ?? 0} captions · read-only
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Caption", "Image", "Author", "Created"].map((h) => (
                <th
                  key={h}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    padding: "12px 16px",
                    textAlign: "left",
                    borderBottom: "1px solid var(--border)",
                    fontWeight: 400,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(captions ?? []).map((c: any) => (
              <tr key={c.id}>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: 14,
                    borderBottom: "1px solid var(--border)",
                    fontFamily: "var(--serif)",
                    fontStyle: "italic",
                    maxWidth: 360,
                  }}
                >
                  "{c.content}"
                </td>
                <td style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
                  {c.images?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.images.url}
                      alt=""
                      style={{ width: 60, height: 45, objectFit: "cover", display: "block", border: "1px solid var(--border)" }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>—</span>
                  )}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: 12,
                    borderBottom: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  {c.profiles?.email ?? "—"}
                </td>
                <td
                  style={{
                    padding: "14px 16px",
                    fontSize: 12,
                    borderBottom: "1px solid var(--border)",
                    color: "var(--muted)",
                  }}
                >
                  {c.created_datetime_utc?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!captions?.length && (
          <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>
            No captions yet.
          </div>
        )}
      </div>
    </div>
  );
}
