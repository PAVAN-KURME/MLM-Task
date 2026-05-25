import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login as loginRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./index.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginRequest(form);
      loginUser(data);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <div className="auth-card p-4 shadow-sm">
            <h1 className="mb-3">Welcome back</h1>
            <p className="text-muted mb-4">Login to manage your investments and referral income.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="your@domain.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="********"
                    required
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
            <p className="text-center text-muted mb-0">
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
