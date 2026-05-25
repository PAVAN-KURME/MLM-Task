import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerRequest } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import "./index.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", referralCode: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
    setSuccess("");
    setLoading(true);

    try {
      await registerRequest(form);
      setSuccess("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="auth-card p-4 shadow-sm">
            <h1 className="mb-3">Create your account</h1>
            <p className="text-muted mb-4">Register with your details and optional referral code.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="your@domain.com" required />
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
                    placeholder="Create a password"
                    required
                  />
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Referral Code (optional)</label>
                <input type="text" name="referralCode" value={form.referralCode} onChange={handleChange} className="form-control" placeholder="Friend's referral code" />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>
            <p className="text-center text-muted mb-0">
              Already registered? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
