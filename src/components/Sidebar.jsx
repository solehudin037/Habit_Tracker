import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Home, CheckSquare, BookOpen, Dumbbell, BarChart } from "lucide-react";

const Sidebar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
  { id: 'habits', label: 'Habits', icon: <CheckSquare size={18} /> },
  { id: 'tasks', label: 'Tugas Kuliah', icon: <BookOpen size={18} /> },
  { id: 'workout', label: 'Workout', icon: <Dumbbell size={18} /> },
  { id: 'analytics', label: 'Analytics', icon: <BarChart size={18} /> },
];

  // ✅ Load theme sekali saat awal
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  // ✅ Toggle theme
  const toggleTheme = () => {
    document.body.classList.toggle("dark");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark") ? "dark" : "light"
    );
  };

  return (
    <aside className="sidebar">
      
      {/* HEADER */}
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <div className="logo-text">
            <span>Productivity</span>
            <strong>Tracker</strong>
          </div>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          🌙
        </button>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
};

export default Sidebar;