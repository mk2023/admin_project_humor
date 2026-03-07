import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import ReadTable from "@/app/components/ReadTable";
export const dynamic = "force-dynamic";
export default async function HumorFlavorsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("humor_flavors")
    .select("id, slug, description, created_datetime_utc")
    .order("id");
  const rows = (data ?? []).map((r: any) => [r.id, r.slug, r.description, r.created_datetime_utc?.slice(0, 10)]);
  return <ReadTable title="Humor Flavors" subtitle={`${rows.length} flavors · read-only`} columns={["ID", "Slug", "Description", "Created"]} rows={rows} />;
}