import { useState, useEffect } from "react";
import { getThreads, createThread } from "./api/client";

export default function ThreadList({ tag, onSelectThread, onBack }) {
  const [threads, setThreads] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    loadThreads();
  }, [tag]);

  async function loadThreads() {
    const data = await getThreads(tag.id);
    setThreads(data);
  }

  async function handleCreateThread(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await createThread(tag.id, title, body);
    setTitle("");
    setBody("");
    loadThreads();
  }

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: "none", color: "var(--cream-text-dim)", padding: 0, marginBottom: "20px", textTransform: "none", letterSpacing: "normal" }}
      >
        &larr; Back to communities
      </button>
      <h1>{tag.name}</h1>

      <div style={{ marginBottom: "24px" }}>
        {threads.map((thread, i) => (
          <div className="track-row" key={thread.id}>
            <span className="track-number">{String(i + 1).padStart(2, "0")}</span>
            <button onClick={() => onSelectThread(thread)}>{thread.title}</button>
          </div>
        ))}
      </div>

      <form onSubmit={handleCreateThread} className="card" style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "480px" }}>
        <input
          type="text"
          placeholder="Thread title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit" style={{ alignSelf: "flex-start" }}>Post Thread</button>
      </form>
    </div>
  );
}