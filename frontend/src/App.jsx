import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Layout from "./Layout";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <div>
        {showRegister ? (
          <Register onRegisterSuccess={() => setShowRegister(false)} />
        ) : (
          <Login onLoginSuccess={setUser} />
        )}
        <div style={{ textAlign: "center", marginTop: "12px" }}>
          <button
            onClick={() => setShowRegister(!showRegister)}
            style={{
              background: "none",
              color: "var(--cream-text-dim)",
              textTransform: "none",
              letterSpacing: "normal",
              fontWeight: 400,
              padding: 0,
            }}
          >
            {showRegister ? "Already have an account? Log in" : "Need an account? Register"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} />}>
          <Route index element={<FeedPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;