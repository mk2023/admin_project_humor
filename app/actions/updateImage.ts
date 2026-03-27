"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { requireCurrentUserId } from "@/lib/supabase/currentUser";

export async function updateImage(
  id: string,
  data: {
    url: string;
    profile_id: string | null;
    is_common_use: boolean;
  }
) {
  const supabase = createAdminClient();
  const userId = await requireCurrentUserId();
  const { data: image, error } = await supabase
    .from("images")
    .update({
      ...data,
      modified_by_user_id: userId,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return image;
}