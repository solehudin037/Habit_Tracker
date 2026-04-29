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

const AppContent = () => {
  const { activeTab } = useAppContext();

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'habits': return <Habits />;
      case 'tasks': return <Tasks />;
      case 'workout': return <Workout />;
      case 'analytics': return <Analytics />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />

      <main className="main-content">
        {renderView()}
      </main>

      <BottomNav />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;