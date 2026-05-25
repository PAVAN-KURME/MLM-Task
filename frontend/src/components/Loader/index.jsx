import "./index.css";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-wrapper">
      <div className="loader-spinner" />
      <span>{message}</span>
    </div>
  );
}
