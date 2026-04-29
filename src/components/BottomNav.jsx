import { useAppContext } from "../context/AppContext";

export default function BottomNav() {
  const { activeTab, setActiveTab } = useAppContext();

  return (
    <nav className="bottom-nav">

      <button
        className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
        onClick={() => setActiveTab("dashboard")}
      >
        🏠
        <small>Home</small>
      </button>

      <button
        className={`nav-item ${activeTab === "habits" ? "active" : ""}`}
        onClick={() => setActiveTab("habits")}
      >
        ✅
        <small>Habits</small>
      </button>

      <button
        className={`nav-item ${activeTab === "tasks" ? "active" : ""}`}
        onClick={() => setActiveTab("tasks")}
      >
        📚
        <small>Tugas</small>
      </button>

      <button
        className={`nav-item ${activeTab === "workout" ? "active" : ""}`}
        onClick={() => setActiveTab("workout")}
      >
        💪
        <small>Workout</small>
      </button>

    </nav>
  );
}