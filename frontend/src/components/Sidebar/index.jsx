import { NavLink } from "react-router-dom";
import { AiOutlineDashboard, AiOutlineLineChart, AiOutlineTeam } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";
import { FiLogOut, FiPieChart } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi";
import "./index.css";

const menu = [
  { label: "Dashboard", to: "/", icon: <AiOutlineDashboard /> },
  { label: "Investments", to: "/investments", icon: <FaHandshake /> },
  { label: "ROI History", to: "/roi-history", icon: <FiPieChart /> },
  { label: "Level Income", to: "/level-income", icon: <HiOutlineSparkles /> },
  { label: "Referral Tree", to: "/referrals", icon: <AiOutlineTeam /> },
];

export default function Sidebar({ onLogout, user, open, onToggle }) {
  return (
    <aside className={`sidebar ${open ? "open" : ""}`}>
      <div className="sidebar-top d-flex align-items-center justify-content-between">
        <div>
          <div className="brand">MLM Invest</div>
          <div className="brand-tag">Partner growth</div>
        </div>
        <button type="button" className="btn btn-link sidebar-toggle" onClick={onToggle}>
          <span className="visually-hidden">Toggle sidebar</span>
          ☰
        </button>
      </div>

      <div className="sidebar-profile">
        <div className="avatar">{user?.name?.charAt(0) || "U"}</div>
        <div>
          <div className="profile-name">{user?.name || "User"}</div>
          <div className="profile-email">{user?.email || "example@mail.com"}</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menu.map((item) => (
          <NavLink key={item.to} to={item.to} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button type="button" className="btn btn-outline-light w-100" onClick={onLogout}>
          <FiLogOut className="me-2" /> Logout
        </button>
      </div>
    </aside>
  );
}
