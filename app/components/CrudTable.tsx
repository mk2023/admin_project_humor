"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { crudCreate, crudUpdate, crudDelete } from "@/app/actions/crud";

type Field = { key: string; label: string; type: "text" | "textarea" | "number" | "checkbox" };
type Row = Record<string, any>;

const PAGE_SIZE = 50;

const inputStyle: React.CSSProperties = {
  width: "100%", background: "var(--bg)", border: "1px solid var(--border)",
  color: "var(--text)", fontSize: 13, padding: "10px 12px", outline: "none",
};

const btn = (variant: "primary" | "ghost" | "danger"): React.CSSProperties => ({
  display: "inline-flex", alignItems: "center", padding: "6px 14px",
  fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
  cursor: "pointer", border: "1px solid",
  background: variant === "primary" ? "var(--accent)" : "transparent",
  color: variant === "primary" ? "#0a0a08" : variant === "danger" ? "var(--danger)" : "var(--text)",
  borderColor: variant === "primary" ? "var(--accent)" : variant === "danger" ? "var(--danger)" : "var(--border)",
});

export default function CrudTable({
  title, table, data: initial, displayColumns, fields,
}: {
  title: string; table: string; data: Row[]; displayColumns: string[]; fields: Field[];
}) {
  const [data, setData] = useState<Row[]>(initial);
  const [modal, setModal] = useState<{ type: "create" | "edit" | "delete"; row?: Row } | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const router = useRouter();

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const visible = data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const openCreate = () => {
    setForm(Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? false : f.type === "number" ? 0 : ""])));
    setError(""); setModal({ type: "create" });
  };
  const openEdit = (row: Row) => {
    setForm(Object.fromEntries(fields.map((f) => [f.key, row[f.key] ?? ""])));
    setError(""); setModal({ type: "edit", row });
  };
  const openDelete = (row: Row) => { setError(""); setModal({ type: "delete", row }); };

  const getSubmitPayload = () =>
    Object.fromEntries(
      fields.map((f) => {
        const value = form[f.key];
        if (f.type === "number") {
          if (value === "" || value === null || value === undefined) {
            return [f.key, null];
          }
          return [f.key, typeof value === "number" ? value : Number(value)];
        }
        return [f.key, value];
      })
    );

  const handleCreate = async () => {
    setLoading(true); setError("");
    try {
      const row = await crudCreate(table, getSubmitPayload());
      setData((prev) => [row, ...prev]);
      setPage(0);
      setModal(null); router.refresh();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleEdit = async () => {
    if (!modal?.row) return;
    setLoading(true); setError("");
    try {
      const row = await crudUpdate(table, modal.row.id, getSubmitPayload());
      setData((prev) => prev.map((r) => r.id === modal.row!.id ? row : r));
      setModal(null); router.refresh();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleDelete = async () => {
    if (!modal?.row) return;
    setLoading(true); setError("");
    try {
      await crudDelete(table, modal.row.id);
      setData((prev) => prev.filter((r) => r.id !== modal.row!.id));
      setModal(null); router.refresh();
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  const formatCell = (val: any) => {
    if (val === null || val === undefined) return <span style={{ color: "var(--muted)" }}>—</span>;
    if (typeof val === "boolean") return <span style={{ color: val ? "var(--accent)" : "var(--muted)" }}>{val ? "✓" : "✗"}</span>;
    const str = String(val);
    return str.length > 60 ? str.slice(0, 60) + "…" : str;
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>{data.length} {title.toLowerCase()}</div>
        <button style={btn("primary")} onClick={openCreate}>+ Add</button>
      </div>

      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {displayColumns.map((c) => (
                <th key={c} style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", padding: "12px 16px", textAlign: "left", borderBottom: "1px solid var(--border)", fontWeight: 400, whiteSpace: "nowrap" }}>
                  {c.replace(/_/g, " ")}
                </th>
              ))}
              <th style={{ borderBottom: "1px solid var(--border)", padding: "12px 16px" }} />
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                {displayColumns.map((col) => (
                  <td key={col} style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {formatCell(col.includes("datetime") ? row[col]?.slice(0, 10) : row[col])}
                  </td>
                ))}
                <td style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={btn("ghost")} onClick={() => openEdit(row)}>Edit</button>
                    <button style={btn("danger")} onClick={() => openDelete(row)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!data.length && <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>No data yet.</div>}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, data.length)} of {data.length}
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
              {Array.from({ length: totalPages }, (_, i) => i)
                .slice(Math.max(0, page - 2), page + 3)
                .map((i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    style={{ width: 32, height: 32, background: i === page ? "var(--accent)" : "transparent", border: `1px solid ${i === page ? "var(--accent)" : "var(--border)"}`, color: i === page ? "#0a0a08" : "var(--muted)", fontSize: 11, cursor: "pointer" }}
                  >
                    {i + 1}
                  </button>
                ))}
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

      {/* Modal */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }} onClick={() => setModal(null)}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", width: "100%", maxWidth: 520, padding: 32, position: "relative", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--accent2), transparent)" }} />
            <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontStyle: "italic", marginBottom: 24 }}>
              {modal.type === "create" && `Add ${title}`}
              {modal.type === "edit" && `Edit ${title}`}
              {modal.type === "delete" && `Delete ${title}`}
            </div>

            {modal.type === "delete" ? (
              <>
                <div style={{ background: "#1a0505", border: "1px solid #3a1010", padding: "12px 14px", fontSize: 12, color: "#ff8080", marginBottom: 20 }}>
                  This will permanently delete this record. This cannot be undone.
                </div>
                {error && <div style={{ color: "var(--danger)", fontSize: 12, marginBottom: 12 }}>{error}</div>}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button style={btn("ghost")} onClick={() => setModal(null)}>Cancel</button>
                  <button style={btn("danger")} onClick={handleDelete} disabled={loading}>{loading ? "Deleting…" : "Delete Forever"}</button>
                </div>
              </>
            ) : (
              <>
                {fields.map((f) => (
                  <div key={f.key} style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontSize: 10, letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>{f.label}</label>
                    {f.type === "textarea" ? (
                      <textarea value={form[f.key] ?? ""} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} />
                    ) : f.type === "checkbox" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" checked={!!form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.checked }))} style={{ accentColor: "var(--accent)", width: 14, height: 14 }} />
                        <span style={{ fontSize: 12, color: "var(--muted)" }}>{form[f.key] ? "Yes" : "No"}</span>
                      </div>
                    ) : (
                      <input
                        type={f.type}
                        value={form[f.key] ?? ""}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            [f.key]:
                              f.type === "number"
                                ? e.target.value === ""
                                  ? ""
                                  : Number(e.target.value)
                                : e.target.value,
                          }))
                        }
                        style={inputStyle}
                      />
                    )}
                  </div>
                ))}
                {error && <div style={{ color: "var(--danger)", fontSize: 12, marginBottom: 12 }}>{error}</div>}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 8 }}>
                  <button style={btn("ghost")} onClick={() => setModal(null)}>Cancel</button>
                  <button style={btn("primary")} onClick={modal.type === "create" ? handleCreate : handleEdit} disabled={loading}>
                    {loading ? "Saving…" : modal.type === "create" ? "Create" : "Save Changes"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}