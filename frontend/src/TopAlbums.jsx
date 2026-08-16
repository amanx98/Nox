import { useState, useEffect } from "react";
import { getTopAlbums } from "./api/client";

export default function TopAlbums() {
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAlbums();
  }, []);

  async function loadAlbums() {
    try {
      const data = await getTopAlbums();
      setAlbums(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p style={{ color: "#e08a70" }}>{error}</p>;

  return (
    <div style={{ marginBottom: "36px" }}>
      <h2>Top Albums</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "14px" }}>
        {albums.map((album, i) => (
          <div key={i} className="quilt-frame">
            {album.image_url && (
              <img src={album.image_url} alt={album.name} />
            )}
            <div style={{ paddingTop: "8px" }}>
              <div style={{ color: "var(--ink)", fontWeight: 600, fontSize: "13px", lineHeight: 1.3 }}>
                {album.name}
              </div>
              <div className="meta">{album.artist}</div>
              <div className="meta" style={{ color: "var(--teal-dim)" }}>{album.playcount} plays</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}