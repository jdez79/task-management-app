// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar: React.FC = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  return (
    <nav className="nav">
      <div>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18 }}>Task Manager</Link>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">Dashboard</Link>
        <Link to="/create">Create</Link>
        {!isLoading && !isAuthenticated && (
          <button className="btn" onClick={() => loginWithRedirect()}>Log in</button>
        )}

        {!isLoading && isAuthenticated && (
          <>
            <span className="small">{user?.name ?? user?.email}</span>
            <button
              className="btn secondary"
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
