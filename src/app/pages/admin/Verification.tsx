import { ShieldCheck, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import Badge from "../../components/Badge";
import DataTable from "../../components/DataTable";
import { motion } from "motion/react";

const C = { bg: "#FFFFFF", border: "1px solid #E0EAE8", shadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)", title: "#0A0C29", muted: "#64748B", row: "#FFFFFF", rowBorder: "#E0EAE8", primary: "#1C3F3A" };

export default function Verification() {
  const zkpVerifications = [
    { id: "ZKP-8921", task: "Cardiac MRI Classification",  hospital: "Massachusetts General", timestamp: "2026-04-22 14:23:15", status: "verified", proofSize: "2.4 KB", verificationTime: "0.12s" },
    { id: "ZKP-8920", task: "Lung CT Scan Analysis",       hospital: "Mayo Clinic",           timestamp: "2026-04-22 14:15:42", status: "verified", proofSize: "2.1 KB", verificationTime: "0.10s" },
    { id: "ZKP-8919", task: "ECG Arrhythmia Detection",    hospital: "Stanford Medical",      timestamp: "2026-04-22 13:58:20", status: "pending",  proofSize: "2.3 KB", verificationTime: "-"     },
    { id: "ZKP-8918", task: "Tumor Detection Model",       hospital: "Johns Hopkins",         timestamp: "2026-04-22 13:45:10", status: "failed",   proofSize: "2.5 KB", verificationTime: "0.15s" },
  ];

  const columns = [
    { key: "id",               label: "Proof ID",           sortable: true },
    { key: "task",             label: "Task",               sortable: true },
    { key: "hospital",         label: "Hospital",           sortable: true },
    { key: "timestamp",        label: "Timestamp",          sortable: true },
    { key: "status",           label: "Status",             render: (value: string) => <Badge variant={value === 'verified' ? 'verified' : value === 'pending' ? 'warning' : 'error'}>{value}</Badge> },
    { key: "proofSize",        label: "Proof Size" },
    { key: "verificationTime", label: "Verification Time"  },
  ];

  const recentActivity = [
    { time: "14:23:15", action: "ZKP verified for task #4521",          hospital: "MGH",         status: "success" },
    { time: "14:15:42", action: "ZKP verified for task #4520",          hospital: "Mayo",        status: "success" },
    { time: "13:58:20", action: "ZKP verification pending",             hospital: "Stanford",    status: "warning" },
    { time: "13:45:10", action: "ZKP verification failed - invalid proof", hospital: "Johns Hopkins", status: "error" },
  ];

  const activityColors: Record<string, { bg: string; border: string }> = {
    success: { bg: "#D1FAE5", border: "#6EE7B7" },
    warning: { bg: "#FEF3C7", border: "#FCD34D" },
    error:   { bg: "#FEE2E2", border: "#FCA5A5" },
  };

  const stats = [
    { label: "Total Verified", value: "1,247", icon: CheckCircle, color: "#1C3F3A", bg: "#D1FAE5" },
    { label: "Pending",        value: "12",    icon: Clock,        color: "#92400E", bg: "#FEF3C7" },
    { label: "Failed",         value: "3",     icon: XCircle,      color: "#991B1B", bg: "#FEE2E2" },
    { label: "Success Rate",   value: "99.7%", icon: ShieldCheck,  color: "#1C3F3A", bg: "#E0EAE8" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: C.title }}>Zero-Knowledge Verification</h1>
        <p className="text-sm" style={{ color: C.muted }}>Monitor and verify cryptographic proofs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl shadow-sm" style={{ background: C.bg, border: C.border }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: stat.bg }}>
              <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
            </div>
            <p className="text-sm mb-1" style={{ color: C.muted }}>{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: C.title }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl overflow-hidden shadow-sm" style={{ background: C.bg, border: C.border }}>
        <div className="p-6" style={{ borderBottom: C.border }}>
          <h2 className="text-lg font-bold" style={{ color: C.title }}>Recent Verifications</h2>
        </div>
        <DataTable columns={columns} data={zkpVerifications} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="p-6 rounded-2xl shadow-sm" style={{ background: C.bg, border: C.border }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: C.title }}>Verification Activity Log</h2>
        <div className="space-y-3 max-h-72 overflow-y-auto">
          {recentActivity.map((log, idx) => {
            const lc = activityColors[log.status];
            return (
              <div key={idx} className="p-4 rounded-xl border" style={{ background: lc.bg, borderColor: lc.border }}>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs flex-shrink-0" style={{ color: C.muted }}>{log.time}</span>
                  <Badge variant={log.status === 'success' ? 'success' : log.status === 'error' ? 'error' : 'warning'}>{log.status}</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: C.title }}>{log.action}</p>
                    <span className="text-xs" style={{ color: C.muted }}>Hospital: {log.hospital}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-6 rounded-2xl" style={{ background: "#E0EAE8", border: "1px solid #C8DCD9" }}>
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-10 h-10 flex-shrink-0" style={{ color: "#1C3F3A" }} />
            <div>
              <h3 className="font-bold mb-2" style={{ color: C.title }}>Zero-Knowledge Protocol</h3>
              <p className="text-sm mb-3" style={{ color: C.muted }}>All contributions are cryptographically verified without revealing sensitive data. Uses zk-SNARKs to ensure integrity and privacy.</p>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p style={{ color: C.muted }}>Protocol Version</p>
                  <p className="font-bold" style={{ color: C.title }}>zkSNARK v2.1</p>
                </div>
                <div>
                  <p style={{ color: C.muted }}>Security Level</p>
                  <p className="font-bold" style={{ color: C.primary }}>256-bit</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="p-6 rounded-2xl" style={{ background: "#EBE8D8", border: "1px solid #D8D4C0" }}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-10 h-10 flex-shrink-0" style={{ color: "#0A0C29" }} />
            <div>
              <h3 className="font-bold mb-2" style={{ color: C.title }}>Verification Alerts</h3>
              <p className="text-sm mb-3" style={{ color: C.muted }}>Automated alerts for failed verifications or suspicious activity patterns.</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span style={{ color: C.muted }}>1 pending manual review</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span style={{ color: C.muted }}>3 failed verifications (24h)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
