"use server";

import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { requireCurrentUserId } from "@/lib/supabase/currentUser";

function slugify(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripAuditFields(row: Record<string, any>) {
  const copy: Record<string, any> = { ...row };
  delete copy.id;
  delete copy.created_datetime_utc;
  delete copy.modified_datetime_utc;
  delete copy.created_by_user_id;
  delete copy.modified_by_user_id;
  return copy;
}

export async function duplicateHumorFlavor(sourceFlavorId: number, newSlugRaw: string) {
  const supabase = createAdminClient();
  const userId = await requireCurrentUserId();

  const newSlug = slugify(newSlugRaw);
  if (!newSlug) {
    throw new Error("New slug is required.");
  }

  const { data: existing, error: existingError } = await supabase
    .from("humor_flavors")
    .select("id")
    .eq("slug", newSlug)
    .maybeSingle();

  if (existingError) throw new Error(existingError.message);
  if (existing) throw new Error("That slug already exists. Please choose a unique slug.");

  const { data: sourceFlavor, error: sourceFlavorError } = await supabase
    .from("humor_flavors")
    .select("*")
    .eq("id", sourceFlavorId)
    .single();

  if (sourceFlavorError) throw new Error(sourceFlavorError.message);

  const newFlavorPayload = {
    ...stripAuditFields(sourceFlavor as any),
    slug: newSlug,
    created_by_user_id: userId,
    modified_by_user_id: userId,
  };

  const { data: newFlavor, error: newFlavorError } = await supabase
    .from("humor_flavors")
    .insert(newFlavorPayload)
    .select("*")
    .single();

  if (newFlavorError) throw new Error(newFlavorError.message);

  const { data: sourceSteps, error: sourceStepsError } = await supabase
    .from("humor_flavor_steps")
    .select("*")
    .eq("humor_flavor_id", sourceFlavorId)
    .order("order_by", { ascending: true });

  if (sourceStepsError) throw new Error(sourceStepsError.message);

  const stepRows = (sourceSteps ?? []).map((s: any) => ({
    ...stripAuditFields(s),
    humor_flavor_id: (newFlavor as any).id,
    created_by_user_id: userId,
    modified_by_user_id: userId,
  }));

  if (stepRows.length > 0) {
    const { error: insertStepsError } = await supabase.from("humor_flavor_steps").insert(stepRows);
    if (insertStepsError) throw new Error(insertStepsError.message);
  }

  return { newFlavorId: (newFlavor as any).id, newSlug };
}

