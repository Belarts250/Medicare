import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Folder, TrendingUp, Hospital, Award } from "lucide-react";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import { Link } from "react-router";
import { motion } from "motion/react";

const CARD_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" };
const TITLE_COLOR = "#0A0C29";
const MUTED_COLOR = "#64748B";
const ROW_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8" };
const TOOLTIP_STYLE = { backgroundColor: "#FFFFFF", border: "1px solid #E0EAE8", borderRadius: "12px", color: "#0A0C29", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" };

export default function ResearcherDashboard() {
  const accuracyData = [
    { epoch: 1, accuracy: 65 },
    { epoch: 2, accuracy: 72 },
    { epoch: 3, accuracy: 78 },
    { epoch: 4, accuracy: 84 },
    { epoch: 5, accuracy: 88 },
    { epoch: 6, accuracy: 91 },
  ];

  const contributionData = [
    { hospital: "MGH", contributions: 145 },
    { hospital: "Mayo", contributions: 132 },
    { hospital: "Stanford", contributions: 118 },
    { hospital: "Johns Hopkins", contributions: 104 },
  ];

  const recentTasks = [
    { id: "4521", name: "Cardiac MRI Classification", status: "completed", accuracy: 94.2, hospitals: 12 },
    { id: "4522", name: "Tumor Detection Model", status: "training", accuracy: 87.5, hospitals: 8 },
    { id: "4523", name: "ECG Arrhythmia Detection", status: "pending", accuracy: 0, hospitals: 0 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: TITLE_COLOR }}>Research Dashboard</h1>
        <p className="text-sm" style={{ color: MUTED_COLOR }}>Monitor your federated learning projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Projects" value={12} icon={Folder} trend={{ value: "3 new", isPositive: true }} color="primary" />
        <StatCard title="Avg. Accuracy" value="89.3%" icon={TrendingUp} trend={{ value: "2.4%", isPositive: true }} color="secondary" />
        <StatCard title="Hospital Partners" value={34} icon={Hospital} trend={{ value: "5 new", isPositive: true }} color="beige" />
        <StatCard title="Total Contributions" value="12.4K" icon={Award} trend={{ value: "892", isPositive: true }} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
          <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Model Accuracy Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
              <XAxis dataKey="epoch" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Line type="monotone" dataKey="accuracy" stroke="#1C3F3A" strokeWidth={3} dot={{ fill: "#1C3F3A", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
          <h2 className="text-lg font-bold mb-4" style={{ color: TITLE_COLOR }}>Hospital Contributions</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={contributionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
              <XAxis dataKey="hospital" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={TOOLTIP_STYLE} />
              <Bar dataKey="contributions" fill="#1C3F3A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl" style={CARD_STYLE}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: TITLE_COLOR }}>Recent Training Tasks</h2>
          <Link to="/researcher/create-task" className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: "#1C3F3A" }}>
            Create New Task
          </Link>
        </div>
        <div className="space-y-3">
          {recentTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
              className="p-4 rounded-xl hover:shadow-sm transition-all"
              style={ROW_STYLE}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h3 className="font-semibold text-sm" style={{ color: TITLE_COLOR }}>{task.name}</h3>
                    <Badge variant={task.status === 'completed' ? 'success' : task.status === 'training' ? 'info' : 'warning'}>
                      {task.status}
                    </Badge>
                    {task.status === 'completed' && <Badge variant="verified">ZKP Verified</Badge>}
                  </div>
                  <div className="flex items-center gap-6 text-xs" style={{ color: MUTED_COLOR }}>
                    <span>Task #{task.id}</span>
                    {task.accuracy > 0 && <span>Accuracy: {task.accuracy}%</span>}
                    {task.hospitals > 0 && <span>{task.hospitals} hospitals</span>}
                  </div>
                </div>
                {task.status === 'training' && (
                  <Link to={`/researcher/training/${task.id}`} className="px-3 py-1.5 rounded-lg text-sm font-medium border hover:bg-secondary/50 transition-colors" style={{ color: "#1C3F3A", borderColor: "#C8DCD9" }}>
                    Monitor
                  </Link>
                )}
                {task.status === 'completed' && (
                  <Link to="/researcher/results" className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: "#D1FAE5", color: "#065F46" }}>
                    View Results
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
