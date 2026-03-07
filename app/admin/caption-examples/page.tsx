import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import CrudTable from "@/app/components/CrudTable";
export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "image_description", label: "Image Description", type: "textarea" as const },
  { key: "caption", label: "Caption", type: "textarea" as const },
  { key: "explanation", label: "Explanation", type: "textarea" as const },
  { key: "priority", label: "Priority", type: "number" as const },
  { key: "image_id", label: "Image ID", type: "text" as const },
];

export default async function CaptionExamplesPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("caption_examples")
    .select("*")
    .order("priority");
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Caption Examples</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Create, edit & delete caption examples</div>
      </div>
      <CrudTable title="Caption Examples" table="caption_examples" data={data ?? []} displayColumns={["id", "caption", "priority", "image_id", "created_datetime_utc"]} fields={FIELDS} />
    </div>
  );
}