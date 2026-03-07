"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";

export async function crudCreate(table: string, data: Record<string, unknown>) {
const supabase = createAdminClient();
const { data: row, error } = await supabase.from(table).insert(data).select().single();
if (error) throw new Error(error.message);
return row;
}

export async function crudUpdate(table: string, id: number | string, data: Record<string, unknown>) {
const supabase = createAdminClient();
const { data: row, error } = await supabase.from(table).update(data).eq("id", id).select().single();
if (error) throw new Error(error.message);
return row;
}

export async function crudDelete(table: string, id: number | string) {
const supabase = createAdminClient();
const { error } = await supabase.from(table).delete().eq("id", id);
if (error) throw new Error(error.message);
}