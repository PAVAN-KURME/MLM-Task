import { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import "./index.css";

export default function ReferralNode({ node }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="referral-node">
      <div className="referral-node-header" onClick={() => setOpen((prev) => !prev)}>
        {node.referrals?.length > 0 ? (
          <span className="referral-node-toggle">
            {open ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
          </span>
        ) : (
          <span className="referral-node-spacer" />
        )}
        <div>
          <strong>{node.name}</strong>
          <div className="referral-node-subtitle">{node.email}</div>
        </div>
      </div>

      {open && node.referrals?.length > 0 && (
        <div className="referral-node-children">
          {node.referrals.map((child) => (
            <ReferralNode key={child._id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
