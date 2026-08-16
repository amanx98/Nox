import { useState, useEffect } from "react";
import { getTags, createTag } from "./api/client";

export default function TagList({ onSelectTag }) {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagType, setNewTagType] = useState("artist");

  useEffect(() => {
    loadTags();
  }, []);

  async function loadTags() {
    const data = await getTags();
    setTags(data);
  }

  async function handleCreateTag(e) {
    e.preventDefault();
    if (!newTagName.trim()) return;
    await createTag(newTagName, newTagType);
    setNewTagName("");
    loadTags();
  }

  return (
    <div>
      <h1>Communities</h1>

      <div style={{ marginBottom: "24px" }}>
        {tags.map((tag, i) => (
          <div className="track-row" key={tag.id}>
            <span className="track-number">{String(i + 1).padStart(2, "0")}</span>
            <button onClick={() => onSelectTag(tag)}>
              {tag.name}
              <span className="meta-light" style={{ marginLeft: "10px" }}>
                {tag.type}
              </span>
            </button>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleCreateTag}
        className="card"
        style={{ display: "flex", gap: "8px", alignItems: "center", maxWidth: "480px" }}
      >
        <input
          type="text"
          placeholder="New tag name"
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={newTagType} onChange={(e) => setNewTagType(e.target.value)}>
          <option value="artist">Artist</option>
          <option value="genre">Genre</option>
          <option value="custom">Custom</option>
        </select>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}