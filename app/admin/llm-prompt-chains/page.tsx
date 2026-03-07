import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import PaginatedTable from "@/app/components/PaginatedTable";
export const dynamic = "force-dynamic";

export default async function LLMPromptChainsPage() {
  const supabase = createAdminClient();

  let allData: any[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("llm_prompt_chains")
      .select("id, caption_request_id, created_datetime_utc")
      .order("created_datetime_utc", { ascending: false })
      .range(from, from + batchSize - 1);

    if (error || !data || data.length === 0) break;
    allData = [...allData, ...data];
    if (data.length < batchSize) break;
    from += batchSize;
  }

  const rows = allData.map((r: any) => [
    r.id,
    r.caption_request_id,
    r.created_datetime_utc?.slice(0, 10),
  ]);

  return (
    <PaginatedTable
      title="LLM Prompt Chains"
      subtitle={`${rows.length} total · read-only`}
      columns={["ID", "Caption Request ID", "Created"]}
      rows={rows}
    />
  );
}