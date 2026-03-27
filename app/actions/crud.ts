"use server";
import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { requireCurrentUserId } from "@/lib/supabase/currentUser";

function normalizeCrudPayload(data: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      const looksLikeForeignKeyId = key.endsWith("_id") && key !== "provider_model_id";
      if (looksLikeForeignKeyId && value === "") {
        return [key, null];
      }
      return [key, value];
    })
  );
}

export async function crudCreate(table: string, data: Record<string, unknown>) {
  const supabase = createAdminClient();
  const userId = await requireCurrentUserId();
  const normalizedData = normalizeCrudPayload(data);
  const payload = {
    ...normalizedData,
    created_by_user_id: userId,
    modified_by_user_id: userId,
  };
  const { data: row, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw new Error(error.message);
  return row;
}

export async function crudUpdate(table: string, id: number | string, data: Record<string, unknown>) {
  const supabase = createAdminClient();
  const userId = await requireCurrentUserId();
  const normalizedData = normalizeCrudPayload(data);
  const payload = {
    ...normalizedData,
    modified_by_user_id: userId,
  };
  const { data: row, error } = await supabase.from(table).update(payload).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return row;
}

export async function crudDelete(table: string, id: number | string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}