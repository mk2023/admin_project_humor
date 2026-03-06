"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createImage } from "@/app/actions/createImage";
import { updateImage } from "@/app/actions/updateImage";
import { deleteImage } from "@/app/actions/deleteImage";

type Image = {
  id: string;
  url: string;
  created_datetime_utc: string | null;
  modified_datetime_utc: string | null;
  is_common_use: boolean | null;
  profile_id: string | null;
};
type Profile = { id: string; email: string };

type Modal =
  | { type: "create" }
  | { type: "edit"; image: Image }
  | { type: "delete"; image: Image }
  | null;

const btn = (variant: "primary" | "ghost" | "danger", extra?: object) =>
  ({
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 14px",
    fontSize: 11,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    border: "1px solid",
    background: variant === "primary" ? "var(--accent)" : "transparent",
    color:
      variant === "primary"
        ? "#0a0a08"
        : variant === "danger"
        ? "var(--danger)"
        : "var(--text)",
    borderColor:
      variant === "primary"
        ? "var(--accent)"
        : variant === "danger"
        ? "var(--danger)"
        : "var(--border)",
    ...extra,
  } as React.CSSProperties);

export default function ImagesClient({
  images: initial,
  profiles,
}: {
  images: Image[];
  profiles: Profile[];
}) {
  const [images, setImages] = useState<Image[]>(initial);
  const [modal, setModal] = useState<Modal>(null);
  const [form, setForm] = useState({ url: "", profile_id: "", is_common_use: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const openCreate = () => {
    setForm({ url: "", profile_id: "", is_common_use: false });
    setError("");
    setModal({ type: "create" });
  };
  const openEdit = (image: Image) => {
    setForm({
      url: image.url,
      profile_id: image.profile_id ?? "",
      is_common_use: image.is_common_use ?? false,
    });
    setError("");
    setModal({ type: "edit", image });
  };
  const openDelete = (image: Image) => {
    setError("");
    setModal({ type: "delete", image });
  };

  const handleCreate = async () => {
    if (!form.url) { setError("URL is required."); return; }
    setLoading(true);
    setError("");
    try {
      const data = await createImage({
        url: form.url,
        profile_id: form.profile_id || null,
        is_common_use: form.is_common_use,
      });
      setImages((prev) => [data, ...prev]);
      setModal(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (modal?.type !== "edit") return;
    if (!form.url) { setError("URL is required."); return; }
    setLoading(true);
    setError("");
    try {
      const data = await updateImage(modal.image.id, {
        url: form.url,
        profile_id: form.profile_id || null,
        is_common_use: form.is_common_use,
      });
      setImages((prev) => prev.map((i) => (i.id === modal.image.id ? data : i)));
      setModal(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (modal?.type !== "delete") return;
    setLoading(true);
    setError("");
    try {
      await deleteImage(modal.image.id);
      setImages((prev) => prev.filter((i) => i.id !== modal.image.id));
      setModal(null);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const ownerEmail = (profileId: string | null) =>
    profiles.find((p) => p.id === profileId)?.email ?? "—";

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>{images.length} images</div>
        <button style={btn("primary")} onClick={openCreate}>+ Add Image</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {images.map((img) => (
          <div
            key={img.id}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", overflow: "hidden" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt=""
              style={{ width: "100%", height: 160, objectFit: "cover", display: "block", filter: "grayscale(15%)" }}
            />
            <div style={{ padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4 }}>
                {ownerEmail(img.profile_id)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 11 }}>
                <span style={{ color: "var(--muted)" }}>{img.created_datetime_utc?.slice(0, 10)}</span>
                {img.is_common_use && (
                  <span
                    style={{
                      padding: "1px 6px",
                      background: "#0e1a00",
                      color: "var(--accent)",
                      border: "1px solid var(--accent)",
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Common Use
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={btn("ghost")} onClick={() => openEdit(img)}>Edit</button>
                <button style={btn("danger")} onClick={() => openDelete(img)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!images.length && (
        <div style={{ textAlign: "center", padding: 48, color: "var(--muted)", fontSize: 13 }}>
          No images yet.
        </div>
      )}

      {modal && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
            zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
          }}
          onClick={() => setModal(null)}
        >
          <div
            style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              width: "100%", maxWidth: 480, padding: 32, position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, var(--accent2), transparent)" }} />

            <div style={{ fontFamily: "var(--serif)", fontSize: 24, fontStyle: "italic", marginBottom: 24 }}>
              {modal.type === "create" && "Add Image"}
              {modal.type === "edit" && "Edit Image"}
              {modal.type === "delete" && "Delete Image"}
            </div>

            {modal.type === "delete" ? (
              <>
                <div style={{ background: "#1a0505", border: "1px solid #3a1010", padding: "12px 14px", fontSize: 12, color: "#ff8080", marginBottom: 20 }}>
                  This will permanently delete this image. This action cannot be undone.
                </div>
                {error && <div style={{ color: "var(--danger)", fontSize: 12, marginBottom: 12 }}>{error}</div>}
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button style={btn("ghost")} onClick={() => setModal(null)}>Cancel</button>
                  <button style={btn("danger")} onClick={handleDelete} disabled={loading}>
                    {loading ? "Deleting…" : "Delete Forever"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>
                    Image URL *
                  </label>
                  <input
                    type="url"
                    value={form.url}
                    onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                    placeholder="https://…"
                    style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, padding: "10px 12px", outline: "none" }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 10, letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 8 }}>
                    Owner
                  </label>
                  <select
                    value={form.profile_id}
                    onChange={(e) => setForm((f) => ({ ...f, profile_id: e.target.value }))}
                    style={{ width: "100%", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)", fontSize: 13, padding: "10px 12px", outline: "none" }}
                  >
                    <option value="">None</option>
                    {profiles.map((p) => (
                      <option key={p.id} value={p.id}>{p.email}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}>
                  <input
                    type="checkbox"
                    id="is_common_use"
                    checked={form.is_common_use}
                    onChange={(e) => setForm((f) => ({ ...f, is_common_use: e.target.checked }))}
                    style={{ accentColor: "var(--accent)", width: 14, height: 14 }}
                  />
                  <label htmlFor="is_common_use" style={{ fontSize: 12, color: "var(--muted)", cursor: "pointer" }}>
                    Mark as common use
                  </label>
                </div>

                {error && <div style={{ color: "var(--danger)", fontSize: 12, marginBottom: 12 }}>{error}</div>}

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button style={btn("ghost")} onClick={() => setModal(null)}>Cancel</button>
                  <button
                    style={btn("primary")}
                    onClick={modal.type === "create" ? handleCreate : handleEdit}
                    disabled={loading}
                  >
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