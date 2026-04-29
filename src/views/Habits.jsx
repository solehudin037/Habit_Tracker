import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Habits = () => {
  const { habits, setHabits } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [newHabit, setNewHabit] = useState({ name: '', type: 'checkbox', target: 1 });

  const todayStr = new Date().toISOString().split('T')[0];

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabit.name) return;
    const habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      type: newHabit.type,
      target: newHabit.target,
      logs: {}
    };
    setHabits([...habits, habit]);
    setNewHabit({ name: '', type: 'checkbox', target: 1 });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleLog = (habitId) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const currentLog = h.logs[todayStr];
        let newValue;
        if (h.type === 'checkbox') {
          newValue = !currentLog;
        } else {
          newValue = (currentLog || 0) + 1;
        }
        return { ...h, logs: { ...h.logs, [todayStr]: newValue } };
      }
      return h;
    }));
  };

  const generateHeatmap = (habit) => {
    // Generate last 30 days
    const days = [];
    for(let i=29; i>=0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      days.push(ds);
    }

    return (
      <div className="flex gap-1 mt-2">
        {days.map(d => {
          const val = habit.logs[d];
          let intensityClass = 'bg-gray-200';
          if (val) {
            if (habit.type === 'checkbox') {
              intensityClass = 'bg-green-500';
            } else {
              const ratio = val / habit.target;
              if (ratio >= 1) intensityClass = 'bg-green-600';
              else if (ratio >= 0.5) intensityClass = 'bg-green-400';
              else intensityClass = 'bg-green-200';
            }
          }
          return (
            <div 
              key={d} 
              title={`${d}: ${val || 0}`}
              style={{ width: '12px', height: '12px', borderRadius: '2px' }}
              className={intensityClass.replace('bg-gray-200', 'bg-gray-200')} // Placeholder for actual color classes
              style={{
                backgroundColor: intensityClass.includes('green-600') ? '#059669' :
                                 intensityClass.includes('green-500') ? '#10b981' :
                                 intensityClass.includes('green-400') ? '#34d399' :
                                 intensityClass.includes('green-200') ? '#a7f3d0' : '#e5e7eb',
                width: '14px', height: '14px', borderRadius: '3px'
              }}
            />
          )
        })}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Habits</h1>
          <p>Track your daily habits and build consistency.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add Habit'}
        </button>
      </div>

      {isAdding && (
        <div className="card mb-4 animate-fade-in">
          <form onSubmit={handleAddHabit} className="flex gap-4 items-end">
            <div className="input-group mb-0 flex-1">
              <label className="input-label">Habit Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={newHabit.name}
                onChange={e => setNewHabit({...newHabit, name: e.target.value})}
                placeholder="e.g., Read 10 pages"
                required
              />
            </div>
            <div className="input-group mb-0">
              <label className="input-label">Type</label>
              <select 
                className="input-field"
                value={newHabit.type}
                onChange={e => setNewHabit({...newHabit, type: e.target.value})}
              >
                <option value="checkbox">Checkbox (Done/Not Done)</option>
                <option value="count">Count (Target Number)</option>
              </select>
            </div>
            {newHabit.type === 'count' && (
              <div className="input-group mb-0">
                <label className="input-label">Target</label>
                <input 
                  type="number" 
                  className="input-field" 
                  style={{width: '100px'}}
                  value={newHabit.target}
                  onChange={e => setNewHabit({...newHabit, target: parseInt(e.target.value)})}
                  min="1"
                />
              </div>
            )}
            <button type="submit" className="btn btn-primary">Save</button>
          </form>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {habits.length === 0 ? (
          <div className="text-center p-8 text-muted border border-dashed rounded">
            No habits yet. Add one to get started!
          </div>
        ) : (
          habits.map(habit => {
            const todayLog = habit.logs[todayStr];
            let progress = 0;
            if (habit.type === 'checkbox') progress = todayLog ? 100 : 0;
            else progress = Math.min(((todayLog || 0) / habit.target) * 100, 100);

            return (
              <div key={habit.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="mb-1">{habit.name}</h3>
                    <div className="text-sm text-muted">Type: {habit.type} {habit.type === 'count' && `(Target: ${habit.target})`}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-primary" onClick={() => toggleLog(habit.id)}>
                      {habit.type === 'checkbox' ? (todayLog ? 'Completed ✅' : 'Mark Done') : `Log +1 (${todayLog || 0})`}
                    </button>
                    <button className="btn btn-outline" onClick={() => handleDelete(habit.id)}>Delete</button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Daily Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <div style={{ width: '100%', height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#10b981', transition: 'width 0.3s ease' }}></div>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-xs font-semibold text-muted mb-2 block">30-Day Activity Heatmap</span>
                  {generateHeatmap(habit)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Habits;
