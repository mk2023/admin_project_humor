"use client";
import { useState } from "react";

const PAGE_SIZE = 50;

export default function PaginatedTable({
  columns,
  rows,
  title,
  subtitle,
}: {
  columns: string[];
  rows: (string | number | boolean | null)[][];
  title: string;
  subtitle?: string;
}) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const visible = rows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const formatCell = (val: string | number | boolean | null) => {
    if (val === null || val === undefined) return <span style={{ color: "var(--muted)" }}>—</span>;
    if (typeof val === "boolean") return <span style={{ color: val ? "var(--accent)" : "var(--muted)" }}>{val ? "✓" : "✗"}</span>;
    const str = String(val);
    return str.length > 80 ? str.slice(0, 80) + "…" : str;
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 32, borderBottom: "1px solid var(--border)", paddingBottom: 20 }}>
        <div style={{ fontFamily: "var(--serif)", fontSize: 28, fontStyle: "italic" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{subtitle}</div>}
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", padding: "12px 16px", textAlign: "left", borderBottom: "1px solid var(--border)", fontWeight: 400, whiteSpace: "nowrap" }}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {formatCell(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>No data found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, rows.length)} of {rows.length}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{ padding: "6px 14px", background: "transparent", border: "1px solid var(--border)", color: page === 0 ? "var(--muted)" : "var(--text)", fontSize: 11, cursor: page === 0 ? "not-allowed" : "pointer", letterSpacing: "0.1em" }}
            >
              ← Prev
            </button>
            <div style={{ display: "flex", gap: 4 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  style={{ width: 32, height: 32, background: i === page ? "var(--accent)" : "transparent", border: `1px solid ${i === page ? "var(--accent)" : "var(--border)"}`, color: i === page ? "#0a0a08" : "var(--muted)", fontSize: 11, cursor: "pointer" }}
                >
                  {i + 1}
                </button>
              )).slice(Math.max(0, page - 2), page + 3)}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{ padding: "6px 14px", background: "transparent", border: "1px solid var(--border)", color: page === totalPages - 1 ? "var(--muted)" : "var(--text)", fontSize: 11, cursor: page === totalPages - 1 ? "not-allowed" : "pointer", letterSpacing: "0.1em" }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}