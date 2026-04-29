import { useAppContext } from "../context/AppContext";

export default function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <nav className="bottom-nav">

      <button
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => setActiveTab("dashboard")}
      >
        <span>🏠</span>
        <small>Home</small>
      </button>

      <button
        className={`nav-item ${activeTab === "habits" ? "active" : ""}`}
        onClick={() => setActiveTab("habits")}
      >
        <span>✅</span>
        <small>Habits</small>
      </button>

      <button
        className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
        onClick={() => setActiveTab("tasks")}
      >
        <span>📚</span>
        <small>Tugas</small>
      </button>

      <button
        className={`nav-item ${activeTab === "workout" ? "active" : ""}`}
        onClick={() => setActiveTab("workout")}
      >
        <span>💪</span>
        <small>Workout</small>
      </button>

    </nav>
  );
}