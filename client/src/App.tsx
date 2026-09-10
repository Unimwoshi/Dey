import "./index.css";
import AuthPage from "./auth/AuthPage";
import Onboarding from "./onboarding/Onboarding";
import Dashboard from "./dashboard/Dashboard";
import { DashboardProvider } from "./dashboard/context/DashboardContext";
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
                <Outlet />
              </DashboardProvider>
            }
          >
            <Route index element={<Dashboard />} />
            {/* <Route path="workspace" element={<Workspace />} /> — once it exists */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
