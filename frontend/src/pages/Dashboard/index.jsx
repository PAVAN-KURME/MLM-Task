import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { FaWallet, FaCoins, FaUsers, FaChartLine } from "react-icons/fa";
import { fetchDashboard } from "../../services/dashboardService";
import SummaryCard from "../../components/SummaryCard";
import Loader from "../../components/Loader";
import { formatCurrency, formatDate } from "../../utils/format";
import "./index.css";

// Updated chart colors to use brand palette
const chartColors = [
  "#7b1e2d",  // brand-maroon
  "#b23a48",  // brand-accent
  "#f59e0b",  // warning
  "#10b981",  // success
  "#ef4444"   // danger
];

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await fetchDashboard();
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const investmentDistribution = useMemo(() => {
    const summary = {};
    data?.investments?.forEach((item) => {
      summary[item.plan] = (summary[item.plan] || 0) + item.amount;
    });
    return Object.entries(summary).map(([name, value]) => ({ name, value }));
  }, [data]);

  const roiGrowth = useMemo(() => {
    const grouped = {};
    data?.roiHistory?.forEach((item) => {
      const key = formatDate(item.date);
      grouped[key] = (grouped[key] || 0) + item.roiAmount;
    });
    return Object.entries(grouped)
      .map(([date, amount]) => ({ date, amount }))
      .slice(-8);
  }, [data]);

  const monthlyIncome = useMemo(() => {
    const grouped = {};
    data?.levelIncome?.forEach((item) => {
      const month = new Date(item.date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
      grouped[month] = (grouped[month] || 0) + item.amount;
    });
    return Object.entries(grouped)
      .map(([month, amount]) => ({ month, amount }))
      .slice(-6);
  }, [data]);

  if (loading) return <Loader message="Loading dashboard data..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="dashboard-page">
      <div className="row g-4">
        <div className="col-md-6 col-xl-3">
          <SummaryCard title="Total Investments" value={formatCurrency(data.totalInvestment)} icon={<FaChartLine />} modifier="investment" />
        </div>
        <div className="col-md-6 col-xl-3">
          <SummaryCard title="Wallet Balance" value={formatCurrency(data.walletBalance)} icon={<FaWallet />} modifier="wallet" />
        </div>
        <div className="col-md-6 col-xl-3">
          <SummaryCard title="Total ROI" value={formatCurrency(data.totalROI)} icon={<FaCoins />} modifier="roi" />
        </div>
        <div className="col-md-6 col-xl-3">
          <SummaryCard title="Level Income" value={formatCurrency(data.totalLevelIncome)} icon={<FaUsers />} modifier="level" />
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-lg-6">
          <div className="card chart-card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>ROI Growth</h5>
              <span className="text-muted">Latest trend</span>
            </div>
            <div className="card-body chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiGrowth} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => `${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Line type="monotone" dataKey="amount" stroke="#7b1e2d" strokeWidth={3} dot={{ r: 5, fill: "#b23a48" }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card chart-card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Investment Distribution</h5>
              <span className="text-muted">By plan amount</span>
            </div>
            <div className="card-body chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={investmentDistribution} dataKey="value" nameKey="name" outerRadius={110} innerRadius={55} paddingAngle={4}>
                    {investmentDistribution.map((entry, index) => (
                      <Cell key={entry.name} fill={chartColors[index % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-12">
          <div className="card chart-card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Monthly Referral Income</h5>
              <span className="text-muted">Level income by month</span>
            </div>
            <div className="card-body chart-container">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={monthlyIncome} margin={{ top: 10, right: 15, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tickFormatter={(value) => value} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#b23a48" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
