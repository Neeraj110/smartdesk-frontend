import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { User } from "@/types/types";
import { Toaster } from "sonner";
import { SidebarProvider } from "./components/contexts/SidebarContext";
import ResetPassword from "./components/reset-Password/ResetPassword";

const HomePage = lazy(() => import("@/pages/HomePage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));
const DashBoardPage = lazy(() => import("@/pages/DashBoardPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const Dashboard = lazy(() => import("@/components/dashboard/Dashboard"));
const Notes = lazy(() => import("@/components/notes/Notes"));
const Task = lazy(() => import("@/components/tasks/Task"));
const AiLearning = lazy(() => import("@/components/aiLearning/AiLearning"));

const Profile = lazy(() => import("@/components/profile/Profile"));

function App() {
  const { user } = useSelector((state: User) => state?.user);

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    throw new Error("VITE_GOOGLE_CLIENT_ID is not defined");
  }

  const GoogleWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <LoginPage />
      </GoogleOAuthProvider>
    );
  };

  return (
    <BrowserRouter>
      <SidebarProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/dashboard" /> : <GoogleWrapper />}
            />
            <Route
              path="/forgot-password"
              element={user ? <Navigate to="/dashboard" /> : <ResetPassword />}
            />
            <Route
              path="/register"
              element={user ? <Navigate to="/dashboard" /> : <RegisterPage />}
            />
            <Route
              path="/dashboard"
              element={user ? <DashBoardPage /> : <Navigate to="/login" />}
            >
              <Route index element={<Dashboard />} />
              <Route path="overview" element={<Dashboard />} />
              <Route path="notes" element={<Notes />} />
              <Route path="tasks" element={<Task />} />
              <Route path="profile" element={<Profile />} />
              <Route path="ai-learning" element={<AiLearning />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Toaster />
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
