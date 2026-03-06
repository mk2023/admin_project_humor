import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import ImagesClient from "@/app/components/ImagesClient";

export const dynamic = "force-dynamic";

export default async function ImagesPage() {
  const supabase = await createAdminClient();

  const [{ data: images, error }, { data: profiles }] = await Promise.all([
    supabase
      .from("images")
      .select("id, url, created_datetime_utc, modified_datetime_utc, is_common_use, profile_id")
      .order("created_datetime_utc", { ascending: false }),
    supabase.from("profiles").select("id, email"),
  ]);

  if (error)
    return <div style={{ padding: 32, color: "var(--danger)" }}>Error: {error.message}</div>;

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Images</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          Create, edit & delete images
        </div>
      </div>
      <ImagesClient images={images ?? []} profiles={profiles ?? []} />
    </div>
  );
}
