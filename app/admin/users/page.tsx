import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import PaginatedTable from "@/app/components/PaginatedTable";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const supabase = createAdminClient();

  const [
    { data: profiles, error },
    { data: captionCounts },
    { data: imageCounts },
  ] = await Promise.all([
    supabase.from("profiles").select("id, email, created_datetime_utc, modified_datetime_utc, is_superadmin").order("created_datetime_utc", { ascending: false }),
    supabase.from("captions").select("profile_id"),
    supabase.from("images").select("profile_id"),
  ]);

  if (error) return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {error.message}</div>;

  const captionMap: Record<string, number> = {};
  const imageMap: Record<string, number> = {};
  (captionCounts ?? []).forEach((c: any) => { captionMap[c.profile_id] = (captionMap[c.profile_id] ?? 0) + 1; });
  (imageCounts ?? []).forEach((i: any) => { imageMap[i.profile_id] = (imageMap[i.profile_id] ?? 0) + 1; });

  const rows = (profiles ?? []).map((p) => [
    p.email,
    p.is_superadmin ? "Superadmin" : "User",
    captionMap[p.id] ?? 0,
    imageMap[p.id] ?? 0,
    p.created_datetime_utc?.slice(0, 10) ?? null,
    p.modified_datetime_utc?.slice(0, 10) ?? null,
  ]);

  return (
    <PaginatedTable
      title="Users"
      subtitle={`${rows.length} registered profiles · read-only`}
      columns={["Email", "Role", "Captions", "Images", "Joined", "Last Updated"]}
      rows={rows}
    />
  );
}