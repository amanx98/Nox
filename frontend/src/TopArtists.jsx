import { useState, useEffect } from "react";
import { getTopArtists } from "./api/client";

export default function TopArtists() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadArtists();
  }, []);

  async function loadArtists() {
    try {
      const data = await getTopArtists();
      setArtists(data);
    } catch (err) {
      setError(err.message);
    }
  }

  if (error) return <p style={{ color: "#e08a70" }}>{error}</p>;

  return (
    <div style={{ marginBottom: "36px" }}>
      <h2>Top Artists</h2>
      <div className="card" style={{ maxWidth: "480px" }}>
        {artists.map((artist, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "10px 0",
              borderBottom: i < artists.length - 1 ? "1px solid var(--border-dark)" : "none",
            }}
          >
            <span style={{ color: "var(--ink)" }}>
              <span className="meta" style={{ marginRight: "10px" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {artist.name}
            </span>
            <span className="meta">{artist.playcount} plays</span>
          </div>
        ))}
      </div>
    </div>
  );
}