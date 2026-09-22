import "./index.css";
import AuthPage from "./auth/AuthPage";
import Onboarding from "./onboarding/Onboarding";
import Dashboard from "./dashboard/Dashboard";
import Workspace from "./workspace/Workspace";
import DashboardLayout from "./dashboard/components/DashboardLayout"
import Finance from "./finance/Finance"
import { DashboardProvider } from "./dashboard/context/DashboardContext";
import { WorkspaceProvider } from "./workspace/context/WorkspaceContext";
import { NavPreferencesProvider } from './dashboard/context/NavPreferences'
import {FinanceProvider} from "./finance/context/FinanceContext"
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/dashboard"
            element={
              <DashboardProvider>
                <NavPreferencesProvider>
                <DashboardLayout>
                <Outlet />
                </DashboardLayout>
                </NavPreferencesProvider>
              </DashboardProvider>
            }
          >
            <Route path="overview" index element={<Dashboard />} />
            <Route
              path="workspace"
              element={
                <WorkspaceProvider>
                  <Workspace />
                </WorkspaceProvider>
              }
            />

            <Route
              path="finance"
              element={
                <FinanceProvider>
                  <Finance />
                </FinanceProvider>
              }
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
