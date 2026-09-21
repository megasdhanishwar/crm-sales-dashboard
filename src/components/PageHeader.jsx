import React from "react";
import { Plus } from "lucide-react";

export default function PageHeader({ eyebrow, title, text, button, onClick }) {
  return (
    <div className="page-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {button && (
        <button className="primary-button" onClick={onClick}>
          <Plus size={18} />
          {button}
        </button>
      )}
    </div>
  );
}
