import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({ title, text, action, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <button className="modal-close" onClick={onCancel}>
          <X size={18} />
        </button>
        <div className="danger-icon">
          <AlertTriangle size={23} />
        </div>
        <h3>{title}</h3>
        <p>{text}</p>
        <div className="modal-actions">
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="danger-button" onClick={action}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
