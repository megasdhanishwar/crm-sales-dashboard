import React from "react";

export default function StatCard({
  icon,
  label,
  value,
  change,
  tone = "green",
  sub,
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small className={change?.startsWith("-") ? "negative" : ""}>
          {change || sub}
        </small>
      </div>
    </div>
  );
}
