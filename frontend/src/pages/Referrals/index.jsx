import { useEffect, useState } from "react";
import { fetchReferralTree } from "../../services/referralService";
import Loader from "../../components/Loader";
import ReferralNode from "../../components/ReferralNode";
import "./index.css";

export default function ReferralsPage() {
  const [tree, setTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReferralTree = async () => {
      try {
        const response = await fetchReferralTree();
        setTree(response.tree || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadReferralTree();
  }, []);

  if (loading) return <Loader message="Loading referral tree..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="referrals-page">
      <div className="mb-4">
        <h3>Referral Tree</h3>
        <p className="text-muted">Explore your downline hierarchy with nested referrals.</p>
      </div>
      {tree.length === 0 ? (
        <div className="alert alert-info">No referrals found yet.</div>
      ) : (
        <div className="referral-tree">
          {tree.map((node) => (
            <ReferralNode key={node._id} node={node} />
          ))}
        </div>
      )}
    </div>
  );
}
