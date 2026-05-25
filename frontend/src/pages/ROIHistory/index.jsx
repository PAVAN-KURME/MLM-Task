import { useEffect, useMemo, useState } from "react";
import { fetchDashboard } from "../../services/dashboardService";
import Loader from "../../components/Loader";
import { formatCurrency, formatDate } from "../../utils/format";
import "./index.css";

const ITEMS_PER_PAGE = 6;

export default function ROIHistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetchDashboard();
        setHistory(response.roiHistory || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  const pages = useMemo(() => Math.max(1, Math.ceil(history.length / ITEMS_PER_PAGE)), [history.length]);
  const pageItems = useMemo(() => history.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE), [history, page]);

  const handlePage = (nextPage) => {
    if (nextPage >= 1 && nextPage <= pages) {
      setPage(nextPage);
    }
  };

  if (loading) return <Loader message="Loading ROI history..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="roi-history-page">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h3>ROI History</h3>
          <p className="text-muted">Your return on investment records by date.</p>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle bg-white rounded-4 overflow-hidden">
          <thead>
            <tr>
              <th>Date</th>
              <th>Investment</th>
              <th>ROI Amount</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-5 text-muted">
                  No ROI records available yet.
                </td>
              </tr>
            ) : (
              pageItems.map((record) => (
                <tr key={record._id}>
                  <td>{formatDate(record.date)}</td>
                  <td>{record.investmentId}</td>
                  <td>{formatCurrency(record.roiAmount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {history.length > ITEMS_PER_PAGE && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-primary" onClick={() => handlePage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          <button className="btn btn-outline-primary" onClick={() => handlePage(page + 1)} disabled={page === pages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
