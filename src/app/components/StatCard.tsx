import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'beige' | 'navy';
}

const colorMap = {
  primary:   { bg: "#FFFFFF", icon: "#1C3F3A", border: "#E0EAE8" },
  secondary: { bg: "#FFFFFF", icon: "#0A0C29", border: "#E0EAE8" },
  beige:     { bg: "#FFFFFF", icon: "#1C3F3A", border: "#E0EAE8" },
  navy:      { bg: "#1C3F3A", icon: "#FFFFFF", border: "#2A4D48" },
};

export default function StatCard({ title, value, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const c = colorMap[color];
  const isNavy = color === 'navy';

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className="p-6 rounded-2xl border hover:shadow-lg transition-shadow"
      style={{ background: c.bg, borderColor: c.border }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: c.icon + "20" }}
        >
          <Icon className="w-6 h-6" style={{ color: c.icon }} />
        </div>
        {trend && (
          <div
            className="px-2.5 py-1 rounded-full text-xs font-semibold"
            style={trend.isPositive
              ? { background: "#D1FAE5", color: "#065F46" }
              : { background: "#FEE2E2", color: "#991B1B" }
            }
          >
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </div>
        )}
      </div>
      <h3 className="text-sm mb-1" style={{ color: isNavy ? "rgba(255,255,255,0.6)" : "#6B7280" }}>{title}</h3>
      <p className="text-3xl font-bold" style={{ color: isNavy ? "#FFFFFF" : "#0A0C29" }}>{value}</p>
    </motion.div>
  );
}
