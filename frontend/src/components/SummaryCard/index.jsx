import "./index.css";

export default function SummaryCard({ title, value, icon, modifier }) {
  return (
    <div className={`summary-card ${modifier || ""}`}>
      <div className="summary-card-meta">
        <span className="summary-card-icon">{icon}</span>
        <div className="summary-card-content">
          <span className="summary-card-title">{title}</span>
          <h3>{value}</h3>
        </div>
      </div>
    </div>
  );
}
