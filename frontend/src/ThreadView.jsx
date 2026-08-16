import { useState, useEffect } from "react";
import { getPosts, createPost } from "./api/client";

export default function ThreadView({ thread, onBack }) {
  const [posts, setPosts] = useState([]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    loadPosts();
  }, [thread]);

  async function loadPosts() {
    const data = await getPosts(thread.id);
    setPosts(data);
  }

  async function handleReply(e) {
    e.preventDefault();
    if (!reply.trim()) return;
    await createPost(thread.id, reply);
    setReply("");
    loadPosts();
  }

  return (
    <div>
      <button
        onClick={onBack}
        style={{ background: "none", color: "var(--cream-text-dim)", padding: 0, marginBottom: "20px", textTransform: "none", letterSpacing: "normal" }}
      >
        &larr; Back to threads
      </button>

      <div className="card" style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "var(--ink)" }}>{thread.title}</h2>
        <p>{thread.body}</p>
      </div>

      <h3 className="meta-light" style={{ marginBottom: "12px" }}>
        {posts.length} {posts.length === 1 ? "reply" : "replies"}
      </h3>

      <div style={{ marginBottom: "24px" }}>
        {posts.map((post) => (
          <div key={post.id} className="card" style={{ marginBottom: "10px" }}>
            <p style={{ margin: 0, color: "var(--ink)" }}>{post.body}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleReply} className="card" style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "480px" }}>
        <textarea
          placeholder="Write a reply..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
        />
        <button type="submit" style={{ alignSelf: "flex-start" }}>Reply</button>
      </form>
    </div>
  );
}