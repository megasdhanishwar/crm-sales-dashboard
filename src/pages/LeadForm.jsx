import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { leadStages } from "../data";

const blank = {
  name: "",
  company: "",
  email: "",
  phone: "",
  source: "Website",
  stage: "New",
  value: "",
  followUp: "",
  owner: "Eswar",
  notes: "",
};

export default function LeadForm({ leads = [], onSave }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);
  const existing = leads.find((lead) => lead.id === Number(id));
  const [form, setForm] = useState(existing || blank);
  const [errors, setErrors] = useState({});

  const update = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.company.trim()) next.company = "Company is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email.";
    if (!form.phone.trim()) next.phone = "Phone is required.";
    if (!form.value || Number(form.value) <= 0)
      next.value = "Enter a valid lead value.";
    if (!form.followUp) next.followUp = "Select a follow-up date.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      value: Number(form.value),
      id: editing ? Number(id) : undefined,
      created: form.created || new Date().toISOString().slice(0, 10),
    });
    navigate(editing ? `/leads/${id}` : "/leads");
  };

  return (
    <>
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} /> Back
      </button>
      <div className="page-header compact">
        <div>
          <span className="eyebrow">CRM / Leads</span>
          <h2>{editing ? "Edit lead" : "Add new lead"}</h2>
          <p>
            {editing
              ? "Update the lead information below."
              : "Create a new prospect and schedule the next follow-up."}
          </p>
        </div>
      </div>
      <form className="form-panel" onSubmit={submit}>
        <div className="form-section">
          <h3>Lead information</h3>
          <p>Basic details about the prospect.</p>
          <div className="form-grid">
            <Field
              label="Full name"
              value={form.name}
              error={errors.name}
              onChange={(v) => update("name", v)}
              placeholder="e.g. Arun Kumar"
            />
            <Field
              label="Company"
              value={form.company}
              error={errors.company}
              onChange={(v) => update("company", v)}
              placeholder="e.g. Vertex Labs"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(v) => update("email", v)}
              placeholder="name@company.com"
            />
            <Field
              label="Phone"
              value={form.phone}
              error={errors.phone}
              onChange={(v) => update("phone", v)}
              placeholder="+91 98765 43210"
            />
            <SelectField
              label="Lead source"
              value={form.source}
              onChange={(v) => update("source", v)}
              options={[
                "Website",
                "Referral",
                "LinkedIn",
                "Campaign",
                "Event",
                "Instagram",
              ]}
            />
            <SelectField
              label="Lead stage"
              value={form.stage}
              onChange={(v) => update("stage", v)}
              options={leadStages}
            />
            <Field
              label="Estimated value (₹)"
              type="number"
              value={form.value}
              error={errors.value}
              onChange={(v) => update("value", v)}
              placeholder="25000"
            />
            <Field
              label="Follow-up date"
              type="date"
              value={form.followUp}
              error={errors.followUp}
              onChange={(v) => update("followUp", v)}
            />
            <SelectField
              label="Owner"
              value={form.owner}
              onChange={(v) => update("owner", v)}
              options={["Eswar", "Meena", "Rahul"]}
            />
          </div>
        </div>
        <div className="form-section">
          <h3>Notes</h3>
          <p>Add context that will help your next interaction.</p>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Write a short note..."
            rows="5"
          />
        </div>
        <div className="form-footer">
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button className="primary-button">
            <Save size={17} />
            {editing ? "Save changes" : "Create lead"}
          </button>
        </div>
      </form>
    </>
  );
}

function Field({ label, value, onChange, error, type = "text", placeholder }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <small className="field-error">{error}</small>}
    </label>
  );
}
function SelectField({ label, value, onChange, options }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
