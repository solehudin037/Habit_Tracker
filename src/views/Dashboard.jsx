import React from 'react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { habits, tasks, workouts, workoutLogs } = useAppContext();

  // Calculate some dummy/real stats based on data
  const todayStr = new Date().toISOString().split('T')[0];
  
  const habitsCompletedToday = habits.filter(h => h.logs?.[todayStr]).length;
  const habitProgress = habits.length > 0 ? Math.round((habitsCompletedToday / habits.length) * 100) : 0;

  const tasksCompleted = tasks.filter(t => t.status === 'Done').length;
  const taskProgress = tasks.length > 0 ? Math.round((tasksCompleted / tasks.length) * 100) : 0;

  const todayWorkoutLogs = workoutLogs[todayStr] || {};
  const totalRepsToday = Object.keys(todayWorkoutLogs).reduce((acc, key) => {
    const exercise = workouts.find(w => w.id === key);
    if (exercise?.type === 'reps') {
      return acc + todayWorkoutLogs[key];
    }
    return acc;
  }, 0);

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your productivity overview.</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="card">
          <h3>Habits Today</h3>
          <div className="text-2xl font-bold mt-2">{habitProgress}%</div>
          <p className="text-sm mt-1">{habitsCompletedToday} / {habits.length} completed</p>
        </div>
        
        <div className="card">
          <h3>Current Streak</h3>
          <div className="text-2xl font-bold mt-2 text-green-500">🔥 3 Days</div>
          <p className="text-sm mt-1">Keep it up!</p>
        </div>

        <div className="card">
          <h3>Workout Activity</h3>
          <div className="text-2xl font-bold mt-2">{totalRepsToday} Reps</div>
          <p className="text-sm mt-1">Logged today</p>
        </div>

        <div className="card">
          <h3>Task Progress</h3>
          <div className="text-2xl font-bold mt-2">{taskProgress}%</div>
          <p className="text-sm mt-1">{tasksCompleted} / {tasks.length} tasks done</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="card">
          <h2>Recent Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 mt-4">
              {tasks.slice(0, 3).map(task => (
                <li key={task.id} className="flex justify-between items-center p-2 border rounded">
                  <span>{task.title}</span>
                  <span className={`badge ${task.status === 'Done' ? 'badge-green' : 'badge-yellow'}`}>{task.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="card">
          <h2>Today's Habits</h2>
          {habits.length === 0 ? (
            <p>No habits added yet.</p>
          ) : (
            <ul className="flex flex-col gap-2 mt-4">
              {habits.slice(0, 3).map(habit => (
                <li key={habit.id} className="flex justify-between items-center p-2 border rounded">
                  <span>{habit.name}</span>
                  <span className="text-sm">{habit.logs?.[todayStr] ? '✅' : '⏳'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
