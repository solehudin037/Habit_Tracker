import React from 'react';
import { useAppContext } from '../context/AppContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useAppContext();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'habits', label: 'Habits', icon: '✅' },
    { id: 'tasks', label: 'Tugas Kuliah', icon: '📚' },
    { id: 'workout', label: 'Workout', icon: '💪' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Productivity<br/>Tracker</h2>
      </div>
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
