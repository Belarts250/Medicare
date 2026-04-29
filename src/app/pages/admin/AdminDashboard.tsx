import { Network, Activity, ShieldCheck, AlertTriangle } from "lucide-react";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

const CARD_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" };
const TITLE_COLOR = "#0A0C29";
const MUTED_COLOR = "#64748B";
const ROW_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8" };
const TOOLTIP_STYLE = { backgroundColor: "#FFFFFF", border: "1px solid #E0EAE8", borderRadius: "12px", color: "#0A0C29", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" };

export default function AdminDashboard() {
  const networkData = [
    { time: "00:00", nodes: 42, throughput: 850 },
    { time: "04:00", nodes: 38, throughput: 720 },
    { time: "08:00", nodes: 45, throughput: 920 },
    { time: "12:00", nodes: 52, throughput: 1150 },
    { time: "16:00", nodes: 48, throughput: 1020 },
    { time: "20:00", nodes: 44, throughput: 890 },
  ];

  const activeNodes = [
    { id: 1, name: "Massachusetts General", status: "active", uptime: 99.8, tasks: 12, lastSeen: "1m ago" },
    { id: 2, name: "Mayo Clinic", status: "active", uptime: 98.5, tasks: 10, lastSeen: "2m ago" },
    { id: 3, name: "Stanford Medical", status: "active", uptime: 97.2, tasks: 8, lastSeen: "1m ago" },
    { id: 4, name: "Johns Hopkins", status: "warning", uptime: 92.3, tasks: 5, lastSeen: "15m ago" },
    { id: 5, name: "Cleveland Clinic", status: "active", uptime: 96.8, tasks: 7, lastSeen: "3m ago" },
  ];

  const recentAlerts = [
    { id: 1, type: "warning", message: "High network latency detected on node JH-04", time: "5m ago" },
    { id: 2, type: "info", message: "New hospital node joined: Cedar-Sinai Medical", time: "1h ago" },
    { id: 3, type: "success", message: "Network consensus reached for task #4521", time: "2h ago" },
  ];

  const alertBg: Record<string, string> = {
    warning: "#FEF3C7",
    info: "#E0EAE8",
    success: "#D1FAE5",
  };
  const alertBorder: Record<string, string> = {
    warning: "#FCD34D",
    info: "#C8DCD9",
    success: "#6EE7B7",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: TITLE_COLOR }}>Network Monitoring</h1>
        <p className="text-sm" style={{ color: MUTED_COLOR }}>System health and network overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Nodes" value={48} icon={Network} trend={{ value: "+3", isPositive: true }} color="primary" />
        <StatCard title="Network Health" value="98.7%" icon={Activity} trend={{ value: "+1.2%", isPositive: true }} color="secondary" />
        <StatCard title="ZKP Verifications" value="1.2K" icon={ShieldCheck} trend={{ value: "145 today", isPositive: true }} color="beige" />
        <StatCard title="Active Alerts" value={3} icon={AlertTriangle} color="navy" />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
        <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Network Activity (24h)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={networkData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
            <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis yAxisId="left" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line yAxisId="left" type="monotone" dataKey="nodes" stroke="#1C3F3A" strokeWidth={3} name="Active Nodes" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#0A0C29" strokeWidth={2} strokeDasharray="5 5" name="Throughput (MB/s)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
        <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Active Network Nodes</h2>
        <div className="space-y-3">
          {activeNodes.map((node, idx) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
              className="p-4 rounded-xl hover:shadow-sm transition-all"
              style={ROW_STYLE}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${node.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-orange-400'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-sm" style={{ color: TITLE_COLOR }}>{node.name}</h3>
                      <Badge variant={node.status === 'active' ? 'success' : 'warning'}>{node.status}</Badge>
                    </div>
                    <div className="flex items-center gap-6 text-xs" style={{ color: MUTED_COLOR }}>
                      <span>Uptime: {node.uptime}%</span>
                      <span>Active tasks: {node.tasks}</span>
                      <span>Last seen: {node.lastSeen}</span>
                    </div>
                  </div>
                </div>
                <div className="w-24 h-2 rounded-full overflow-hidden ml-4" style={{ background: "#E0EAE8" }}>
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${node.uptime}%`, background: node.uptime > 95 ? "#1C3F3A" : "#F59E0B" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
        <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Recent Alerts</h2>
        <div className="space-y-3">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="p-4 rounded-xl border" style={{ background: alertBg[alert.type], borderColor: alertBorder[alert.type] }}>
              <div className="flex items-start gap-3">
                <Badge variant={alert.type === 'warning' ? 'warning' : alert.type === 'success' ? 'success' : 'info'}>{alert.type}</Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: TITLE_COLOR }}>{alert.message}</p>
                  <span className="text-xs" style={{ color: MUTED_COLOR }}>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Blockchain Height", value: "1,245,892" },
          { label: "Total Transactions", value: "3.2M" },
          { label: "Avg. Block Time", value: "2.3s" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.1 }}
            className="p-6 rounded-2xl"
            style={CARD_STYLE}
          >
            <p className="text-sm mb-2" style={{ color: MUTED_COLOR }}>{stat.label}</p>
            <p className="text-3xl font-bold" style={{ color: TITLE_COLOR }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
