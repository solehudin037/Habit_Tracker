import React, { createContext, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State 1: Habits
  const [habits, setHabits] = useLocalStorage('productivity-habits', []);
  // format: { id, name, type (checkbox/count), target (if count), logs: { "YYYY-MM-DD": value/boolean } }

  // State 2: Tasks
  const [tasks, setTasks] = useLocalStorage('productivity-tasks', []);
  // format: { id, title, deadline, priority, status }

  // State 3: Workouts
  const [workouts, setWorkouts] = useLocalStorage('productivity-workouts', [
    { id: '1', name: 'Push Up', type: 'reps' },
    { id: '2', name: 'Sit Up', type: 'reps' },
    { id: '3', name: 'Squat', type: 'reps' },
    { id: '4', name: 'Plank', type: 'duration' },
  ]);
  // Custom exercises can be added here
  
  const [workoutLogs, setWorkoutLogs] = useLocalStorage('productivity-workout-logs', {});
  // format: { "YYYY-MM-DD": { exerciseId: value } }

  // App wide state
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, habits, tasks, workout, analytics

  const value = {
    habits, setHabits,
    tasks, setTasks,
    workouts, setWorkouts,
    workoutLogs, setWorkoutLogs,
    activeTab, setActiveTab
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
