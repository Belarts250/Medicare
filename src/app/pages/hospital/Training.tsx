import { useParams } from "react-router";
import { Cpu, HardDrive, Zap, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";
import { motion } from "motion/react";

const C = { bg: "#FFFFFF", border: "1px solid #E0EAE8", title: "#0A0C29", muted: "#6B7280", row: "#F9FAFB", rowBorder: "#E0EAE8", primary: "#1C3F3A" };
const TT = { backgroundColor: "#FFFFFF", border: "1px solid #E0EAE8", borderRadius: "12px", color: "#0A0C29" };

const logColors: Record<string, { bg: string; color: string }> = {
  success: { bg: "#D1FAE5", color: "#065F46" },
  warning: { bg: "#FEF3C7", color: "#92400E" },
  info:    { bg: "#E0EAE8", color: "#1C3F3A" },
};

export default function Training() {
  const { taskId } = useParams();

  const resourceData = [
    { time: "14:20", cpu: 65, gpu: 78, memory: 42 },
    { time: "14:21", cpu: 72, gpu: 85, memory: 45 },
    { time: "14:22", cpu: 68, gpu: 82, memory: 48 },
    { time: "14:23", cpu: 75, gpu: 88, memory: 50 },
    { time: "14:24", cpu: 70, gpu: 84, memory: 47 },
  ];

  const logs = [
    { time: "14:24:32", level: "info",    message: "Epoch 7/10 - Loss: 0.245, Accuracy: 87.3%" },
    { time: "14:24:15", level: "success", message: "Zero-knowledge proof generated successfully" },
    { time: "14:23:48", level: "info",    message: "Model weights encrypted and transmitted" },
    { time: "14:23:20", level: "info",    message: "Processing batch 245/300" },
    { time: "14:22:55", level: "warning", message: "GPU temperature: 78°C (within safe limits)" },
    { time: "14:22:30", level: "success", message: "Epoch 6/10 completed" },
  ];

  const resourceStats = [
    { label: "CPU Usage",  value: "70%",     icon: Cpu      },
    { label: "GPU Usage",  value: "84%",     icon: Zap      },
    { label: "Memory",     value: "47%",     icon: HardDrive },
    { label: "Network",    value: "2.3 MB/s", icon: Activity  },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: C.title }}>Local Training</h1>
          <p className="text-sm" style={{ color: C.muted }}>Task #{taskId} - Cardiac MRI Classification</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="info">Training</Badge>
          <Badge variant="verified">Data Secured</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {resourceStats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl" style={C}>
            <stat.icon className="w-8 h-8 mb-3" style={{ color: C.primary }} />
            <p className="text-sm mb-1" style={{ color: C.muted }}>{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: C.title }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl" style={C}>
        <h2 className="text-lg font-bold mb-4" style={{ color: C.title }}>Training Progress</h2>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: C.muted }}>Overall Progress</span>
              <span className="text-sm font-semibold" style={{ color: C.title }}>Epoch 7/10 (70%)</span>
            </div>
            <ProgressBar value={70} showLabel={false} color="primary" size="lg" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm" style={{ color: C.muted }}>Current Epoch</span>
              <span className="text-sm font-semibold" style={{ color: C.title }}>245/300 batches (81.7%)</span>
            </div>
            <ProgressBar value={81.7} showLabel={false} color="navy" size="md" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4" style={{ borderTop: `1px solid ${C.rowBorder}` }}>
            {[
              { label: "Samples Processed", value: "73,500", highlight: false },
              { label: "Current Loss",       value: "0.245",  highlight: true  },
              { label: "Current Accuracy",   value: "87.3%",  highlight: true  },
              { label: "Est. Time Left",     value: "45 min", highlight: false },
            ].map((s, i) => (
              <div key={i}>
                <p className="text-xs mb-1" style={{ color: C.muted }}>{s.label}</p>
                <p className="text-lg font-bold" style={{ color: s.highlight ? C.primary : C.title }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-2xl" style={C}>
        <h2 className="text-lg font-bold mb-4" style={{ color: C.title }}>Resource Usage</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={resourceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
            <XAxis dataKey="time" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} label={{ value: 'Usage (%)', angle: -90, position: 'insideLeft', fill: '#9CA3AF', fontSize: 11 }} />
            <Tooltip contentStyle={TT} />
            <Line type="monotone" dataKey="cpu"    stroke="#1C3F3A" strokeWidth={2} name="CPU"    dot={false} />
            <Line type="monotone" dataKey="gpu"    stroke="#0A0C29" strokeWidth={2} name="GPU"    dot={false} />
            <Line type="monotone" dataKey="memory" stroke="#10B981" strokeWidth={2} name="Memory" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-6 rounded-2xl" style={C}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: C.title }}>Training Logs</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm" style={{ color: C.muted }}>Live</span>
          </div>
        </div>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {logs.map((log, idx) => {
            const lc = logColors[log.level] || logColors.info;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl text-sm font-mono" style={{ background: C.row, border: `1px solid ${C.rowBorder}` }}>
                <span className="text-xs flex-shrink-0" style={{ color: C.muted }}>{log.time}</span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold flex-shrink-0" style={{ background: lc.bg, color: lc.color }}>{log.level}</span>
                <span className="flex-1" style={{ color: C.title }}>{log.message}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="p-6 rounded-2xl" style={{ background: "#E0EAE8", border: "1px solid #C8DCD9" }}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#1C3F3A" }}>
            <Badge variant="verified" size="md">✓</Badge>
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-2" style={{ color: C.title }}>Privacy Protected Training</h3>
            <p className="text-sm mb-3" style={{ color: C.muted }}>
              Your data never leaves your infrastructure. Only encrypted model updates are transmitted,
              with zero-knowledge proofs verifying contributions without revealing sensitive information.
            </p>
            <div className="flex items-center gap-4 text-xs font-medium" style={{ color: C.primary }}>
              <span>🔒 End-to-end encryption</span>
              <span>🛡️ ZKP verified</span>
              <span>📊 Local processing only</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
