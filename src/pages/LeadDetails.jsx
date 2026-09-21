import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
  UserRound,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { activities, money } from "../data";

export default function LeadDetails({ leads, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const lead = leads.find((item) => item.id === Number(id));
  if (!lead)
    return (
      <div className="panel not-found">
        <h3>Lead not found</h3>
        <button className="primary-button" onClick={() => navigate("/leads")}>
          Back to leads
        </button>
      </div>
    );

  return (
    <>
      <button className="back-link" onClick={() => navigate("/leads")}>
        <ArrowLeft size={16} /> Back to leads
      </button>
      <div className="detail-header">
        <div className="detail-person">
          <div className="detail-avatar">
            {lead.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <span className="eyebrow">Lead profile</span>
            <h2>{lead.name}</h2>
            <p>
              {lead.company} · {lead.source} lead
            </p>
          </div>
        </div>
        <div className="detail-actions">
          <button
            className="secondary-button"
            onClick={() => navigate(`/leads/${lead.id}/edit`)}
          >
            <Pencil size={16} /> Edit
          </button>
          <button className="danger-outline" onClick={() => onDelete(lead.id)}>
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
      <div className="detail-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Lead information</h3>
              <p>Contact and qualification details</p>
            </div>
            <span className={`status-badge ${lead.stage.toLowerCase()}`}>
              {lead.stage}
            </span>
          </div>
          <div className="info-grid">
            <Info icon={<Mail />} label="Email" value={lead.email} />
            <Info icon={<Phone />} label="Phone" value={lead.phone} />
            <Info
              icon={<CalendarDays />}
              label="Follow-up"
              value={lead.followUp}
            />
            <Info icon={<UserRound />} label="Owner" value={lead.owner} />
            <Info icon={<MapPin />} label="Lead source" value={lead.source} />
            <Info
              icon={<span>₹</span>}
              label="Estimated value"
              value={money(lead.value)}
            />
          </div>
        </div>
        <div className="panel notes-panel">
          <div className="panel-heading">
            <div>
              <h3>Notes</h3>
              <p>Latest context</p>
            </div>
          </div>
          <p className="note-text">{lead.notes || "No notes added yet."}</p>
        </div>
      </div>
      <div className="panel timeline-panel">
        <div className="panel-heading">
          <div>
            <h3>Activity timeline</h3>
            <p>Recent interactions for this lead</p>
          </div>
          <button className="secondary-button">+ Add activity</button>
        </div>
        <div className="timeline">
          {activities.slice(0, 3).map((item) => (
            <div className="timeline-item" key={item.id}>
              <div className="timeline-line">
                <i />
              </div>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
                <small>{item.date}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
function Info({ icon, label, value }) {
  return (
    <div className="info-item">
      <span>{React.cloneElement(icon, { size: 16 })}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
