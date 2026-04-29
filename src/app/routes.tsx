import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ResearcherLayout from "./pages/researcher/ResearcherLayout";
import ResearcherDashboard from "./pages/researcher/ResearcherDashboard";
import CreateTask from "./pages/researcher/CreateTask";
import TrainingMonitor from "./pages/researcher/TrainingMonitor";
import Analytics from "./pages/researcher/Analytics";
import Results from "./pages/researcher/Results";
import HospitalLayout from "./pages/hospital/HospitalLayout";
import HospitalDashboard from "./pages/hospital/HospitalDashboard";
import Tasks from "./pages/hospital/Tasks";
import Training from "./pages/hospital/Training";
import TrainAI from "./pages/hospital/TrainAI";
import PrivacyControl from "./pages/hospital/PrivacyControl";
import Rewards from "./pages/hospital/Rewards";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Verification from "./pages/admin/Verification";
import Governance from "./pages/admin/Governance";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/researcher",
    Component: ResearcherLayout,
    children: [
      { index: true, Component: ResearcherDashboard },
      { path: "create-task", Component: CreateTask },
      { path: "training/:taskId", Component: TrainingMonitor },
      { path: "analytics", Component: Analytics },
      { path: "results", Component: Results },
    ],
  },
  {
    path: "/hospital",
    Component: HospitalLayout,
    children: [
      { index: true, Component: HospitalDashboard },
      { path: "tasks", Component: Tasks },
      { path: "training/:taskId", Component: Training },
      { path: "train-ai", Component: TrainAI },
      { path: "privacy", Component: PrivacyControl },
      { path: "rewards", Component: Rewards },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "verification", Component: Verification },
      { path: "governance", Component: Governance },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
