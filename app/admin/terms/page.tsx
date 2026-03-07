import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import CrudTable from "@/app/components/CrudTable";
export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "term", label: "Term", type: "text" as const },
  { key: "definition", label: "Definition", type: "textarea" as const },
  { key: "example", label: "Example", type: "textarea" as const },
  { key: "priority", label: "Priority", type: "number" as const },
  { key: "term_type_id", label: "Term Type ID", type: "number" as const },
];

export default async function TermsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("terms").select("*").order("priority");
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Terms</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Create, edit & delete terms</div>
      </div>
      <CrudTable title="Terms" table="terms" data={data ?? []} displayColumns={["id", "term", "definition", "priority", "created_datetime_utc"]} fields={FIELDS} />
    </div>
  );
}