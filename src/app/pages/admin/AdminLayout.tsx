import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden dashboard-container">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar role="admin" userName="System Administrator" />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
