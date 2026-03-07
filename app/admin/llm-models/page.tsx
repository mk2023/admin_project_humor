import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import CrudTable from "@/app/components/CrudTable";
export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "name", label: "Name", type: "text" as const },
  { key: "provider_model_id", label: "Provider Model ID", type: "text" as const },
  { key: "llm_provider_id", label: "LLM Provider ID", type: "number" as const },
  { key: "is_temperature_supported", label: "Temperature Supported", type: "checkbox" as const },
];

export default async function LLMModelsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("llm_models").select("*").order("id");
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>LLM Models</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Create, edit & delete LLM models</div>
      </div>
      <CrudTable title="LLM Models" table="llm_models" data={data ?? []} displayColumns={["id", "name", "provider_model_id", "llm_provider_id", "is_temperature_supported"]} fields={FIELDS} />
    </div>
  );
}