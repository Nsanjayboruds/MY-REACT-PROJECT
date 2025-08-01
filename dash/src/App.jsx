import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Finance from "./pages/Finance";
import Health from "./pages/Health";
import Productivity from "./pages/Productivity";
import InsightsPage from "./pages/InsightsPage";
import AnimatedPage from "./components/AnimatedPage";
import { AnimatePresence } from "framer-motion";
import CalendarPage from "./pages/CalendarPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AnimatedPage>
              <Dashboard />
            </AnimatedPage>
          }
        />
        <Route
          path="/finance"
          element={
            <AnimatedPage>
              <Finance />
            </AnimatedPage>
          }
        />
        <Route
          path="/health"
          element={
            <AnimatedPage>
              <Health />
            </AnimatedPage>
          }
        />
        <Route
          path="/productivity"
          element={
            <AnimatedPage>
              <Productivity />
            </AnimatedPage>
          }
        />
        <Route
          path="/insights"
          element={
            <AnimatedPage>
              <InsightsPage />
            </AnimatedPage>
          }
        />
         <Route
          path="/calendar"
          element={
            <AnimatedPage>
              <CalendarPage/>
            </AnimatedPage>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full min-h-screen dark:bg-gray-900 transition-colors">
          <Navbar />
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
