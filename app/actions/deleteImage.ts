"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";

export async function deleteImage(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("images").delete().eq("id", id);
  if (error) throw new Error(error.message);
}