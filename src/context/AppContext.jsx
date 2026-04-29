import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [habits, setHabits] = useLocalStorage('productivity-habits', []);
  const [tasks, setTasks] = useLocalStorage('productivity-tasks', []);
  
  const [workouts, setWorkouts] = useLocalStorage('productivity-workouts', [
    { id: '1', name: 'Push Up', type: 'reps' },
    { id: '2', name: 'Sit Up', type: 'reps' },
    { id: '3', name: 'Squat', type: 'reps' },
    { id: '4', name: 'Plank', type: 'duration' },
  ]);

  const [workoutLogs, setWorkoutLogs] = useLocalStorage('productivity-workout-logs', {});

  const [activeTab, setActiveTab] = useState('dashboard');

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