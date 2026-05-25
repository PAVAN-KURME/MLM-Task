import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { fetchInvestments, createInvestment } from "../../services/investmentService";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import { formatCurrency, formatDate } from "../../utils/format";
import "./index.css";

const plans = ["Basic", "Silver", "Gold", "Platinum"];

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ amount: "", plan: "Basic", duration: "30" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({ plan: "All", status: "All", search: "" });

  const loadInvestments = async () => {
    setLoading(true);
    try {
      const response = await fetchInvestments();
      setInvestments(response.investments || response || []);
    } catch (err) {
      setError(err.message || "Failed to load investments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await createInvestment({
        amount: Number(form.amount),
        plan: form.plan,
        duration: Number(form.duration),
      });
      setModalOpen(false);
      setForm({ amount: "", plan: "Basic", duration: "30" });
      setSuccess("Investment created");
      loadInvestments();
    } catch (err) {
      setError(err.message || "Failed to create investment");
    } finally {
      setSaving(false);
    }
  };

  const filteredInvestments = investments.filter((investment) => {
    const planMatch = filters.plan === "All" || investment.plan === filters.plan;
    const statusMatch = filters.status === "All" || investment.status === filters.status;
    const search = filters.search.trim().toLowerCase();
    const searchMatch =
      search === "" ||
      (investment.plan && investment.plan.toLowerCase().includes(search)) ||
      String(investment.amount).includes(search);
    return planMatch && statusMatch && searchMatch;
  });

  return (
    <div className="investments-page">
      <div className="d-flex align-items-center justify-content-between mb-4 gap-3">
        <div>
          <h3>Investments</h3>
          <p className="text-muted">Review active plans and start new investments.</p>
        </div>
        <Button variant="primary" icon={FaPlus} onClick={() => setModalOpen(true)}>
          New Investment
        </Button>
      </div>

      <div className="filters-row d-flex gap-2 mb-3 flex-wrap">
        <div className="d-flex gap-2 align-items-center">
          <label className="mb-0 text-muted me-2">Plan</label>
          <select className="form-select" value={filters.plan} onChange={(e) => setFilters({ ...filters, plan: e.target.value })}>
            <option>All</option>
            {plans.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2 align-items-center">
          <label className="mb-0 text-muted me-2">Status</label>
          <select className="form-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            <option>All</option>
            <option value="active">active</option>
            <option value="completed">completed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="flex-grow-1 d-flex align-items-center">
          <input className="form-control" placeholder="Search by plan, amount" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        </div>
      </div>

      {loading ? (
        <Loader message="Loading investments..." />
      ) : (
        <div className="table-responsive investments-table">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Plan</th>
                <th>Daily ROI</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvestments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5 text-muted">
                    No investments found.
                  </td>
                </tr>
              ) : (
                filteredInvestments.map((investment) => (
                  <tr key={investment._id}>
                    <td>{formatCurrency(investment.amount)}</td>
                    <td>{investment.plan}</td>
                    <td>{investment.dailyROI}%</td>
                    <td>{formatDate(investment.startDate)}</td>
                    <td>{formatDate(investment.endDate)}</td>
                    <td>
                      <span className={`badge ${investment.status === "active" ? "bg-success" : investment.status === "completed" ? "bg-secondary" : "bg-danger"}`}>
                        {investment.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="modal-backdrop d-flex align-items-center justify-content-center">
          <div className="investment-modal p-4 shadow-lg rounded-4 bg-white">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Create Investment</h5>
              <button type="button" className="btn-close" onClick={() => setModalOpen(false)} aria-label="Close" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Amount</label>
                <input type="number" step="100" min="100" name="amount" value={form.amount} onChange={handleChange} className="form-control" placeholder="5000" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Plan</label>
                <select name="plan" value={form.plan} onChange={handleChange} className="form-select">
                  {plans.map((plan) => (
                    <option key={plan} value={plan}>
                      {plan}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Duration (days)</label>
                <input type="number" min="7" name="duration" value={form.duration} onChange={handleChange} className="form-control" placeholder="30" required />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="d-flex gap-2">
                <Button type="submit" variant="primary" fullWidth disabled={saving} loading={saving}>
                  {saving ? "Creating..." : "Create"}
                </Button>
                <Button type="button" variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
