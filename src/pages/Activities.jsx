import React, { useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Video,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import { activities } from "../data";

const icons = { call: Phone, mail: Mail, meeting: Video, note: MessageSquare };

export default function Activities({ leads }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [items, setItems] = useState(activities);
  const filtered = useMemo(
    () =>
      items.filter(
        (a) =>
          (filter === "All" || a.type === filter.toLowerCase()) &&
          `${a.title} ${a.text} ${a.person}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [items, filter, search],
  );
  const add = () =>
    setItems((prev) => [
      {
        id: Date.now(),
        type: "note",
        title: "New follow-up note",
        text: "Follow-up activity added from the CRM workspace.",
        person: leads[0]?.name || "Lead",
        date: "Just now",
      },
      ...prev,
    ]);
  return (
    <>
      <PageHeader
        eyebrow="Engagement"
        title="Activities"
        text="Track calls, emails, meetings and notes across your sales team."
        button="Add activity"
        onClick={add}
      />
      <div className="panel activity-panel">
        <div className="toolbar">
          <label className="search-field">
            <Search size={17} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activities..."
            />
          </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Call</option>
            <option>Mail</option>
            <option>Meeting</option>
            <option>Note</option>
          </select>
        </div>
        <div className="activity-feed">
          {filtered.map((item) => {
            const Icon = icons[item.type] || CalendarClock;
            return (
              <div className="feed-item" key={item.id}>
                <div className={`feed-icon ${item.type}`}>
                  <Icon size={18} />
                </div>
                <div className="feed-content">
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.date}</span>
                  </div>
                  <p>{item.text}</p>
                  <small>
                    <span className="mini-avatar">{item.person[0]}</span>
                    {item.person}
                  </small>
                </div>
                <CheckCircle2 size={17} className="done-icon" />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
