import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  HeartPulse, 
  DollarSign, 
  Clock, 
  Lightbulb,      // <-- ADD THIS
  Calendar as CalendarIcon // <-- ADD THIS (Calendar icon is named Calendar in lucide-react)
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { to: "/finance", label: "Finance", icon: <DollarSign size={20} /> },
    { to: "/health", label: "Health", icon: <HeartPulse size={20} /> },
    { to: "/productivity", label: "Productivity", icon: <Clock size={20} /> },
    { to: "/insights", label: "Insights", icon: <Lightbulb size={20} /> },
    { to: "/calendar", label: "Calendar", icon: <CalendarIcon size={20} /> },
  ];

  return (
    <aside className="fixed h-screen w-64 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md flex flex-col">
      <div className="p-6 text-2xl font-bold">Insights</div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
              location.pathname === link.to
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
