import React from 'react';
import { useAppContext } from '../context/AppContext';

const Analytics = () => {
  const { habits, tasks, workoutLogs } = useAppContext();

  // Helper to get last 7 days
  const getLast7Days = () => {
    const days = [];
    for(let i=6; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();

  // Habit Analytics
  let totalHabitInstances = 0;
  let completedHabitInstances = 0;
  let bestHabit = { name: '-', streak: 0 };

  habits.forEach(habit => {
    let habitStreak = 0;
    last7Days.forEach(day => {
      totalHabitInstances++;
      if (habit.logs[day]) {
        if (habit.type === 'checkbox' || (habit.type === 'count' && habit.logs[day] >= habit.target)) {
          completedHabitInstances++;
          habitStreak++;
        }
      }
    });
    if (habitStreak > bestHabit.streak) {
      bestHabit = { name: habit.name, streak: habitStreak };
    }
  });

  const weeklyHabitCompletion = totalHabitInstances > 0 ? Math.round((completedHabitInstances / totalHabitInstances) * 100) : 0;

  // Insight Generator
  let insightText = "Start logging your habits and tasks to get insights!";
  if (weeklyHabitCompletion > 80) {
    insightText = "You are incredibly consistent this week. Keep the momentum going!";
  } else if (weeklyHabitCompletion > 50) {
    insightText = "Good progress! Try to hit a few more targets to reach your goals.";
  } else if (weeklyHabitCompletion > 0) {
    insightText = "You've started making progress. Consistency is key, don't give up!";
  }

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Your performance and consistency overview.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="card">
          <h3 className="text-sm font-semibold text-muted mb-2">Weekly Completion</h3>
          <div className="text-3xl font-bold text-green-600">{weeklyHabitCompletion}%</div>
          <p className="text-xs text-muted mt-2">Based on the last 7 days</p>
        </div>
        
        <div className="card">
          <h3 className="text-sm font-semibold text-muted mb-2">Most Consistent</h3>
          <div className="text-xl font-bold">{bestHabit.name}</div>
          <p className="text-xs text-muted mt-2">{bestHabit.streak} days this week</p>
        </div>

        <div className="card">
          <h3 className="text-sm font-semibold text-muted mb-2">Tasks Completed</h3>
          <div className="text-3xl font-bold text-blue-600">{tasks.filter(t => t.status === 'Done').length}</div>
          <p className="text-xs text-muted mt-2">All time</p>
        </div>
      </div>

      <div className="card mb-6 bg-green-50 border-green-200 border">
        <h3 className="text-green-800 font-semibold mb-2">💡 AI Insight</h3>
        <p className="text-green-900">{insightText}</p>
      </div>

      <div className="card">
        <h2 className="mb-4">Weekly Workout Activity</h2>
        <div className="flex items-end gap-2 h-40 mt-4">
          {last7Days.map(day => {
            const logs = workoutLogs[day] || {};
            const activeEx = Object.keys(logs).length;
            // Simple bar chart visualization
            const height = Math.min((activeEx * 20) + 10, 100); 
            const dStr = day.split('-')[2] + '/' + day.split('-')[1];

            return (
              <div key={day} className="flex-1 flex flex-col items-center justify-end gap-2">
                <div 
                  className="bg-blue-500 rounded-t w-full max-w-[40px] transition-all hover:bg-blue-600"
                  style={{ height: `${height}%`, opacity: activeEx > 0 ? 1 : 0.3 }}
                  title={`${activeEx} exercises logged`}
                ></div>
                <span className="text-xs text-muted">{dStr}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
