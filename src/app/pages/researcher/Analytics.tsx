import DataTable from "../../components/DataTable";
import Badge from "../../components/Badge";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, Award, Clock } from "lucide-react";
import { motion } from "motion/react";

export default function Analytics() {
  const hospitalData = [
    { hospital: "Massachusetts General", contributions: 145, accuracy: 94.2, uptime: 99.8, rewards: 14500 },
    { hospital: "Mayo Clinic", contributions: 132, accuracy: 92.8, uptime: 98.5, rewards: 13200 },
    { hospital: "Stanford Medical", contributions: 118, accuracy: 91.5, uptime: 97.2, rewards: 11800 },
    { hospital: "Johns Hopkins", contributions: 104, accuracy: 90.1, uptime: 96.8, rewards: 10400 },
    { hospital: "Cleveland Clinic", contributions: 98, accuracy: 89.7, uptime: 95.5, rewards: 9800 },
  ];

  const performanceData = [
    { month: "Jan", tasks: 8, accuracy: 87.5 },
    { month: "Feb", tasks: 12, accuracy: 89.2 },
    { month: "Mar", tasks: 15, accuracy: 91.8 },
    { month: "Apr", tasks: 18, accuracy: 93.4 },
  ];

  const taskDistribution = [
    { name: "Classification", value: 45, color: "#1C3F3A" },
    { name: "Detection", value: 30, color: "#0A0C29" },
    { name: "Segmentation", value: 15, color: "#E0EAE8" },
    { name: "Prediction", value: 10, color: "#EBE8D8" },
  ];

  const columns = [
    { key: "hospital", label: "Hospital", sortable: true },
    { key: "contributions", label: "Contributions", sortable: true },
    {
      key: "accuracy",
      label: "Avg. Accuracy",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium" style={{ color: "#1C3F3A" }}>{value}%</span>
      ),
    },
    {
      key: "uptime",
      label: "Uptime",
      sortable: true,
      render: (value: number) => (
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full overflow-hidden" style={{ background: "#E0EAE8" }}>
            <div className="h-full rounded-full" style={{ width: `${value}%`, background: "#1C3F3A" }} />
          </div>
          <span className="text-sm" style={{ color: "#6B7280" }}>{value}%</span>
        </div>
      ),
    },
    {
      key: "rewards",
      label: "Total Rewards",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium" style={{ color: "#0A0C29" }}>{value.toLocaleString()} tokens</span>
      ),
    },
    {
      key: "hospital",
      label: "Status",
      render: () => <Badge variant="verified">Verified</Badge>,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: "#0A0C29" }}>Analytics</h1>
        <p className="text-sm" style={{ color: "#6B7280" }}>Comprehensive performance metrics and insights</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Tasks", value: "53", icon: Award, trend: "+12 this month" },
          { label: "Avg. Performance", value: "91.2%", icon: TrendingUp, trend: "+3.4% increase" },
          { label: "Active Time", value: "847h", icon: Clock, trend: "Last 30 days" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl border shadow-sm"
            style={{ background: "#FFFFFF", borderColor: "#E0EAE8" }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#1C3F3A]/10">
              <stat.icon className="w-6 h-6" style={{ color: "#1C3F3A" }} />
            </div>
            <p className="text-sm mb-1" style={{ color: "#64748B" }}>{stat.label}</p>
            <p className="text-3xl font-bold mb-2" style={{ color: "#0A0C29" }}>{stat.value}</p>
            <p className="text-xs font-semibold" style={{ color: "#1C3F3A" }}>{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl shadow-sm"
          style={{ background: "#FFFFFF", border: "1px solid #E0EAE8" }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: "#0A0C29" }}>Performance Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0EAE8', borderRadius: '12px', color: '#0A0C29', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Bar dataKey="tasks" fill="#1C3F3A" radius={[8, 8, 0, 0]} name="Tasks Completed" />
              <Bar dataKey="accuracy" fill="#0A0C29" radius={[8, 8, 0, 0]} name="Avg. Accuracy" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl shadow-sm"
          style={{ background: "#FFFFFF", border: "1px solid #E0EAE8" }}
        >
          <h2 className="text-lg font-bold mb-4" style={{ color: "#0A0C29" }}>Task Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={taskDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0EAE8', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl overflow-hidden shadow-sm"
        style={{ background: "#FFFFFF", border: "1px solid #E0EAE8" }}
      >
        <div className="p-6" style={{ borderBottom: "1px solid #E0EAE8" }}>
          <h2 className="text-lg font-bold" style={{ color: "#0A0C29" }}>Hospital Performance Rankings</h2>
        </div>
        <DataTable columns={columns} data={hospitalData} />
      </motion.div>
    </div>
  );
}
