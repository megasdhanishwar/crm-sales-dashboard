import React from "react";
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { CircleDollarSign, Target, TrendingUp, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import { money, revenueData, sourceData } from "../data";

export default function Analytics({ leads, deals }) {
  const won = deals.filter((d) => d.stage === "Won");
  const total = deals.reduce((s, d) => s + d.value, 0);
  const avg = Math.round(total / Math.max(deals.length, 1));
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Sales analytics"
        text="A clear view of revenue, conversion and lead acquisition performance."
      />
      <div className="stats-grid analytics-stats">
        <StatCard
          icon={<CircleDollarSign size={21} />}
          label="Won revenue"
          value={money(won.reduce((s, d) => s + d.value, 0) + 102000)}
          change="+18.4% growth"
          tone="green"
        />
        <StatCard
          icon={<Target size={21} />}
          label="Avg. deal size"
          value={money(avg)}
          change="+9.1% this month"
          tone="blue"
        />
        <StatCard
          icon={<TrendingUp size={21} />}
          label="Conversion rate"
          value="68.4%"
          change="+4.6% improvement"
          tone="purple"
        />
        <StatCard
          icon={<Users size={21} />}
          label="Lead-to-deal"
          value="42.7%"
          change="+7.2% conversion"
          tone="orange"
        />
      </div>
      <div className="analytics-grid">
        <div className="panel chart-panel">
          <div className="panel-heading">
            <div>
              <h3>Revenue trend</h3>
              <p>Actual revenue across the last six months</p>
            </div>
          </div>
          <div className="chart-wrap large">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
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
                <Tooltip formatter={(v) => money(v)} />
                <Bar dataKey="revenue" radius={[6, 6, 0, 0]} />
                <Bar dataKey="target" radius={[6, 6, 0, 0]} opacity={0.28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="panel">
          <div className="panel-heading">
            <div>
              <h3>Lead sources</h3>
              <p>Where your leads come from</p>
            </div>
          </div>
          <div className="pie-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {sourceData.map((_, i) => (
                    <Cell key={i} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-center">
              <strong>{leads.length}</strong>
              <span>Total leads</span>
            </div>
          </div>
          <div className="legend">
            {sourceData.map((item, i) => (
              <div key={item.name}>
                <span className={`legend-dot l${i}`} />
                <span>{item.name}</span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
