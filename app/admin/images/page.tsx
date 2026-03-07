import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import ImagesClient from "@/app/components/ImagesClient";
export const dynamic = "force-dynamic";

export default async function ImagesPage() {
  const supabase = createAdminClient();

  let allImages: any[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("images")
      .select("id, url, created_datetime_utc, modified_datetime_utc, is_common_use, profile_id")
      .order("created_datetime_utc", { ascending: false })
      .range(from, from + batchSize - 1);

    if (error || !data || data.length === 0) break;
    allImages = [...allImages, ...data];
    if (data.length < batchSize) break;
    from += batchSize;
  }

  const { data: profiles } = await supabase.from("profiles").select("id, email");
  //ImagesClient deals with editing/adding/deleting images
  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>Images</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
          {allImages.length} images · Create, edit & delete
        </div>
      </div>
      <ImagesClient images={allImages} profiles={profiles ?? []} />
    </div>
  );
}