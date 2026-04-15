"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { duplicateHumorFlavor } from "@/app/actions/duplicateHumorFlavor";

type FlavorRow = {
  id: number;
  slug: string;
  description: string | null;
  created_datetime_utc: string | null;
};

const btn = (disabled: boolean) =>
  ({
    padding: "4px 10px",
    background: "transparent",
    color: disabled ? "var(--muted)" : "var(--text)",
    border: "1px solid var(--border)",
    fontSize: 11,
    cursor: disabled ? "not-allowed" : "pointer",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
  } as React.CSSProperties);

export default function HumorFlavorsClient({ flavors }: { flavors: FlavorRow[] }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const onDuplicate = async (f: FlavorRow) => {
    const raw = window.prompt("New unique slug for duplicated flavor:", `${f.slug}-copy`);
    if (!raw) return;
    setLoadingId(f.id);
    setError("");
    try {
      await duplicateHumorFlavor(f.id, raw);
      router.refresh();
    } catch (e: any) {
      setError(e?.message ?? "Failed to duplicate flavor");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["ID", "Slug", "Description", "Created", ""].map((c) => (
                <th
                  key={c}
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    padding: "12px 16px",
                    textAlign: "left",
                    borderBottom: "1px solid var(--border)",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {flavors.map((f) => (
              <tr key={f.id}>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)" }}>{f.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)" }}>{f.slug}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  {f.description ?? "—"}
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", color: "var(--muted)" }}>
                  {f.created_datetime_utc?.slice(0, 10) ?? "—"}
                </td>
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                  <button
                    onClick={() => onDuplicate(f)}
                    disabled={loadingId !== null}
                    style={btn(loadingId !== null)}
                    title="Duplicate flavor and its steps"
                  >
                    {loadingId === f.id ? "…" : "Duplicate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {flavors.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>No data found.</div>
        )}
      </div>

      {error && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 12 }}>{error}</div>}
    </>
  );
}

