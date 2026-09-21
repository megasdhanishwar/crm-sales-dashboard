import React from "react";
import { Link, useLocation } from "react-router-dom";
import { CircleDollarSign, X, TrendingUp } from "lucide-react";
import { navItems } from "../App";

export default function Sidebar({ open, onClose }) {
  const location = useLocation();

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">
          <CircleDollarSign size={22} />
        </div>
        <div>
          <strong>
            Pulse<span>CRM</span>
          </strong>
          <small>Sales workspace</small>
        </div>
        <button className="icon-button sidebar-close" onClick={onClose}>
          <X size={19} />
        </button>
      </div>

      <div className="workspace-card">
        <div className="workspace-avatar"><TrendingUp size={18} /></div>
        <div>
          <strong>Workspace</strong>
          <span>Sales team</span>
        </div>
      </div>

      <p className="nav-label">Workspace</p>
      <nav className="sidebar-nav">
        {navItems.map(({ label, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            onClick={onClose}
            className={location.pathname.startsWith(path) ? "active" : ""}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <p className="nav-label">Manage</p>
        <a href="#settings">
          <span className="nav-icon">
            <span>
              <SettingsIcon />
            </span>
          </span>
          Settings
        </a>
        {/* <div className="upgrade-card">
          <div className="upgrade-icon">✦</div>
          <strong>Pro workspace</strong>
          <span>Unlock advanced sales insights.</span>
          <button>Explore plan</button>
        </div> */}
      </div>
    </aside>
  );
}

function SettingsIcon() {
  return <span className="settings-glyph">⚙</span>;
}
