import { CheckSquare, Activity, Coins, Shield } from "lucide-react";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { motion } from "motion/react";
import { Link } from "react-router";

const CARD_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" };
const TITLE_COLOR = "#0A0C29";
const MUTED_COLOR = "#64748B";
const ROW_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8" };
const TOOLTIP_STYLE = { backgroundColor: "#FFFFFF", border: "1px solid #E0EAE8", borderRadius: "12px", color: "#0A0C29", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" };

export default function HospitalDashboard() {
  const availableTasks = [
    { id: "4522", name: "Tumor Detection Model", reward: 120, minSamples: 5000, status: "new" },
    { id: "4524", name: "ECG Arrhythmia Detection", reward: 100, minSamples: 8000, status: "new" },
  ];

  const activeTasks = [
    { id: "4521", name: "Cardiac MRI Classification", progress: 85, reward: 150 },
    { id: "4520", name: "Lung CT Scan Analysis", progress: 45, reward: 130 },
  ];

  const earningsData = [
    { month: "Jan", earnings: 12400 },
    { month: "Feb", earnings: 15200 },
    { month: "Mar", earnings: 18900 },
    { month: "Apr", earnings: 22100 },
  ];

  const taskDistribution = [
    { name: "Completed", value: 45, color: "#1C3F3A" },
    { name: "In Progress", value: 8, color: "#E0EAE8" },
    { name: "Pending", value: 3, color: "#EBE8D8" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: TITLE_COLOR }}>Hospital Dashboard</h1>
        <p className="text-sm" style={{ color: MUTED_COLOR }}>Contribute to federated learning while maintaining data privacy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Available Tasks" value={availableTasks.length} icon={CheckSquare} trend={{ value: "2 new", isPositive: true }} color="primary" />
        <StatCard title="Active Training" value={activeTasks.length} icon={Activity} color="secondary" />
        <StatCard title="Total Earnings" value="68.7K" icon={Coins} trend={{ value: "12.4K", isPositive: true }} color="beige" />
        <StatCard title="Contribution Score" value="145" icon={Shield} trend={{ value: "23", isPositive: true }} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
          <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Monthly Earnings</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="earnings" fill="#1C3F3A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
          <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Task Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={taskDistribution} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} dataKey="value">
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={TOOLTIP_STYLE} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: TITLE_COLOR }}>Available Tasks</h2>
          <Link to="/hospital/tasks" className="text-sm font-semibold hover:underline" style={{ color: "#1C3F3A" }}>View All</Link>
        </div>
        <div className="space-y-3">
          {availableTasks.map((task, idx) => (
            <motion.div key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.1 }} className="p-4 rounded-xl hover:shadow-sm transition-all" style={ROW_STYLE}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-sm" style={{ color: TITLE_COLOR }}>{task.name}</h3>
                    <Badge variant="info">New</Badge>
                  </div>
                  <div className="flex items-center gap-6 text-xs" style={{ color: MUTED_COLOR }}>
                    <span>Task #{task.id}</span>
                    <span>Reward: {task.reward} tokens/epoch</span>
                    <span>Min. samples: {task.minSamples.toLocaleString()}</span>
                  </div>
                </div>
                <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: "#1C3F3A" }}>
                  Accept Task
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
        <h2 className="text-lg font-bold mb-6" style={{ color: TITLE_COLOR }}>Active Training</h2>
        <div className="space-y-4">
          {activeTasks.map((task) => (
            <div key={task.id} className="p-4 rounded-xl" style={ROW_STYLE}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-sm mb-0.5" style={{ color: TITLE_COLOR }}>{task.name}</h3>
                  <p className="text-xs" style={{ color: MUTED_COLOR }}>Task #{task.id} • Reward: {task.reward} tokens/epoch</p>
                </div>
                <Badge variant="info">Training</Badge>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs" style={{ color: MUTED_COLOR }}>Progress</span>
                    <span className="text-xs font-semibold" style={{ color: TITLE_COLOR }}>{task.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#E0EAE8" }}>
                    <div className="h-full rounded-full" style={{ width: `${task.progress}%`, background: "#1C3F3A" }} />
                  </div>
                </div>
                <Link to={`/hospital/training/${task.id}`} className="px-3 py-1.5 rounded-lg text-sm font-medium border hover:bg-secondary/50 transition-colors" style={{ color: "#1C3F3A", borderColor: "#C8DCD9" }}>
                  Monitor
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
