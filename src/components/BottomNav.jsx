import { useAppContext } from "../context/AppContext";
import { Home, CheckSquare, BookOpen, Dumbbell } from "lucide-react";

export default function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <nav className="bottom-nav">

      <button
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => setActiveTab("dashboard")}
      >
        <Home size={20} />
        <small>Home</small>
      </button>

      <button
        className={`nav-item ${activeTab === "habits" ? "active" : ""}`}
        onClick={() => setActiveTab("habits")}
      >
        <CheckSquare size={20} />
        <small>Habits</small>
      </button>

      <button
        className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
        onClick={() => setActiveTab("tasks")}
      >
        <BookOpen size={20} />
        <small>Tugas</small>
      </button>

      <button
        className={`nav-item ${activeTab === "workout" ? "active" : ""}`}
        onClick={() => setActiveTab("workout")}
      >
        <Dumbbell size={20} />
        <small>Workout</small>
      </button>

    </nav>
  );
}