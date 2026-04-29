interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'verified';
  size?: 'sm' | 'md';
}

const variantStyles = {
  success:  { background: "#D1FAE5", color: "#065F46", border: "#6EE7B7" },
  warning:  { background: "#FEF3C7", color: "#92400E", border: "#FCD34D" },
  error:    { background: "#FEE2E2", color: "#991B1B", border: "#FCA5A5" },
  info:     { background: "#E0EAE8", color: "#1C3F3A", border: "#C8DCD9" },
  verified: { background: "#E0EAE8", color: "#1C3F3A", border: "#1C3F3A" },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export default function Badge({ children, variant = 'info', size = 'sm' }: BadgeProps) {
  const s = variantStyles[variant];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${sizeClasses[size]}`}
      style={{ background: s.background, color: s.color, borderColor: s.border }}
    >
      {variant === 'verified' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
      {children}
    </span>
  );
}
