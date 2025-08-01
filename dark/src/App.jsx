
import { ThemeProvider } from "./context/theme.jsx";
import ThemeBtn from "./components/ThemeBtn.jsx";
import "./index.css";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300 bg-white text-black dark:bg-black dark:text-white">
        <h1 className="text-4xl font-bold mb-4">Tailwind Dark Mode Working!</h1>
        <ThemeBtn />
      </div>
    </ThemeProvider>
  );
}
