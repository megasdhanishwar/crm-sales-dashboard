import React, { useMemo } from "react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CircleDollarSign,
  Target,
  TrendingUp,
  Users,
  CalendarClock,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { activities, revenueData, money } from "../data";

export default function Dashboard({ leads, deals }) {
  const revenue = deals
    .filter((d) => d.stage === "Won")
    .reduce((sum, d) => sum + d.value, 0);
  const pipeline = deals
    .filter((d) => !["Won", "Lost"].includes(d.stage))
    .reduce((sum, d) => sum + d.value, 0);
  const weighted = deals
    .filter((d) => !["Won", "Lost"].includes(d.stage))
    .reduce((sum, d) => sum + (d.value * d.probability) / 100, 0);
  const qualified = leads.filter((l) =>
    ["Qualified", "Proposal", "Won"].includes(l.stage),
  ).length;

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Welcome Back,"
        text="Here’s what’s happening with your sales pipeline today."
      />
      <section className="stats-grid">
        <StatCard
          icon={<CircleDollarSign size={21} />}
          label="Total revenue"
          value={money(revenue + 102000)}
          change="+18.4% vs last month"
          tone="green"
        />
        <StatCard
          icon={<BriefcaseBusiness size={21} />}
          label="Open pipeline"
          value={money(pipeline)}
          change="+12.8% pipeline growth"
          tone="blue"
        />
        <StatCard
          icon={<Users size={21} />}
          label="Active leads"
          value={leads.filter((l) => l.stage !== "Lost").length}
          change="+8.2% new leads"
          tone="purple"
        />
        <StatCard
          icon={<Target size={21} />}
          label="Win rate"
          value="68.4%"
          change="+4.6% conversion"
          tone="orange"
        />
      </section>

      <section className="dashboard-grid">
        <div className="panel chart-panel revenue-panel">
          <div className="panel-heading">
            <div>
              <h3>Revenue performance</h3>
              <p>Monthly revenue against target</p>
            </div>
            <button className="select-button">
              Last 6 months <span>⌄</span>
            </button>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopOpacity=".22" />
                    <stop offset="100%" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e7ecea"
                />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v / 1000}k`}
                />
                <Tooltip formatter={(value) => money(value)} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#25b88a"
                  strokeWidth={3}
                  fill="url(#revenueFill)"
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#a8b5b1"
                  strokeDasharray="5 5"
                  fill="none"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel pipeline-summary">
          <div className="panel-heading">
            <div>
              <h3>Pipeline health</h3>
              <p>Current opportunity value</p>
            </div>
            <button className="icon-button">
              <ArrowUpRight size={18} />
            </button>
          </div>
          <div className="pipeline-total">
            {money(pipeline)}
            <span>Open value</span>
          </div>
          <div className="progress-row">
            <span>Weighted pipeline</span>
            <strong>{money(weighted)}</strong>
          </div>
          <div className="progress-track">
            <i
              style={{
                width: `${Math.min(100, pipeline ? (weighted / pipeline) * 100 : 0)}%`,
              }}
            />
          </div>
          <div className="mini-metrics">
            <div>
              <span>Qualified</span>
              <strong>{qualified}</strong>
            </div>
            <div>
              <span>Avg. deal</span>
              <strong>
                {money(
                  Math.round((pipeline || 1) / Math.max(deals.length - 1, 1)),
                )}
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid bottom-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Recent activity</h3>
              <p>Your latest sales interactions</p>
            </div>
            <a className="text-link" href="/activities">
              View all
            </a>
          </div>
          <div className="activity-list">
            {activities.map((item) => (
              <div className="activity-item" key={item.id}>
                <div className={`activity-dot ${item.type}`}>
                  <CalendarClock size={15} />
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                  <small>
                    {item.person} · {item.date}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Top opportunities</h3>
              <p>Highest-value open deals</p>
            </div>
          </div>
          <div className="opportunity-list">
            {[...deals]
              .filter((d) => !["Won", "Lost"].includes(d.stage))
              .sort((a, b) => b.value - a.value)
              .slice(0, 4)
              .map((deal) => (
                <div className="opportunity" key={deal.id}>
                  <div className="company-logo">{deal.company.slice(0, 1)}</div>
                  <div className="opportunity-main">
                    <strong>{deal.title}</strong>
                    <span>{deal.company}</span>
                  </div>
                  <div className="opportunity-value">
                    <strong>{money(deal.value)}</strong>
                    <span>{deal.probability}% likely</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
