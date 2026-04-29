import { Vote, TrendingUp, Users, CheckCircle2 } from "lucide-react";
import Badge from "../../components/Badge";
import ProgressBar from "../../components/ProgressBar";
import { motion } from "motion/react";

const C = { bg: "#FFFFFF", border: "1px solid #E0EAE8", shadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)", title: "#0A0C29", muted: "#64748B", row: "#FFFFFF", rowBorder: "#E0EAE8", primary: "#1C3F3A" };

export default function Governance() {
  const activeProposals = [
    { id: "PROP-042", title: "Increase Minimum Reward Per Epoch", description: "Proposal to increase the minimum reward from 100 to 150 tokens per epoch to incentivize hospital participation", proposer: "Community DAO", votesFor: 1248, votesAgainst: 342, totalVotes: 1590, quorum: 2000, deadline: "2026-04-25", category: "Economics" },
    { id: "PROP-041", title: "New Privacy Compliance Standards", description: "Implement enhanced GDPR and HIPAA compliance measures for all participating institutions", proposer: "Security Committee", votesFor: 1856, votesAgainst: 124, totalVotes: 1980, quorum: 2000, deadline: "2026-04-24", category: "Security" },
  ];

  const completedProposals = [
    { id: "PROP-040", title: "Upgrade Zero-Knowledge Protocol", status: "passed",   finalVotes: { for: 2845, against: 234  }, implementedDate: "2026-04-15", completedDate: "" },
    { id: "PROP-039", title: "Reduce Block Time to 2 seconds",  status: "rejected", finalVotes: { for: 892,  against: 1654 }, implementedDate: "",           completedDate: "2026-04-10" },
  ];

  const stakeholders = [
    { type: "Hospitals",    count: 48,  votingPower: 45 },
    { type: "Researchers",  count: 127, votingPower: 35 },
    { type: "Validators",   count: 23,  votingPower: 20 },
  ];

  const stats = [
    { label: "Active Proposals",  value: "2",     icon: Vote        },
    { label: "Total Votes Cast",  value: "3.5K",  icon: CheckCircle2 },
    { label: "Participation Rate",value: "87.3%", icon: TrendingUp   },
    { label: "Stakeholders",      value: "198",   icon: Users        },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1" style={{ color: C.title }}>Network Governance</h1>
        <p className="text-sm" style={{ color: C.muted }}>Vote on proposals and protocol upgrades</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-2xl shadow-sm" style={{ background: C.bg, border: C.border }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ background: "#E0EAE8" }}>
              <stat.icon className="w-6 h-6" style={{ color: C.primary }} />
            </div>
            <p className="text-sm mb-1" style={{ color: C.muted }}>{stat.label}</p>
            <p className="text-2xl font-bold" style={{ color: C.title }}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-6 rounded-2xl shadow-sm" style={{ background: C.bg, border: C.border }}>
        <h2 className="text-lg font-bold mb-6" style={{ color: C.title }}>Active Proposals</h2>
        <div className="space-y-6">
          {activeProposals.map((proposal, idx) => (
            <motion.div key={proposal.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + idx * 0.1 }}
              className="p-6 rounded-2xl hover:shadow-sm transition-all" style={{ background: C.row, border: `1px solid ${C.rowBorder}` }}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold" style={{ color: C.title }}>{proposal.title}</h3>
                    <Badge variant="info">{proposal.category}</Badge>
                    <Badge variant="warning">Voting Open</Badge>
                  </div>
                  <p className="text-xs mb-3" style={{ color: C.muted }}>{proposal.id} • Proposed by {proposal.proposer}</p>
                  <p className="text-sm mb-4" style={{ color: C.title }}>{proposal.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm" style={{ color: C.muted }}>Voting Progress</span>
                  <span className="text-sm font-semibold" style={{ color: C.title }}>
                    {proposal.totalVotes} / {proposal.quorum} votes ({((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}% quorum)
                  </span>
                </div>
                <ProgressBar value={(proposal.totalVotes / proposal.quorum) * 100} showLabel={false} color="primary" />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-4 rounded-xl border" style={{ background: "#D1FAE5", borderColor: "#6EE7B7" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#065F46" }} />
                    <span className="text-sm" style={{ color: "#065F46" }}>For</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: "#065F46" }}>{proposal.votesFor}</p>
                  <p className="text-xs mt-1" style={{ color: "#065F46" }}>{((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ background: "#FEE2E2", borderColor: "#FCA5A5" }}>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4" style={{ color: "#991B1B" }} />
                    <span className="text-sm" style={{ color: "#991B1B" }}>Against</span>
                  </div>
                  <p className="text-2xl font-bold" style={{ color: "#991B1B" }}>{proposal.votesAgainst}</p>
                  <p className="text-xs mt-1" style={{ color: "#991B1B" }}>{((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4" style={{ borderTop: `1px solid ${C.rowBorder}` }}>
                <span className="text-sm" style={{ color: C.muted }}>Deadline: {proposal.deadline}</span>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: "#1C3F3A" }}>Vote For</button>
                  <button className="px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: "#991B1B" }}>Vote Against</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="p-6 rounded-2xl shadow-sm" style={{ background: C.bg, border: C.border }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: C.title }}>Recent Decisions</h2>
          <div className="space-y-3">
            {completedProposals.map((proposal) => (
              <div key={proposal.id} className="p-4 rounded-xl" style={{ background: C.row, border: `1px solid ${C.rowBorder}` }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-sm" style={{ color: C.title }}>{proposal.title}</h3>
                  <Badge variant={proposal.status === 'passed' ? 'success' : 'error'}>{proposal.status}</Badge>
                </div>
                <div className="flex items-center gap-6 text-xs" style={{ color: C.muted }}>
                  <span>{proposal.id}</span>
                  <span>For: {proposal.finalVotes.for}</span>
                  <span>Against: {proposal.finalVotes.against}</span>
                </div>
                <p className="text-xs mt-2" style={{ color: C.muted }}>
                  {proposal.status === 'passed' ? 'Implemented' : 'Completed'}: {proposal.implementedDate || proposal.completedDate}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="p-6 rounded-2xl shadow-sm" style={{ background: C.bg, border: C.border }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: C.title }}>Voting Power Distribution</h2>
          <div className="space-y-4">
            {stakeholders.map((s, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-sm" style={{ color: C.title }}>{s.type}</span>
                    <span className="text-xs ml-2" style={{ color: C.muted }}>({s.count})</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: C.primary }}>{s.votingPower}%</span>
                </div>
                <ProgressBar value={s.votingPower} showLabel={false} color="primary" />
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl" style={{ background: "#E0EAE8", border: "1px solid #C8DCD9" }}>
            <p className="text-sm" style={{ color: C.muted }}>
              Voting power is distributed based on contribution history, stake amount, and node reliability.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
