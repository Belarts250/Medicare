import { Download, FileText, BarChart3, CheckCircle, TrendingUp } from "lucide-react";
import Badge from "../../components/Badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";

const CARD_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" };
const TITLE_COLOR = "#0A0C29";
const MUTED_COLOR = "#64748B";

export default function Results() {
  const completedTasks = [
    { id: "4521", name: "Cardiac MRI Classification", accuracy: 94.2, hospitals: 12, samples: 145000, completedAt: "2026-04-20", epochs: 10 },
    { id: "4518", name: "Lung CT Scan Analysis", accuracy: 92.8, hospitals: 10, samples: 128000, completedAt: "2026-04-18", epochs: 8 },
    { id: "4512", name: "Diabetic Retinopathy Detection", accuracy: 91.5, hospitals: 8, samples: 98000, completedAt: "2026-04-15", epochs: 12 },
  ];

  const metricData = [
    { metric: "Precision", value: 93.5 },
    { metric: "Recall", value: 92.8 },
    { metric: "F1-Score", value: 93.1 },
    { metric: "AUC-ROC", value: 95.2 },
  ];

  const confusionMatrix = [
    [850, 42, 18, 10],
    [35, 892, 25, 8],
    [22, 31, 905, 12],
    [8, 15, 20, 937],
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: TITLE_COLOR }}>Training Results</h1>
        <p className="text-sm" style={{ color: MUTED_COLOR }}>Download models and view comprehensive metrics</p>
      </div>

      <div className="space-y-6">
        {completedTasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl hover:shadow-md transition-all"
            style={CARD_STYLE}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold" style={{ color: TITLE_COLOR }}>{task.name}</h3>
                  <Badge variant="verified">ZKP Verified</Badge>
                  <Badge variant="success">Completed</Badge>
                </div>
                <p className="text-sm" style={{ color: MUTED_COLOR }}>Task #{task.id} • Completed {task.completedAt}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold transition-colors flex items-center gap-2 hover:opacity-90" style={{ background: "#1C3F3A" }}>
                  <Download className="w-4 h-4" /> Download Model
                </button>
                <button className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 border hover:bg-secondary/50" style={{ color: "#0A0C29", borderColor: "#E0EAE8" }}>
                  <FileText className="w-4 h-4" /> Export Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { label: "Accuracy", value: `${task.accuracy}%`, icon: CheckCircle },
                { label: "Hospitals", value: task.hospitals, icon: BarChart3 },
                { label: "Samples", value: task.samples.toLocaleString(), icon: TrendingUp },
                { label: "Epochs", value: task.epochs, icon: FileText },
                { label: "Avg. Loss", value: "0.12", icon: TrendingUp },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border shadow-sm" style={{ background: "#FFFFFF", borderColor: "#E0EAE8" }}>
                  <stat.icon className="w-5 h-5 mb-2" style={{ color: "#1C3F3A" }} />
                  <p className="text-xs mb-1" style={{ color: MUTED_COLOR }}>{stat.label}</p>
                  <p className="text-lg font-bold" style={{ color: TITLE_COLOR }}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3 text-sm" style={{ color: TITLE_COLOR }}>Performance Metrics</h4>
                <div className="space-y-2">
                  {metricData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl shadow-sm" style={{ background: "#FFFFFF", border: "1px solid #E0EAE8" }}>
                      <span className="text-sm font-medium" style={{ color: TITLE_COLOR }}>{item.metric}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 rounded-full overflow-hidden" style={{ background: "#E0EAE8" }}>
                          <div className="h-full rounded-full" style={{ width: `${item.value}%`, background: "#1C3F3A" }} />
                        </div>
                        <span className="text-sm font-bold w-12 text-right" style={{ color: "#1C3F3A" }}>{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-3 text-sm" style={{ color: TITLE_COLOR }}>Confusion Matrix</h4>
                <div className="grid grid-cols-4 gap-1">
                  {confusionMatrix.flat().map((value, i) => {
                    const isCorrect = i % 5 === 0;
                    return (
                      <div
                        key={i}
                        className="aspect-square flex items-center justify-center rounded text-xs font-medium"
                        style={isCorrect
                          ? { background: "#D1FAE5", color: "#065F46", border: "1px solid #6EE7B7" }
                          : { background: "#FFFFFF", color: MUTED_COLOR, border: "1px solid #E0EAE8" }
                        }
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
