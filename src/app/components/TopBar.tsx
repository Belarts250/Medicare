import { Bell, User, Settings, LogOut, Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";

interface TopBarProps {
  role: 'researcher' | 'hospital' | 'admin';
  userName?: string;
}

export default function TopBar({ role, userName = "John Doe" }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: "Training task #4521 completed", time: "2m ago", unread: true },
    { id: 2, text: "New hospital joined the network", time: "1h ago", unread: true },
    { id: 3, text: "ZKP verification successful", time: "3h ago", unread: false },
  ];

  const roleLabels = {
    researcher: "Researcher",
    hospital: "Hospital Partner",
    admin: "System Admin"
  };

  return (
    <div
      className="h-16 border-b flex items-center justify-between px-6 sticky top-0 z-10"
      style={{ background: "#FFFFFF", borderColor: "#E0EAE8" }}
    >
      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search tasks, hospitals, or analytics..."
            className="w-full border rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-all"
            style={{ background: "#F9FAFB", borderColor: "#E0EAE8", color: "#0A0C29" }}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        {/* ZKP Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold" style={{ borderColor: "#1C3F3A", color: "#1C3F3A", background: "#E0EAE8" }}>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          ZKP Verified
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
            className="relative p-2 rounded-lg border hover:bg-secondary transition-colors"
            style={{ borderColor: "#E0EAE8" }}
          >
            <Bell className="w-5 h-5" style={{ color: "#1C3F3A" }} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">2</span>
            </div>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 border rounded-xl shadow-xl overflow-hidden z-50"
                style={{ background: "#FFFFFF", borderColor: "#E0EAE8" }}
              >
                <div className="p-4 border-b" style={{ borderColor: "#E0EAE8" }}>
                  <h3 className="font-semibold text-sm" style={{ color: "#0A0C29" }}>Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 border-b hover:bg-secondary/50 transition-colors cursor-pointer"
                      style={{ borderColor: "#E0EAE8", background: notif.unread ? "#EBE8D8" : "transparent" }}
                    >
                      <p className="text-sm" style={{ color: "#0A0C29" }}>{notif.text}</p>
                      <span className="text-xs mt-1 block" style={{ color: "#9CA3AF" }}>{notif.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 text-center" style={{ background: "#F9FAFB" }}>
                  <button className="text-xs font-semibold hover:underline" style={{ color: "#1C3F3A" }}>
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-3 px-3 py-2 rounded-lg border hover:bg-secondary/50 transition-colors"
            style={{ borderColor: "#E0EAE8" }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "#1C3F3A" }}>
              {userName.charAt(0)}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-semibold leading-tight" style={{ color: "#0A0C29" }}>{userName}</p>
              <p className="text-xs leading-tight" style={{ color: "#9CA3AF" }}>{roleLabels[role]}</p>
            </div>
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-56 border rounded-xl shadow-xl overflow-hidden z-50"
                style={{ background: "#FFFFFF", borderColor: "#E0EAE8" }}
              >
                <div className="p-4 border-b" style={{ borderColor: "#E0EAE8" }}>
                  <p className="font-semibold text-sm" style={{ color: "#0A0C29" }}>{userName}</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>{roleLabels[role]}</p>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors text-sm" style={{ color: "#0A0C29" }}>
                    <Settings className="w-4 h-4" style={{ color: "#1C3F3A" }} />
                    Settings
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
