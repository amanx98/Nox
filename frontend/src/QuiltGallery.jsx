import { useState, useEffect } from "react";
import { generateQuilt, getQuilts } from "./api/client";

const PERIODS = [
  { value: "overall", label: "All time" },
  { value: "7day", label: "Last 7 days" },
  { value: "1month", label: "Last month" },
  { value: "3month", label: "Last 3 months" },
  { value: "6month", label: "Last 6 months" },
  { value: "12month", label: "Last year" },
];

export default function QuiltGallery() {
  const [quilts, setQuilts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("overall");
  const [quiltType, setQuiltType] = useState("albums");
  const [gridSize, setGridSize] = useState(3);

  useEffect(() => {
    loadQuilts();
  }, []);

  async function loadQuilts() {
    try {
      const data = await getQuilts();
      setQuilts(data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleGenerate() {
    setLoading(true);
    setError("");
    try {
      await generateQuilt(period, quiltType, gridSize);
      await loadQuilts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Album Quilts</h2>
      {error && <p style={{ color: "#e08a70" }}>{error}</p>}

      <div className="card" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", maxWidth: "600px", marginBottom: "20px" }}>
        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          {PERIODS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>

        <select value={quiltType} onChange={(e) => setQuiltType(e.target.value)}>
          <option value="albums">Top Albums</option>
          <option value="tracks">Top Tracks</option>
        </select>

        <select value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))}>
          <option value={2}>2x2</option>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>

        <button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate Quilt"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {quilts.map((quilt) => (
          <div key={quilt.id} className="quilt-frame">
            <img src={quilt.image_url} alt={`Quilt ${quilt.id}`} />
            <div className="meta" style={{ paddingTop: "8px" }}>
              {quilt.quilt_type} &middot; {quilt.period} &middot;{" "}
              {new Date(quilt.created_at).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}