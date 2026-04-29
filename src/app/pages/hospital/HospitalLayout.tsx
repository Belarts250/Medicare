import { Outlet } from "react-router";
import Sidebar from "../../components/Sidebar";
import TopBar from "../../components/TopBar";

export default function HospitalLayout() {
  return (
    <div className="flex h-screen overflow-hidden dashboard-container">
      <Sidebar role="hospital" />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar role="hospital" userName="Massachusetts General Hospital" />
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
