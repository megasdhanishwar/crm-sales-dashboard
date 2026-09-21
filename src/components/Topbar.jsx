import React from "react";
import { Bell, Menu, Search, ChevronDown, User } from "lucide-react";
import { useLocation } from "react-router-dom";

const titles = {
  "/dashboard": [
    "Sales dashboard",
    "Monitor your sales performance at a glance.",
  ],
  "/leads": ["Leads", "Capture, qualify and convert your prospects."],
  "/contacts": ["Contacts", "Keep customer relationships organized."],
  "/deals": ["Deals", "Manage active opportunities and revenue."],
  "/pipeline": ["Sales pipeline", "Drag deals through every stage."],
  "/activities": [
    "Activities",
    "Stay on top of calls, meetings and follow-ups.",
  ],
  "/analytics": ["Analytics", "Understand pipeline health and sales trends."],
};

export default function Topbar({ onMenu }) {
  const location = useLocation();
  const match =
    Object.keys(titles).find((key) => location.pathname.startsWith(key)) ||
    "/dashboard";
  const [title, subtitle] = titles[match];

  return (
    <header className="topbar">
      <button className="mobile-menu icon-button" onClick={onMenu}>
        <Menu size={21} />
      </button>
      <div className="topbar-heading">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topbar-actions">
        <label className="global-search">
          <Search size={17} />
          <input placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification">
          <Bell size={19} />
          <i />
        </button>
        <div className="profile-mini">
          <div className="avatar">
            <User size={18} />
          </div>
          <div className="profile-name">
            <strong>Admin</strong>
            <span>Admin</span>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}
