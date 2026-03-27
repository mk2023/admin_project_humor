"use server";

import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import { requireCurrentUserId } from "@/lib/supabase/currentUser";

const MAX_UPLOAD_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function uploadImage(formData: FormData) {
  const file = formData.get("file");
  const profileIdRaw = formData.get("profile_id");
  const isCommonUseRaw = formData.get("is_common_use");

  if (!(file instanceof File)) {
    throw new Error("Please choose an image file.");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed.");
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("Image must be 10MB or smaller.");
  }

  const profile_id =
    typeof profileIdRaw === "string" && profileIdRaw.trim().length > 0
      ? profileIdRaw.trim()
      : null;
  const is_common_use = isCommonUseRaw === "true";

  const supabase = createAdminClient();
  const userId = await requireCurrentUserId();
  const bucket = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BUCKET || "images";
  const filename = sanitizeFilename(file.name || "upload");
  const path = `admin-uploads/${Date.now()}-${filename}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      contentType: file.type || undefined,
      upsert: false,
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path);
  const url = publicData.publicUrl;

  const { data: image, error: insertError } = await supabase
    .from("images")
    .insert({
      url,
      profile_id,
      is_common_use,
      created_by_user_id: userId,
      modified_by_user_id: userId,
    })
    .select()
    .single();

  if (insertError) {
    throw new Error(insertError.message);
  }

  return image;
}
