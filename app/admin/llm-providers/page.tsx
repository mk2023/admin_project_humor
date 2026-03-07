import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import CrudTable from "@/app/components/CrudTable";
export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "name", label: "Name", type: "text" as const },
];

export default async function LLMProvidersPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("llm_providers").select("*").order("id");
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>LLM Providers</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Create, edit & delete LLM providers</div>
      </div>
      <CrudTable title="LLM Providers" table="llm_providers" data={data ?? []} displayColumns={["id", "name", "created_datetime_utc"]} fields={FIELDS} />
    </div>
  );
}