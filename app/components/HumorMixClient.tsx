"use client";
import { useState } from "react";
import { updateHumorMix } from "@/app/actions/humorMix";

type Mix = { id: number; humor_flavor_id: number; caption_count: number; created_datetime_utc: string | null };
type Flavor = { id: number; slug: string };

export default function HumorMixClient({ mix, flavors }: { mix: Mix[]; flavors: Flavor[] }) {
  const [rows, setRows] = useState(mix);
  const [editing, setEditing] = useState<{ id: number; caption_count: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const flavorSlug = (id: number) => flavors.find((f) => f.id === id)?.slug ?? id;

  const handleSave = async () => {
    if (!editing) return;
    setLoading(true);
    setError("");
    try {
      await updateHumorMix(editing.id, editing.caption_count);
      setRows((prev) => prev.map((r) => r.id === editing.id ? { ...r, caption_count: editing.caption_count } : r));
      setEditing(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID", "Flavor", "Caption Count", "Created", ""].map((h) => (
                <th key={h} style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", padding: "12px 16px", textAlign: "left", borderBottom: "1px solid var(--border)", fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)" }}>{r.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)" }}>{String(flavorSlug(r.humor_flavor_id))}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)" }}>
                  {editing?.id === r.id ? (
                    <input
                      type="number"
                      value={editing.caption_count}
                      onChange={(e) => setEditing({ ...editing, caption_count: Number(e.target.value) })}
                      style={{ background: "var(--bg)", border: "1px solid var(--accent)", color: "var(--text)", padding: "4px 8px", fontSize: 12, width: 80 }}
                    />
                  ) : r.caption_count}
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>{r.created_datetime_utc?.slice(0, 10)}</td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                  {editing?.id === r.id ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={handleSave} disabled={loading} style={{ padding: "4px 10px", background: "var(--accent)", color: "#0a0a08", border: "none", fontSize: 11, cursor: "pointer" }}>
                        {loading ? "…" : "Save"}
                      </button>
                      <button onClick={() => setEditing(null)} style={{ padding: "4px 10px", background: "transparent", color: "var(--muted)", border: "1px solid var(--border)", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setEditing({ id: r.id, caption_count: r.caption_count })} style={{ padding: "4px 10px", background: "transparent", color: "var(--text)", border: "1px solid var(--border)", fontSize: 11, cursor: "pointer" }}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 12 }}>{error}</div>}
    </>
  );
}