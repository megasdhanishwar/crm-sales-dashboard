import React, { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import EmptyState from "../components/EmptyState";
import { dealStages, money } from "../data";

const empty = {
  title: "",
  company: "",
  contact: "",
  value: "",
  stage: "New",
  probability: 20,
  closeDate: "",
  owner: "Eswar",
};

export default function Deals({ deals, contacts, onAdd, onDelete }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(empty);
  const filtered = useMemo(
    () =>
      deals.filter((d) =>
        `${d.title} ${d.company} ${d.contact}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [deals, search],
  );
  const submit = (e) => {
    e.preventDefault();
    if (!form.title || !form.company || !form.value) return;
    onAdd({
      ...form,
      value: Number(form.value),
      probability: Number(form.probability),
    });
    setForm(empty);
    setModal(false);
  };
  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Deals"
        text={`${deals.length} opportunities across your sales cycle.`}
        button="Create deal"
        onClick={() => setModal(true)}
      />
      <div className="panel table-panel">
        <div className="toolbar">
          <label className="search-field">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search deals..."
            />
          </label>
          <button className="filter-button">
            <ChevronDown size={16} /> All stages
          </button>
        </div>
        {filtered.length ? (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Deal</th>
                  <th>Contact</th>
                  <th>Stage</th>
                  <th>Value</th>
                  <th>Probability</th>
                  <th>Close date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((deal) => (
                  <tr key={deal.id}>
                    <td>
                      <div className="deal-name">
                        <div className="company-logo">
                          <BriefcaseBusiness size={15} />
                        </div>
                        <div>
                          <strong>{deal.title}</strong>
                          <span>{deal.company}</span>
                        </div>
                      </div>
                    </td>
                    <td>{deal.contact}</td>
                    <td>
                      <span
                        className={`status-badge ${deal.stage.toLowerCase()}`}
                      >
                        {deal.stage}
                      </span>
                    </td>
                    <td>
                      <strong>{money(deal.value)}</strong>
                    </td>
                    <td>
                      <div className="probability">
                        <i style={{ width: `${deal.probability}%` }} />
                        <span>{deal.probability}%</span>
                      </div>
                    </td>
                    <td>{deal.closeDate}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="delete-action"
                          onClick={() => onDelete(deal.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button>
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No deals found" />
        )}
      </div>
      {modal && (
        <Modal title="Create deal" onClose={() => setModal(false)}>
          <form onSubmit={submit}>
            <div className="form-grid">
              <Small
                label="Deal name"
                value={form.title}
                set={(v) => setForm({ ...form, title: v })}
              />
              <Small
                label="Company"
                value={form.company}
                set={(v) => setForm({ ...form, company: v })}
              />
              <Small
                label="Contact"
                value={form.contact}
                set={(v) => setForm({ ...form, contact: v })}
              />
              <Small
                label="Value (₹)"
                type="number"
                value={form.value}
                set={(v) => setForm({ ...form, value: v })}
              />
              <label className="field">
                <span>Stage</span>
                <select
                  value={form.stage}
                  onChange={(e) => setForm({ ...form, stage: e.target.value })}
                >
                  {dealStages.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </label>
              <Small
                label="Close date"
                type="date"
                value={form.closeDate}
                set={(v) => setForm({ ...form, closeDate: v })}
              />
              <Small
                label="Probability %"
                type="number"
                value={form.probability}
                set={(v) => setForm({ ...form, probability: v })}
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
                <Plus size={16} /> Create deal
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
function Small({ label, value, set, type = "text" }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
      />
    </label>
  );
}
