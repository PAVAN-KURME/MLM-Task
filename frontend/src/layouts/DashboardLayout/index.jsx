import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { useAuth } from "../../context/AuthContext";
import "./index.css";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const pageTitle = pathname === "/" ? "Dashboard" : pathname.replace("/", "").replace("-", " ");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();

  return (
    <div className="dashboard-shell">
      <Sidebar onLogout={logout} user={user} open={sidebarOpen} onToggle={() => setSidebarOpen((prev) => !prev)} />
      <main className="dashboard-main">
        <Topbar pageTitle={pageTitle} onToggle={() => setSidebarOpen(true)} />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
