import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Habits from './views/Habits';
import Tasks from './views/Tasks';
import Workout from './views/Workout';
import Analytics from './views/Analytics';
import BottomNav from './components/BottomNav';
import './App.css';

/* ================= APP CONTENT ================= */
const AppContent = () => {
  const { activeTab } = useAppContext();

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'habits':
        return <Habits />;
      case 'tasks':
        return <Tasks />;
      case 'workout':
        return <Workout />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      
      {/* SIDEBAR (DESKTOP) */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="main-content">
        {renderView()}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <BottomNav />

    </div>
  );
};

/* ================= ROOT APP ================= */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;