import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import HumorMixClient from "@/app/components/HumorMixClient";
export const dynamic = "force-dynamic";
export default async function HumorMixPage() {
  const supabase = createAdminClient();
  const [{ data: mix }, { data: flavors }] = await Promise.all([
    //Grabs all rows from humor_flavor_mix and all rows from humor_flavors (to get name for each flavor)
    supabase.from("humor_flavor_mix")
        .select("id, humor_flavor_id, caption_count, created_datetime_utc")
        .order("id"),
    supabase.from("humor_flavors")
        .select("id, slug"),
  ]);
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Humor Mix</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Read & update caption counts</div>
      </div>
      <HumorMixClient mix={mix ?? []} flavors={flavors ?? []} />
    </div>
  );
}