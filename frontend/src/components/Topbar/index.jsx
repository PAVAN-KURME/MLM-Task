import { FiBell, FiSearch } from "react-icons/fi";
import "./index.css";

export default function Topbar({ pageTitle, onToggle }) {
  return (
    <div className="topbar shadow-sm">
      <div className="topbar-left d-flex align-items-center gap-3">
        <button type="button" className="btn btn-outline-secondary d-lg-none" onClick={onToggle}>
          ☰
        </button>
        <div>
          <h2>{pageTitle}</h2>
          <p className="text-muted mb-0">Welcome back — manage your investments and referrals.</p>
        </div>
      </div>
      <div className="topbar-actions d-flex align-items-center gap-3">
        <button type="button" className="btn btn-light btn-sm">
          <FiSearch />
        </button>
        <button type="button" className="btn btn-light btn-sm">
          <FiBell />
        </button>
      </div>
    </div>
  );
}
