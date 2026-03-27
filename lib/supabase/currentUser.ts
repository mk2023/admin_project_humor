import { createSupabaseClient } from "@/lib/supabase/supabaseServer";

export async function requireCurrentUserId() {
  const supabase = await createSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized");
  }

  return user.id;
}
