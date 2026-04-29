import { Shield, Lock, Database, AlertTriangle, CheckCircle } from "lucide-react";
import Badge from "../../components/Badge";
import { useState } from "react";
import { motion } from "motion/react";

export default function PrivacyControl() {
  const [settings, setSettings] = useState({
    dataSharing: false,
    autoAccept: false,
    anonymization: true,
    auditLogs: true,
    encryptionLevel: 'high',
  });

  const permissions = [
    { id: 1, task: "Cardiac MRI Classification", researcher: "Dr. Sarah Chen", status: "active", dataAccess: "read-only" },
    { id: 2, task: "Lung CT Scan Analysis", researcher: "Dr. James Wilson", status: "active", dataAccess: "read-only" },
    { id: 3, task: "ECG Analysis", researcher: "Dr. Michael Ross", status: "revoked", dataAccess: "none" },
  ];

  const auditLog = [
    { time: "2026-04-22 14:23", action: "ZKP verification successful", task: "Task #4521", status: "success" },
    { time: "2026-04-22 12:15", action: "Model update transmitted", task: "Task #4520", status: "success" },
    { time: "2026-04-22 10:45", action: "Training initiated", task: "Task #4521", status: "info" },
    { time: "2026-04-21 18:30", action: "Data access requested", task: "Task #4522", status: "warning" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Control</h1>
        <p className="text-gray-600">Manage data access and security settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Permissions", value: "2", icon: CheckCircle, color: "green" },
          { label: "Revoked Access", value: "1", icon: AlertTriangle, color: "orange" },
          { label: "Encryption Status", value: "Active", icon: Lock, color: "blue" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-xl bg-white border border-[#E0EAE8] shadow-sm"
          >
            <stat.icon className="w-8 h-8 text-blue-500 mb-3" />
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-900">Privacy Settings</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Data Sharing</h3>
              <p className="text-sm text-gray-600">Allow sharing anonymized metadata with researchers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dataSharing}
                onChange={(e) => setSettings({ ...settings, dataSharing: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Auto-Accept Tasks</h3>
              <p className="text-sm text-gray-600">Automatically accept tasks from verified researchers</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoAccept}
                onChange={(e) => setSettings({ ...settings, autoAccept: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Data Anonymization</h3>
              <p className="text-sm text-gray-600">Remove personally identifiable information</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.anonymization}
                onChange={(e) => setSettings({ ...settings, anonymization: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Audit Logging</h3>
              <p className="text-sm text-gray-600">Track all data access and training activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.auditLogs}
                onChange={(e) => setSettings({ ...settings, auditLogs: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Encryption Level</h3>
              <Badge variant="verified">High Security</Badge>
            </div>
            <select
              value={settings.encryptionLevel}
              onChange={(e) => setSettings({ ...settings, encryptionLevel: e.target.value })}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="standard">Standard (AES-128)</option>
              <option value="high">High (AES-256)</option>
              <option value="maximum">Maximum (AES-256-GCM + ZKP)</option>
            </select>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Active Permissions</h2>
        <div className="space-y-4">
          {permissions.map((permission, idx) => (
            <div
              key={permission.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{permission.task}</h3>
                    <Badge variant={permission.status === 'active' ? 'success' : 'error'}>
                      {permission.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>Researcher: {permission.researcher}</span>
                    <span>Access: {permission.dataAccess}</span>
                  </div>
                </div>
                {permission.status === 'active' && (
                  <button className="px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium transition-colors">
                    Revoke Access
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-6 rounded-xl bg-white border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Audit Log</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {auditLog.map((log, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 text-sm"
            >
              <span className="text-gray-500 font-mono">{log.time}</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  log.status === 'success'
                    ? 'bg-green-100 text-green-700'
                    : log.status === 'warning'
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
              >
                {log.status}
              </span>
              <span className="text-gray-700 flex-1">{log.action}</span>
              <span className="text-gray-500">{log.task}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-6 rounded-xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 shadow-sm"
      >
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Emergency Data Control</h3>
            <p className="text-sm text-gray-600 mb-4">
              Immediately terminate all active training sessions and revoke all data access permissions.
              This action cannot be undone.
            </p>
            <button className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
              Emergency Shutdown
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}