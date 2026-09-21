import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import EmptyState from "../components/EmptyState";
import { leadStages, money } from "../data";

const badgeClass = (stage) => `status-badge ${stage.toLowerCase()}`;

export default function Leads({ leads, onDelete }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("All");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const size = 6;

  const filtered = useMemo(() => {
    let data = leads.filter((lead) => {
      const term = search.toLowerCase();
      return (
        (!term ||
          `${lead.name} ${lead.company} ${lead.email}`
            .toLowerCase()
            .includes(term)) &&
        (stage === "All" || lead.stage === stage)
      );
    });
    if (sort === "value") data.sort((a, b) => b.value - a.value);
    if (sort === "name") data.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "newest") data.sort((a, b) => b.id - a.id);
    return data;
  }, [leads, search, stage, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const current = filtered.slice((page - 1) * size, page * size);

  return (
    <>
      <PageHeader
        eyebrow="CRM"
        title="Lead management"
        text={`${leads.length} leads in your workspace.`}
        button="Add lead"
        onClick={() => navigate("/leads/add")}
      />
      <div className="panel table-panel">
        <div className="toolbar">
          <label className="search-field">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search leads, companies..."
            />
          </label>
          <div className="toolbar-right">
            <select
              value={stage}
              onChange={(e) => {
                setStage(e.target.value);
                setPage(1);
              }}
            >
              <option>All</option>
              {leadStages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="value">Highest value</option>
              <option value="name">Name A–Z</option>
            </select>
            <button className="filter-button">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
        </div>
        {current.length ? (
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Company</th>
                  <th>Stage</th>
                  <th>Value</th>
                  <th>Follow-up</th>
                  <th>Owner</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {current.map((lead) => (
                  <tr key={lead.id}>
                    <td>
                      <div className="person-cell">
                        <div className="person-avatar">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </div>
                        <div>
                          <Link to={`/leads/${lead.id}`}>
                            <strong>{lead.name}</strong>
                          </Link>
                          <span>{lead.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{lead.company}</td>
                    <td>
                      <span className={badgeClass(lead.stage)}>
                        {lead.stage}
                      </span>
                    </td>
                    <td>
                      <strong>{money(lead.value)}</strong>
                    </td>
                    <td>{lead.followUp}</td>
                    <td>{lead.owner}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          title="View"
                          onClick={() => navigate(`/leads/${lead.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          title="Edit"
                          onClick={() => navigate(`/leads/${lead.id}/edit`)}
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          className="delete-action"
                          title="Delete"
                          onClick={() => onDelete(lead.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState title="No leads found" />
        )}
        <div className="pagination">
          <span>
            Showing {current.length ? (page - 1) * size + 1 : 0}–
            {Math.min(page * size, filtered.length)} of {filtered.length}
          </span>
          <div>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft size={16} />
            </button>
            <b>{page}</b>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
