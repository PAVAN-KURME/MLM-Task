import { useEffect, useState } from "react";
import { fetchDashboard } from "../../services/dashboardService";
import Loader from "../../components/Loader";
import { formatCurrency, formatDate } from "../../utils/format";
import "./index.css";

export default function LevelIncomePage() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadIncome = async () => {
      try {
        const response = await fetchDashboard();
        setRecords(response.levelIncome || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadIncome();
  }, []);

  if (loading) return <Loader message="Loading level income records..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="level-income-page">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3>Level Income</h3>
          <p className="text-muted">Track referral commissions earned across levels.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded-4 overflow-hidden">
          <thead>
            <tr>
              <th>From User</th>
              <th>Level</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">
                  No referral income earned yet.
                </td>
              </tr>
            ) : (
              records.map((record) => (
                <tr key={record._id}>
                  <td>{record.fromUser}</td>
                  <td>{record.level}</td>
                  <td>{formatCurrency(record.amount)}</td>
                  <td>{formatDate(record.date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
