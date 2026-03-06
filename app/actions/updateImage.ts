"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";

export async function updateImage(
  id: string,
  data: {
    url: string;
    profile_id: string | null;
    is_common_use: boolean;
  }
) {
  const supabase = createAdminClient();
  const { data: image, error } = await supabase
    .from("images")
    .update(data)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return image;
}