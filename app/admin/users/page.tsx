import { createSupabaseClient } from "@/lib/supabase/supabaseServer";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const supabase = await createSupabaseClient();

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("id, email, created_datetime_utc, modified_datetime_utc, is_superadmin")
    .order("created_datetime_utc", { ascending: false });

  if (error) return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {error.message}</div>;

  // Get caption counts per user
  const { data: captionCounts } = await supabase
    .from("captions")
    .select("profile_id");

  // Get image counts per user
  const { data: imageCounts } = await supabase
    .from("images")
    .select("profile_id");

  const captionMap: Record<string, number> = {};
  const imageMap: Record<string, number> = {};
  (captionCounts ?? []).forEach((c: any) => {
    captionMap[c.profile_id] = (captionMap[c.profile_id] ?? 0) + 1;
  });
  (imageCounts ?? []).forEach((i: any) => {
    imageMap[i.profile_id] = (imageMap[i.profile_id] ?? 0) + 1;
  });

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Users</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          {profiles?.length ?? 0} registered profiles · read-only
        </div>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Email", "Role", "Captions", "Images", "Joined", "Last Updated"].map((h) => (
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
            {(profiles ?? []).map((p) => (
              <tr key={p.id}>
                <td style={{ padding: "14px 16px", fontSize: 13, borderBottom: "1px solid var(--border)" }}>
                  {p.email}
                </td>
                <td style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 8px",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: p.is_superadmin ? "#0e1a00" : "var(--border)",
                      color: p.is_superadmin ? "var(--accent)" : "var(--muted)",
                      border: `1px solid ${p.is_superadmin ? "var(--accent)" : "transparent"}`,
                    }}
                  >
                    {p.is_superadmin ? "Superadmin" : "User"}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  {captionMap[p.id] ?? 0}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 13, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  {imageMap[p.id] ?? 0}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  {p.created_datetime_utc?.slice(0, 10)}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  {p.modified_datetime_utc?.slice(0, 10)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!profiles?.length && (
          <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>
            No users found.
          </div>
        )}
      </div>
    </div>
  );
}
