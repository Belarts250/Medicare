import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard, PlusCircle, Activity, BarChart3, FileText,
  ChevronLeft, ChevronRight, Hospital, CheckSquare, Cpu, Shield,
  Coins, Network, ShieldCheck, Vote, Brain, LogOut
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  role: 'researcher' | 'hospital' | 'admin';
}

const navItems: Record<string, NavItem[]> = {
  researcher: [
    { path: "/researcher", label: "Dashboard", icon: LayoutDashboard },
    { path: "/researcher/create-task", label: "Create Task", icon: PlusCircle },
    { path: "/researcher/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/researcher/results", label: "Results", icon: FileText },
  ],
  hospital: [
    { path: "/hospital", label: "Dashboard", icon: LayoutDashboard },
    { path: "/hospital/tasks", label: "Available Tasks", icon: CheckSquare },
    { path: "/hospital/training", label: "Training", icon: Cpu },
    { path: "/hospital/train-ai", label: "Train AI Model", icon: Brain },
    { path: "/hospital/privacy", label: "Privacy Control", icon: Shield },
    { path: "/hospital/rewards", label: "Rewards", icon: Coins },
  ],
  admin: [
    { path: "/admin", label: "Monitoring", icon: Network },
    { path: "/admin/verification", label: "Verification", icon: ShieldCheck },
    { path: "/admin/governance", label: "Governance", icon: Vote },
  ],
};

export default function Sidebar({ role }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const items = navItems[role] || [];

  return (
    <motion.div
      initial={{ width: collapsed ? 72 : 260 }}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen flex flex-col relative flex-shrink-0 shadow-xl border-r z-50"
      style={{ background: "#1C3F3A", borderColor: "rgba(255,255,255,0.1)" }}
    >
      {/* Logo */}
      <div className="p-5 border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <h1 className="font-bold text-base leading-tight text-white">MEDICARE</h1>
              <p className="text-[10px] leading-tight text-white/60">Federated AI Network</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? "text-white" : "group-hover:text-white"}`} />
              {!collapsed && (
                <span className={`text-sm font-medium truncate ${isActive ? "font-bold" : ""}`}>{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[74px] w-6 h-6 rounded-full bg-[#1C3F3A] border flex items-center justify-center hover:bg-[#2A4D48] transition-colors z-20 shadow-lg"
        style={{ color: "#FFFFFF", borderColor: "rgba(255,255,255,0.2)" }}
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Footer */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {!collapsed && (
          <div className="px-3 py-2 rounded-xl mb-2 bg-white/5 border border-white/10">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] text-white/50">Network Status</span>
            </div>
            <p className="text-xs font-medium text-white">All Systems Operational</p>
          </div>
        )}
        <button
          onClick={() => navigate("/login")}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors hover:bg-white/5 ${collapsed ? "justify-center" : ""}`}
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </motion.div>
  );
}