import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import DashboardPage from "./pages/Dashboard";
import InvestmentsPage from "./pages/Investments";
import ROIHistoryPage from "./pages/ROIHistory";
import LevelIncomePage from "./pages/LevelIncome";
import ReferralsPage from "./pages/Referrals";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="investments" element={<InvestmentsPage />} />
              <Route path="roi-history" element={<ROIHistoryPage />} />
              <Route path="level-income" element={<LevelIncomePage />} />
              <Route path="referrals" element={<ReferralsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
