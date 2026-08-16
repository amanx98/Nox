import { NavLink, Outlet } from "react-router-dom";

export default function Layout({ user }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <nav
        style={{
          width: "220px",
          flexShrink: 0,
          background: "var(--bg-raised)",
          borderRight: "1px solid var(--border)",
          padding: "24px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <div className="meta-light" style={{ marginBottom: "4px" }}>
            Signed in as
          </div>
          <h3 style={{ margin: 0 }}>{user.username}</h3>
        </div>

        <SidebarLink to="/" label="Feed" end />
        <SidebarLink to="/profile" label="Profile" />
      </nav>

      <main style={{ flex: 1, padding: "32px 40px" }}>
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({ to, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        fontFamily: "var(--font-display)",
        fontSize: "16px",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        padding: "10px 12px",
        borderRadius: "3px",
        textDecoration: "none",
        color: isActive ? "var(--ink)" : "var(--cream-text-dim)",
        background: isActive ? "var(--mustard)" : "transparent",
      })}
    >
      {label}
    </NavLink>
  );
}