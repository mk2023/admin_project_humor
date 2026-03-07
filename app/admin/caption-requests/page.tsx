import { createAdminClient } from "@/lib/supabase/supabaseAdmin";
import PaginatedTable from "@/app/components/PaginatedTable";
export const dynamic = "force-dynamic";

export default async function CaptionRequestsPage() {
  const supabase = createAdminClient();

  let allData: any[] = [];
  let from = 0;
  const batchSize = 1000;

  while (true) {
    const { data, error } = await supabase
      .from("caption_requests")
      .select("id, profile_id, image_id, created_datetime_utc")
      .order("created_datetime_utc", { ascending: false })
      .range(from, from + batchSize - 1);

    if (error || !data || data.length === 0) break;
    allData = [...allData, ...data];
    if (data.length < batchSize) break;
    from += batchSize;
  }

  const rows = allData.map((r: any) => [
    r.id,
    r.profile_id,
    r.image_id,
    r.created_datetime_utc?.slice(0, 10),
  ]);

  return (
    <PaginatedTable
      title="Caption Requests"
      subtitle={`${rows.length} total · read-only`}
      columns={["ID", "Profile ID", "Image ID", "Created"]}
      rows={rows}
    />
  );
}