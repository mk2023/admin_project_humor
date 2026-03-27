"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { requireCurrentUserId } from "@/lib/supabase/currentUser";

export async function updateHumorMix(id: number, caption_count: number) {
  const supabase = createAdminClient();
  const userId = await requireCurrentUserId();
  const { error } = await supabase
    .from("humor_flavor_mix")
    .update({ caption_count, modified_by_user_id: userId })
    .eq("id", id);
  if (error) throw new Error(error.message);
}