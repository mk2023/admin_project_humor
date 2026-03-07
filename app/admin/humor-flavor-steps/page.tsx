import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import PaginatedTable from "@/app/components/PaginatedTable";
export const dynamic = "force-dynamic";
export default async function HumorFlavorStepsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("humor_flavor_steps")
    .select("id, humor_flavor_id, order_by, llm_temperature, created_datetime_utc")
    .order("humor_flavor_id")
    .order("order_by");
  const rows = (data ?? []).map((r: any) => [r.id, r.humor_flavor_id, r.order_by, r.llm_temperature, r.created_datetime_utc?.slice(0, 10)]);
  return <PaginatedTable title="Humor Flavor Steps" subtitle={`${rows.length} total · read-only`} columns={["ID", "Flavor ID", "Order", "Temperature", "Created"]} rows={rows} />;
}