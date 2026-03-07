import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import CrudTable from "@/app/components/CrudTable";
export const dynamic = "force-dynamic";

const FIELDS = [
  { key: "email_address", label: "Email Address", type: "text" as const },
];

export default async function WhitelistPage() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("whitelist_email_addresses").select("*").order("id");
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Whitelisted Emails</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>Create, edit & delete whitelisted email addresses</div>
      </div>
      <CrudTable title="Whitelist" table="whitelist_email_addresses" data={data ?? []} displayColumns={["id", "email_address", "created_datetime_utc"]} fields={FIELDS} />
    </div>
  );
}