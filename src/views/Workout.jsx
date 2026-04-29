import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Workout = () => {
  const { workouts, setWorkouts, workoutLogs, setWorkoutLogs } = useAppContext();
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [newExercise, setNewExercise] = useState({ name: '', type: 'reps' });

  const [activeSession, setActiveSession] = useState(false);
  const [sessionExercises, setSessionExercises] = useState([]);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayLogs = workoutLogs[todayStr] || {};

  const handleAddExercise = (e) => {
    e.preventDefault();
    if (!newExercise.name) return;
    setWorkouts([...workouts, { ...newExercise, id: Date.now().toString() }]);
    setNewExercise({ name: '', type: 'reps' });
    setIsAddingExercise(false);
  };

  const logWorkout = (exerciseId, amount) => {
    const currentAmount = todayLogs[exerciseId] || 0;
    setWorkoutLogs({
      ...workoutLogs,
      [todayStr]: {
        ...todayLogs,
        [exerciseId]: currentAmount + amount
      }
    });
  };

  const toggleSessionExercise = (id) => {
    if (sessionExercises.includes(id)) {
      setSessionExercises(sessionExercises.filter(e => e !== id));
    } else {
      setSessionExercises([...sessionExercises, id]);
    }
  };

  const startSession = () => {
    setActiveSession(true);
  };

  const endSession = () => {
    setActiveSession(false);
    setSessionExercises([]);
  };

  // Stats
  const totalRepsToday = Object.keys(todayLogs).reduce((acc, key) => {
    const ex = workouts.find(w => w.id === key);
    return (ex && ex.type === 'reps') ? acc + todayLogs[key] : acc;
  }, 0);

  const totalDurationToday = Object.keys(todayLogs).reduce((acc, key) => {
    const ex = workouts.find(w => w.id === key);
    return (ex && ex.type === 'duration') ? acc + todayLogs[key] : acc;
  }, 0);

  return (
    <div className="animate-fade-in">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Workout Manager</h1>
          <p>Track your exercises and stay fit.</p>
        </div>
        {!activeSession && (
          <button className="btn btn-primary bg-blue-600 hover:bg-blue-700" onClick={startSession}>
            ▶ Start Session
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="card">
          <h3 className="text-sm font-semibold text-muted">Today's Reps</h3>
          <div className="text-3xl font-bold mt-2">{totalRepsToday}</div>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-muted">Today's Duration</h3>
          <div className="text-3xl font-bold mt-2">{totalDurationToday} <span className="text-sm font-normal">sec</span></div>
        </div>
      </div>

      {activeSession && (
        <div className="card mb-6 border-2" style={{ borderColor: '#3b82f6' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-blue-600">Active Workout Session</h2>
            <button className="btn btn-outline" onClick={endSession}>End Session</button>
          </div>
          
          <div className="mb-4">
            <p className="text-sm mb-2 font-semibold">Select Exercises for this Session:</p>
            <div className="flex gap-2 flex-wrap">
              {workouts.map(ex => (
                <button 
                  key={ex.id}
                  className={`btn ${sessionExercises.includes(ex.id) ? 'btn-primary bg-blue-600' : 'btn-outline'}`}
                  onClick={() => toggleSessionExercise(ex.id)}
                >
                  {ex.name}
                </button>
              ))}
            </div>
          </div>

          {sessionExercises.length > 0 && (
            <div className="flex flex-col gap-3 mt-6">
              <h3 className="text-sm font-semibold text-muted">Log your sets:</h3>
              {sessionExercises.map(id => {
                const ex = workouts.find(w => w.id === id);
                return (
                  <div key={id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-semibold">{ex.name}</h4>
                      <span className="text-xs text-muted">Today: {todayLogs[id] || 0} {ex.type === 'reps' ? 'reps' : 'sec'}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn btn-outline text-xs" onClick={() => logWorkout(ex.id, ex.type === 'reps' ? 10 : 30)}>
                        +{ex.type === 'reps' ? '10 reps' : '30 sec'}
                      </button>
                      <button className="btn btn-primary text-xs" onClick={() => logWorkout(ex.id, ex.type === 'reps' ? 20 : 60)}>
                        +{ex.type === 'reps' ? '20 reps' : '60 sec'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2>Exercise Library</h2>
        <button className="btn btn-outline text-sm" onClick={() => setIsAddingExercise(!isAddingExercise)}>
          {isAddingExercise ? 'Cancel' : '+ New Exercise'}
        </button>
      </div>

      {isAddingExercise && (
        <div className="card mb-4 animate-fade-in bg-gray-50">
          <form onSubmit={handleAddExercise} className="flex gap-4 items-end">
            <div className="input-group mb-0 flex-1">
              <label className="input-label">Exercise Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={newExercise.name}
                onChange={e => setNewExercise({...newExercise, name: e.target.value})}
                placeholder="e.g., Lunges"
                required
              />
            </div>
            <div className="input-group mb-0">
              <label className="input-label">Type</label>
              <select 
                className="input-field"
                value={newExercise.type}
                onChange={e => setNewExercise({...newExercise, type: e.target.value})}
              >
                <option value="reps">Reps (Number)</option>
                <option value="duration">Duration (Seconds)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {workouts.map(ex => (
          <div key={ex.id} className="card p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="mb-1">{ex.name}</h3>
                <span className="badge badge-gray">{ex.type}</span>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted">Today</div>
                <div className="font-bold text-lg">{todayLogs[ex.id] || 0}</div>
              </div>
            </div>
            
            {!activeSession && (
              <div className="flex gap-2 justify-end mt-4">
                <button className="btn btn-outline text-xs py-1" onClick={() => logWorkout(ex.id, 1)}>
                  +1 {ex.type === 'reps' ? 'rep' : 'sec'}
                </button>
                <button className="btn btn-outline text-xs py-1" onClick={() => logWorkout(ex.id, ex.type === 'reps' ? 10 : 30)}>
                  +{ex.type === 'reps' ? '10' : '30'} {ex.type === 'reps' ? 'reps' : 'sec'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workout;
