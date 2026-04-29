import { motion } from "motion/react";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'primary' | 'green' | 'navy' | 'orange';
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorMap = {
  primary: "#1C3F3A",
  green:   "#10B981",
  navy:    "#0A0C29",
  orange:  "#F59E0B",
};

// Tailwind classes for different sizes
const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export default function ProgressBar({
  value,
  max = 100,
  color = 'primary',
  showLabel = true,
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm" style={{ color: "#6B7280" }}>Progress</span>
          <span className="text-sm font-semibold" style={{ color: "#0A0C29" }}>{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${sizeClasses[size]}`} style={{ background: "#E0EAE8" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full`}
          style={{ background: colorMap[color] }}
        />
      </div>
    </div>
  );
}
