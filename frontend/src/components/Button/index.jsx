import "./index.css";

/**
 * Reusable Button component with brand variants and sizes
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - stretches button to full width
 * @param {boolean} disabled - disabled state
 * @param {function} onClick - click handler
 * @param {React.ReactNode} children - button content
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon: Icon,
  children,
  ...props
}) {
  const classes = [
    "btn-custom",
    `btn-${variant}`,
    `btn-size-${size}`,
    fullWidth && "btn-full",
    disabled && "btn-disabled",
    loading && "btn-loading",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      <span className="btn-content">
        {Icon && <Icon className="btn-icon" />}
        {children}
      </span>
      {loading && <span className="btn-spinner" />}
    </button>
  );
}
