import React, { useMemo, useState } from "react";
import { Mail, Pencil, Phone, Search, Trash2, UserPlus } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";

const empty = {
  name: "",
  company: "",
  email: "",
  phone: "",
  role: "",
  status: "Active",
  lastContact: new Date().toISOString().slice(0, 10),
};

export default function Contacts({ contacts, onAdd, onDelete }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const filtered = useMemo(
    () =>
      contacts.filter((c) =>
        `${c.name} ${c.company} ${c.email}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [contacts, search],
  );
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    onAdd(form);
    setForm(empty);
    setModal(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Contacts"
        text={`${contacts.length} customer contacts.`}
        button="Add contact"
        onClick={() => setModal(true)}
      />
      <div className="contact-toolbar">
        <label className="search-field">
          <Search size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
          />
        </label>
      </div>
      {filtered.length ? (
        <div className="contact-grid">
          {filtered.map((contact) => (
            <div className="contact-card" key={contact.id}>
              <div className="contact-card-top">
                <div className="person-avatar large">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <span className={`status-dot ${contact.status.toLowerCase()}`}>
                  {contact.status}
                </span>
              </div>
              <h3>{contact.name}</h3>
              <p>
                {contact.role} · {contact.company}
              </p>
              <div className="contact-meta">
                <span>
                  <Mail size={15} />
                  {contact.email}
                </span>
                <span>
                  <Phone size={15} />
                  {contact.phone}
                </span>
              </div>
              <div className="contact-card-footer">
                <small>Last contact {contact.lastContact}</small>
                <div className="row-actions">
                  <button>
                    <Pencil size={15} />
                  </button>
                  <button
                    className="delete-action"
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel">
          <EmptyState title="No contacts found" />
        </div>
      )}
      {modal && (
        <Modal title="Add contact" onClose={() => setModal(false)}>
          <form onSubmit={submit}>
            <div className="form-grid">
              <SmallField
                label="Name"
                value={form.name}
                set={(v) => setForm({ ...form, name: v })}
              />
              <SmallField
                label="Company"
                value={form.company}
                set={(v) => setForm({ ...form, company: v })}
              />
              <SmallField
                label="Email"
                value={form.email}
                set={(v) => setForm({ ...form, email: v })}
              />
              <SmallField
                label="Phone"
                value={form.phone}
                set={(v) => setForm({ ...form, phone: v })}
              />
              <SmallField
                label="Role"
                value={form.role}
                set={(v) => setForm({ ...form, role: v })}
              />
            </div>
            <div className="form-footer">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button className="primary-button">
                <UserPlus size={16} /> Add contact
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
function SmallField({ label, value, set }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input value={value} onChange={(e) => set(e.target.value)} required />
    </label>
  );
}
