import { useState } from "react";
import { createPaste } from "../api";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  async function submit() {
    if (!content.trim()) {
      alert("Content is required");
      return;
    }

    const res = await createPaste({
      content,
      ttl_seconds: ttl ? Number(ttl) : undefined,
      max_views: views ? Number(views) : undefined
    });

    setUrl(res.url);
    setContent("");
    setTtl("");
    setViews("");
    setCopied(false);
  }

  function copyUrl() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Pastebin Lite</h1>

        <div style={styles.card}>
          <label style={styles.label}>Paste Content</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Enter your text here..."
            style={styles.textarea}
          />

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>TTL (seconds)</label>
              <input
                type="number"
                value={ttl}
                onChange={e => setTtl(e.target.value)}
                placeholder="60"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Max Views</label>
              <input
                type="number"
                value={views}
                onChange={e => setViews(e.target.value)}
                placeholder="3"
                style={styles.input}
              />
            </div>
          </div>

          <button onClick={submit} style={styles.button}>
            Create Paste
          </button>
        </div>

        {url && (
          <div style={styles.result}>
            <input value={url} readOnly style={styles.urlInput} />
            <button onClick={copyUrl} style={styles.copyBtn}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- styles ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    width: "100%",
    maxWidth: 520,
    padding: 20,
    color: "#e5e7eb"
  },
  heading: {
    textAlign: "center",
    marginBottom: 20
  },
  card: {
    background: "#0f172a",
    padding: 20,
    borderRadius: 8
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    display: "block"
  },
  textarea: {
    width: "100%",
    height: 140,
    padding: 10,
    background: "#020617",
    color: "#e5e7eb",
    border: "1px solid #334155",
    borderRadius: 6,
    marginBottom: 15,
    resize: "vertical"
  },
  row: {
    display: "flex",
    gap: 10,
    marginBottom: 15
  },
  field: {
    flex: 1
  },
  input: {
    width: "100%",
    padding: 8,
    background: "#020617",
    color: "#e5e7eb",
    border: "1px solid #334155",
    borderRadius: 6
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#2563eb",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    fontSize: 16,
    cursor: "pointer"
  },
  result: {
    marginTop: 20,
    display: "flex",
    gap: 10,
    alignItems: "center"
  },
  urlInput: {
    flex: 1,
    padding: 8,
    background: "#020617",
    color: "#e5e7eb",
    border: "1px solid #334155",
    borderRadius: 6
  },
  copyBtn: {
    padding: "8px 16px",
    background: "#16a34a",
    border: "none",
    borderRadius: 6,
    color: "#fff",
    cursor: "pointer"
  }
};
