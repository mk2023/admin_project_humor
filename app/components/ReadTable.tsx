export default function ReadTable({
  title,
  subtitle,
  columns,
  rows,
}: {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: (string | number | boolean | null)[][];
}) {
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
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "12px 16px", fontSize: 12, borderBottom: "1px solid var(--border)", color: typeof cell === "boolean" ? (cell ? "var(--accent)" : "var(--muted)") : "var(--text)", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {cell === null || cell === undefined ? <span style={{ color: "var(--muted)" }}>—</span>
                      : typeof cell === "boolean" ? (cell ? "✓" : "✗")
                      : String(cell).length > 80 ? String(cell).slice(0, 80) + "…"
                      : String(cell)}
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
    </div>
  );
}