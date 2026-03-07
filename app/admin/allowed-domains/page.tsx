import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import CrudTable from "@/app/components/CrudTable";
export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "apex_domain", label: "Apex Domain", type: "text" as const },
];

export default async function AllowedDomainsPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("allowed_signup_domains").select("*").order("id");
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Allowed Signup Domains</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Create, edit & delete allowed domains</div>
      </div>
      <CrudTable title="Allowed Domains" table="allowed_signup_domains" data={data ?? []} displayColumns={["id", "apex_domain", "created_datetime_utc"]} fields={FIELDS} />
    </div>
  );
}