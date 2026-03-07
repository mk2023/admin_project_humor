import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import PaginatedTable from "@/app/components/PaginatedTable";
export const dynamic = "force-dynamic";

export default async function LLMResponsesPage() {
  const supabase = createAdminClient();

  let allData: any[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("llm_model_responses")
      .select("id, llm_model_id, processing_time_seconds, llm_temperature, profile_id, created_datetime_utc")
      .order("created_datetime_utc", { ascending: false })
      .range(from, from + batchSize - 1);

    if (error || !data || data.length === 0) break;
    allData = [...allData, ...data];
    if (data.length < batchSize) break;
    from += batchSize;
  }

  const rows = allData.map((r: any) => [
    r.id,
    r.llm_model_id,
    r.processing_time_seconds,
    r.llm_temperature,
    r.profile_id,
    r.created_datetime_utc?.slice(0, 10),
  ]);

  return (
    <PaginatedTable
      title="LLM Responses"
      subtitle={`${rows.length} total · read-only`}
      columns={["ID", "Model ID", "Proc. Time (s)", "Temperature", "Profile ID", "Created"]}
      rows={rows}
    />
  );
}