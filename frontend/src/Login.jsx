import { useState } from "react";
import { login, getMe } from "./api/client";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      const user = await getMe();
      onLoginSuccess(user);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ width: "320px", display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <h2 style={{ color: "var(--ink)" }}>Log in</h2>
        {error && (
          <p style={{ color: "#a03a2c", fontSize: "13px", margin: 0 }}>{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}