import React, { useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  ContactRound,
  FileText,
  Gauge,
  KanbanSquare,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  Target,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import LeadForm from "./pages/LeadForm";
import LeadDetails from "./pages/LeadDetails";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Pipeline from "./pages/Pipeline";
import Activities from "./pages/Activities";
import Analytics from "./pages/Analytics";
import Toast from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";
import { initialContacts, initialDeals, initialLeads } from "./data";

export const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", path: "/leads", icon: Users },
  { label: "Contacts", path: "/contacts", icon: ContactRound },
  { label: "Deals", path: "/deals", icon: BriefcaseBusiness },
  { label: "Sales Pipeline", path: "/pipeline", icon: KanbanSquare },
  { label: "Activities", path: "/activities", icon: CalendarClock },
  { label: "Analytics", path: "/analytics", icon: BarChart3 },
];

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [leads, setLeads] = useState(initialLeads);
  const [contacts, setContacts] = useState(initialContacts);
  const [deals, setDeals] = useState(initialDeals);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ id: Date.now(), message, type });
  };

  const removeLead = (id) => {
    setLeads((items) => items.filter((item) => item.id !== id));
    setConfirm(null);
    showToast("Lead deleted successfully.");
  };

  const addLead = (lead) => {
    setLeads((items) => [{ ...lead, id: Date.now() }, ...items]);
    showToast("Lead added successfully.");
  };

  const updateLead = (lead) => {
    setLeads((items) =>
      items.map((item) => (item.id === lead.id ? lead : item)),
    );
    showToast("Lead updated successfully.");
  };

  const updateDealStage = (id, stage) => {
    setDeals((items) =>
      items.map((deal) => (deal.id === id ? { ...deal, stage } : deal)),
    );
    showToast(`Deal moved to ${stage}.`);
  };

  const addContact = (contact) => {
    setContacts((items) => [{ ...contact, id: Date.now() }, ...items]);
    showToast("Contact added successfully.");
  };

  const deleteContact = (id) => {
    setContacts((items) => items.filter((item) => item.id !== id));
    showToast("Contact deleted successfully.");
  };

  const addDeal = (deal) => {
    setDeals((items) => [{ ...deal, id: Date.now() }, ...items]);
    showToast("Deal created successfully.");
  };

  const deleteDeal = (id) => {
    setDeals((items) => items.filter((item) => item.id !== id));
    showToast("Deal deleted successfully.");
  };

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && (
        <button
          className="mobile-overlay"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}
      <main className="main-shell">
        <Topbar onMenu={() => setSidebarOpen(true)} />
        <div className="page-container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={<Dashboard leads={leads} deals={deals} />}
            />
            <Route
              path="/leads"
              element={
                <Leads
                  leads={leads}
                  onDelete={(id) =>
                    setConfirm({
                      title: "Delete lead?",
                      text: "This lead will be permanently removed.",
                      action: () => removeLead(id),
                    })
                  }
                />
              }
            />
            <Route path="/leads/add" element={<LeadForm onSave={addLead} />} />
            <Route
              path="/leads/:id/edit"
              element={<LeadForm leads={leads} onSave={updateLead} />}
            />
            <Route
              path="/leads/:id"
              element={
                <LeadDetails
                  leads={leads}
                  onDelete={(id) =>
                    setConfirm({
                      title: "Delete lead?",
                      text: "This lead will be permanently removed.",
                      action: () => removeLead(id),
                    })
                  }
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <Contacts
                  contacts={contacts}
                  onAdd={addContact}
                  onDelete={(id) =>
                    setConfirm({
                      title: "Delete contact?",
                      text: "This contact will be permanently removed.",
                      action: () => deleteContact(id),
                    })
                  }
                />
              }
            />
            <Route
              path="/deals"
              element={
                <Deals
                  deals={deals}
                  contacts={contacts}
                  onAdd={addDeal}
                  onDelete={(id) =>
                    setConfirm({
                      title: "Delete deal?",
                      text: "This deal will be permanently removed.",
                      action: () => deleteDeal(id),
                    })
                  }
                />
              }
            />
            <Route
              path="/pipeline"
              element={
                <Pipeline deals={deals} onStageChange={updateDealStage} />
              }
            />
            <Route path="/activities" element={<Activities leads={leads} />} />
            <Route
              path="/analytics"
              element={<Analytics leads={leads} deals={deals} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
      {toast && (
        <Toast key={toast.id} {...toast} onClose={() => setToast(null)} />
      )}
      {confirm && (
        <ConfirmModal {...confirm} onCancel={() => setConfirm(null)} />
      )}
    </div>
  );
}

export default App;
