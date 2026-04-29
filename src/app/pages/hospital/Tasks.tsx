import { useState } from "react";
import Badge from "../../components/Badge";
import { Search, Filter, Clock, Coins, Database } from "lucide-react";
import { motion } from "motion/react";

const CARD_STYLE = { background: "#FFFFFF", border: "1px solid #E0EAE8", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" };
const TITLE_COLOR = "#0A0C29";
const MUTED_COLOR = "#64748B";

export default function Tasks() {
  const [filter, setFilter] = useState<'all' | 'new' | 'accepted'>('all');

  const allTasks = [
    { id: "4524", name: "ECG Arrhythmia Detection", researcher: "Dr. Sarah Chen", reward: 100, minSamples: 8000, epochs: 10, deadline: "2026-05-01", status: "new", description: "Train a model to detect various types of cardiac arrhythmias from ECG signals" },
    { id: "4522", name: "Tumor Detection Model", researcher: "Dr. Michael Ross", reward: 120, minSamples: 5000, epochs: 8, deadline: "2026-04-28", status: "new", description: "Develop a deep learning model for automated tumor detection in MRI scans" },
    { id: "4521", name: "Cardiac MRI Classification", researcher: "Dr. Sarah Chen", reward: 150, minSamples: 10000, epochs: 12, deadline: "2026-04-25", status: "accepted", description: "Classify cardiac conditions from MRI imaging data" },
    { id: "4520", name: "Lung CT Scan Analysis", researcher: "Dr. James Wilson", reward: 130, minSamples: 7500, epochs: 10, deadline: "2026-04-27", status: "accepted", description: "Analyze lung CT scans for early detection of pulmonary diseases" },
  ];

  const filteredTasks = filter === 'all' ? allTasks : allTasks.filter(t => t.status === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: TITLE_COLOR }}>Available Tasks</h1>
        <p className="text-sm" style={{ color: MUTED_COLOR }}>Browse and accept federated learning tasks</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-xl">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: MUTED_COLOR }} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full border rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            style={{ background: "#FFFFFF", borderColor: "#E0EAE8", color: TITLE_COLOR }}
          />
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'new', 'accepted'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={filter === f
                ? { background: "#1C3F3A", color: "#FFFFFF" }
                : { background: "#FFFFFF", color: MUTED_COLOR, border: "1px solid #E0EAE8" }
              }
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredTasks.map((task, idx) => (
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
                  <Badge variant={task.status === 'new' ? 'info' : 'success'}>
                    {task.status === 'new' ? 'New' : 'Accepted'}
                  </Badge>
                  <Badge variant="verified">ZKP Protected</Badge>
                </div>
                <p className="text-sm mb-3" style={{ color: MUTED_COLOR }}>Task #{task.id} • Posted by {task.researcher}</p>
                <p className="mb-4" style={{ color: TITLE_COLOR }}>{task.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { icon: Coins, label: "Reward", value: `${task.reward} tokens`, bg: "#D1FAE5", color: "#065F46" },
                { icon: Database, label: "Min. Samples", value: task.minSamples.toLocaleString(), bg: "#E0EAE8", color: "#1C3F3A" },
                { icon: Filter, label: "Epochs", value: String(task.epochs), bg: "#EBE8D8", color: "#0A0C29" },
                { icon: Clock, label: "Deadline", value: task.deadline, bg: "#FEF3C7", color: "#92400E" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                    <item.icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-xs" style={{ color: MUTED_COLOR }}>{item.label}</p>
                    <p className="font-semibold text-sm" style={{ color: TITLE_COLOR }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #E0EAE8" }}>
              <div className="text-sm" style={{ color: MUTED_COLOR }}>
                Estimated earnings: <span className="font-bold" style={{ color: "#1C3F3A" }}>{task.reward * task.epochs} tokens</span>
              </div>
              {task.status === 'new' ? (
                <button className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{ background: "#1C3F3A" }}>
                  Accept Task
                </button>
              ) : (
                <button className="px-6 py-2 rounded-lg font-semibold border hover:bg-secondary/50 transition-colors" style={{ color: "#1C3F3A", borderColor: "#C8DCD9" }}>
                  View Details
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
