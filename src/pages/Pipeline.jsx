import React, { useMemo, useState } from "react";
import { BriefcaseBusiness, GripVertical, Plus } from "lucide-react";
import { dealStages, money } from "../data";
import PageHeader from "../components/PageHeader";

export default function Pipeline({ deals, onStageChange }) {
  const [dragged, setDragged] = useState(null);
  const openValue = deals
    .filter((d) => !["Won", "Lost"].includes(d.stage))
    .reduce((s, d) => s + d.value, 0);
  return (
    <>
      <PageHeader
        eyebrow="Pipeline"
        title="Sales pipeline"
        text={`Drag and drop deals to update their stage. ${money(openValue)} in open opportunities.`}
      />
      <div className="kanban-wrap">
        <div className="kanban-board">
          {dealStages.map((stage) => {
            const items = deals.filter((d) => d.stage === stage);
            const total = items.reduce((s, d) => s + d.value, 0);
            return (
              <section
                className="kanban-column"
                key={stage}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => dragged && onStageChange(dragged, stage)}
              >
                <div className="kanban-head">
                  <div>
                    <span className={`stage-dot ${stage.toLowerCase()}`} />
                    <strong>{stage}</strong>
                    <b>{items.length}</b>
                  </div>
                  <span>{money(total)}</span>
                </div>
                <div className="kanban-cards">
                  {items.map((deal) => (
                    <article
                      draggable
                      key={deal.id}
                      onDragStart={() => setDragged(deal.id)}
                      onDragEnd={() => setDragged(null)}
                      className="deal-card"
                    >
                      <div className="deal-card-top">
                        <span>{deal.company}</span>
                        <GripVertical size={16} />
                      </div>
                      <h3>{deal.title}</h3>
                      <p>{deal.contact}</p>
                      <div className="deal-card-value">
                        <strong>{money(deal.value)}</strong>
                        <span>{deal.probability}%</span>
                      </div>
                      <div className="card-progress">
                        <i style={{ width: `${deal.probability}%` }} />
                      </div>
                      <footer>
                        <span className="mini-avatar">{deal.owner[0]}</span>
                        <small>Close {deal.closeDate}</small>
                      </footer>
                    </article>
                  ))}
                </div>
                <button className="kanban-add">
                  <Plus size={15} /> Add deal
                </button>
              </section>
            );
          })}
        </div>
      </div>
    </>
  );
}
