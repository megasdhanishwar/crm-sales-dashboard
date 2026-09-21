import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, children, onClose, wide = false }) {
  return (
    <div className="modal-backdrop">
      <div className={`form-modal ${wide ? "wide" : ""}`}>
        <div className="modal-header">
          <div>
            <h3>{title}</h3>
            <p>Fill in the information below.</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
