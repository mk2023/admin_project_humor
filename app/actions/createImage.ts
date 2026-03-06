"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";

export async function createImage(data: {
  url: string;
  profile_id: string | null;
  is_common_use: boolean;
}) {
  const supabase = createAdminClient();
  const { data: image, error } = await supabase
    .from("images")
    .insert(data)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return image;
}