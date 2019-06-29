import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="nav">
      <Link to="/movieSearch">
        <h1>My movie Drive</h1>
      </Link>
      <Link to="/library">
        <span className="library">Library</span>
      </Link>
    </nav>
  );
}
