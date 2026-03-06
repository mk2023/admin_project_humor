import { createSupabaseClient } from "@/lib/supabase/supabaseServer";
import AdminSidebar from "@/app/components/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("profiles")
    .select("email")
    .eq("id", user!.id)
    .single();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar email={profile?.email ?? user?.email ?? ""} />
      <div style={{ marginLeft: 220, flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
