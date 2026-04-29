import { useParams } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Clock, CheckCircle2 } from "lucide-react";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";
import { motion } from "motion/react";

export default function TrainingMonitor() {
  const { taskId } = useParams();

  const accuracyData = [
    { epoch: 1, accuracy: 65, loss: 0.45 },
    { epoch: 2, accuracy: 72, loss: 0.38 },
    { epoch: 3, accuracy: 78, loss: 0.31 },
    { epoch: 4, accuracy: 84, loss: 0.25 },
    { epoch: 5, accuracy: 88, loss: 0.19 },
  ];

  const hospitals = [
    { id: 1, name: "Massachusetts General", progress: 100, status: "completed", samples: 15420 },
    { id: 2, name: "Mayo Clinic", progress: 85, status: "training", samples: 12350 },
    { id: 3, name: "Stanford Medical", progress: 72, status: "training", samples: 18200 },
    { id: 4, name: "Johns Hopkins", progress: 45, status: "training", samples: 9870 },
    { id: 5, name: "Cleveland Clinic", progress: 20, status: "training", samples: 11500 },
  ];

  const logs = [
    { time: "14:23:15", type: "info", message: "Epoch 5/10 completed - Accuracy: 88.2%" },
    { time: "14:22:48", type: "success", message: "ZKP verification successful for MGH contribution" },
    { time: "14:21:30", type: "info", message: "Mayo Clinic: Training epoch 4/10" },
    { time: "14:20:12", type: "warning", message: "Network latency detected - 250ms delay" },
    { time: "14:19:45", type: "success", message: "Model aggregation completed" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0A0C29] mb-2">Training Monitor</h1>
          <p className="text-[#64748B]">Task #{taskId} - Real-time federated training</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="verified">ZKP Verified</Badge>
          <Badge variant="info">In Progress</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Current Epoch", value: "5 / 10", icon: Activity, color: "#1C3F3A" },
          { label: "Avg. Accuracy", value: "88.2%", icon: CheckCircle2, color: "#1C3F3A" },
          { label: "Est. Completion", value: "2h 15m", icon: Clock, color: "#1C3F3A" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-xl bg-white border border-[#E0EAE8] shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[#1C3F3A]/10">
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <p className="text-sm text-[#64748B] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#0A0C29]">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-white border border-[#E0EAE8] shadow-sm"
      >
        <h2 className="text-xl font-bold text-[#0A0C29] mb-4">Training Progress</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={accuracyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
            <XAxis dataKey="epoch" stroke="#94a3b8" label={{ value: 'Epoch', position: 'insideBottom', offset: -5, fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
            <Tooltip
              contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E0EAE8', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            />
            <Line type="monotone" dataKey="accuracy" stroke="#1C3F3A" strokeWidth={3} dot={{ fill: '#1C3F3A', r: 5 }} />
            <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-white border border-[#E0EAE8] shadow-sm"
      >
        <h2 className="text-xl font-bold text-[#0A0C29] mb-4">Hospital Contributions</h2>
        <div className="space-y-4">
          {hospitals.map((hospital, idx) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
              className="p-4 rounded-lg bg-white border border-[#E0EAE8] shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1C3F3A] flex items-center justify-center text-white font-bold">
                    {hospital.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0C29]">{hospital.name}</h3>
                    <p className="text-xs text-[#64748B]">{hospital.samples.toLocaleString()} samples</p>
                  </div>
                </div>
                <Badge variant={hospital.status === 'completed' ? 'success' : 'info'}>
                  {hospital.status}
                </Badge>
              </div>
              <ProgressBar value={hospital.progress} showLabel color={hospital.progress === 100 ? 'primary' : 'primary'} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-white border border-[#E0EAE8] shadow-sm"
      >
        <h2 className="text-xl font-bold text-[#0A0C29] mb-4">Training Logs</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-white border border-[#E0EAE8] text-sm"
            >
              <span className="text-[#64748B] font-mono">{log.time}</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  log.type === 'success'
                    ? 'bg-green-100 text-green-700'
                    : log.type === 'warning'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {log.type}
              </span>
              <span className="text-[#0A0C29] flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
