import { Coins, TrendingUp, Award, Calendar } from "lucide-react";
import StatCard from "../../components/StatCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import Badge from "../../components/Badge";
import { motion } from "motion/react";

const C = { background: "#FFFFFF", border: "1px solid #E0EAE8", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)" };
const TEXT = { title: "#0A0C29", muted: "#64748B", primary: "#1C3F3A" };
const ROW = { background: "#FFFFFF", border: "1px solid #E0EAE8" };
const TT = { backgroundColor: "#FFFFFF", border: "1px solid #E0EAE8", borderRadius: "12px", color: "#0A0C29" };

export default function Rewards() {
  const earningsHistory = [
    { month: "Nov", earnings: 8200 }, { month: "Dec", earnings: 10500 },
    { month: "Jan", earnings: 12400 }, { month: "Feb", earnings: 15200 },
    { month: "Mar", earnings: 18900 }, { month: "Apr", earnings: 22100 },
  ];
  const recentRewards = [
    { id: 1, task: "Cardiac MRI Classification", amount: 1800, date: "2026-04-22", status: "completed" },
    { id: 2, task: "Lung CT Scan Analysis", amount: 1300, date: "2026-04-20", status: "completed" },
    { id: 3, task: "ECG Arrhythmia Detection", amount: 1000, date: "2026-04-18", status: "pending" },
    { id: 4, task: "Diabetic Retinopathy", amount: 1500, date: "2026-04-15", status: "completed" },
  ];
  const taskBreakdown = [
    { type: "Classification", earnings: 28500 }, { type: "Detection", earnings: 22100 },
    { type: "Segmentation", earnings: 12400 }, { type: "Prediction", earnings: 5700 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: TEXT.title }}>Rewards & Earnings</h1>
        <p className="text-sm" style={{ color: TEXT.muted }}>Track your contributions and token rewards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Earnings" value="68.7K" icon={Coins} trend={{ value: "22.1K this month", isPositive: true }} color="primary" />
        <StatCard title="Contribution Score" value={145} icon={Award} trend={{ value: "+23", isPositive: true }} color="secondary" />
        <StatCard title="Avg. per Task" value="1,342" icon={TrendingUp} trend={{ value: "+8.2%", isPositive: true }} color="beige" />
        <StatCard title="Pending Payout" value="3.2K" icon={Calendar} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl" style={C}>
          <h2 className="text-lg font-bold mb-4" style={{ color: TEXT.title }}>Earnings History</h2>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={earningsHistory}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1C3F3A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#1C3F3A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
              <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={TT} />
              <Area type="monotone" dataKey="earnings" stroke="#1C3F3A" fillOpacity={1} fill="url(#colorEarnings)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl" style={C}>
          <h2 className="text-lg font-bold mb-4" style={{ color: TEXT.title }}>Earnings by Task Type</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={taskBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0EAE8" />
              <XAxis type="number" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis dataKey="type" type="category" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip contentStyle={TT} />
              <Bar dataKey="earnings" fill="#1C3F3A" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl shadow-sm" style={C}>
        <h2 className="text-lg font-bold mb-4" style={{ color: TEXT.title }}>Recent Rewards</h2>
        <div className="space-y-3">
          {recentRewards.map((reward, idx) => (
            <motion.div key={reward.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + idx * 0.05 }}
              className="flex items-center justify-between p-4 rounded-xl shadow-sm transition-all" style={ROW}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "#E0EAE8" }}>
                  <Coins className="w-6 h-6" style={{ color: "#1C3F3A" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-0.5" style={{ color: TEXT.title }}>{reward.task}</h3>
                  <p className="text-xs" style={{ color: TEXT.muted }}>{reward.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-bold" style={{ color: TEXT.primary }}>+{reward.amount.toLocaleString()}</p>
                  <p className="text-xs" style={{ color: TEXT.muted }}>tokens</p>
                </div>
                <Badge variant={reward.status === 'completed' ? 'success' : 'warning'}>{reward.status}</Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl" style={C}>
          <h3 className="font-bold mb-4" style={{ color: TEXT.title }}>Leaderboard Ranking</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#1C3F3A" }}>
              <span className="text-2xl font-bold text-white">#3</span>
            </div>
            <div>
              <p className="text-sm" style={{ color: TEXT.muted }}>Your Rank</p>
              <p className="text-lg font-bold" style={{ color: TEXT.title }}>Top 5% of Contributors</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            {[["Total Contributions", "184 tasks"], ["Avg. Accuracy", "91.2%"], ["Uptime", "99.8%"]].map(([k, v]) => (
              <div key={k} className="flex justify-between p-3 rounded-lg border border-[#E0EAE8] shadow-sm" style={{ background: "#FFFFFF" }}>
                <span style={{ color: TEXT.muted }}>{k}:</span>
                <span className="font-semibold" style={{ color: TEXT.title }}>{v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-2xl" style={C}>
          <h3 className="font-bold mb-4" style={{ color: TEXT.title }}>Next Payout</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#E0EAE8" }}>
              <Coins className="w-8 h-8" style={{ color: "#1C3F3A" }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: TEXT.muted }}>Scheduled for</p>
              <p className="text-lg font-bold" style={{ color: TEXT.title }}>April 30, 2026</p>
            </div>
          </div>
          <div className="p-4 rounded-xl mb-4 border border-[#E0EAE8] shadow-sm" style={{ background: "#FFFFFF" }}>
            <div className="flex justify-between mb-2">
              <span style={{ color: TEXT.muted }}>Amount:</span>
              <span className="text-2xl font-bold" style={{ color: TEXT.primary }}>3,200 tokens</span>
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: TEXT.muted }}>Est. value:</span>
              <span className="font-semibold" style={{ color: TEXT.title }}>$6,400 USD</span>
            </div>
          </div>
          <button className="w-full px-4 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity" style={{ background: TEXT.primary }}>
            View Payout Details
          </button>
        </motion.div>
      </div>
    </div>
  );
}
