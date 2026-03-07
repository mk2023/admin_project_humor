"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";

export async function updateHumorMix(id: number, caption_count: number) {
const supabase = createAdminClient();
const { error } = await supabase.from("humor_flavor_mix").update({ caption_count }).eq("id", id);
if (error) throw new Error(error.message);
}