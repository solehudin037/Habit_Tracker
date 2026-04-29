import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Tasks = () => {
  const { tasks, setTasks } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', deadline: '', priority: 'Medium', status: 'Todo' });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    setTasks([...tasks, { ...newTask, id: Date.now().toString() }]);
    setNewTask({ title: '', deadline: '', priority: 'Medium', status: 'Todo' });
    setIsAdding(false);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const today = new Date().toISOString().split('T')[0];

  const getPriorityColor = (p) => {
    switch(p) {
      case 'High': return 'badge-red';
      case 'Medium': return 'badge-yellow';
      case 'Low': return 'badge-blue';
      default: return 'badge-gray';
    }
  };

  const renderTaskColumn = (statusName) => {
    const columnTasks = tasks.filter(t => t.status === statusName);
    return (
      <div className="flex-1 min-w-[250px]">
        <h3 className="mb-4 flex items-center justify-between">
          {statusName} <span className="badge badge-gray">{columnTasks.length}</span>
        </h3>
        <div className="flex flex-col gap-3">
          {columnTasks.map(task => {
            const isOverdue = task.deadline && task.deadline < today && task.status !== 'Done';
            return (
              <div key={task.id} className="card p-3 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h4 className={`text-md ${isOverdue ? 'text-red-500 font-bold' : ''}`}>{task.title}</h4>
                  <span className={`badge ${getPriorityColor(task.priority)} text-xs`}>{task.priority}</span>
                </div>
                {task.deadline && (
                  <div className={`text-xs mb-3 ${isOverdue ? 'text-red-500 font-bold' : 'text-muted'}`}>
                    📅 {task.deadline} {isOverdue && '(Overdue)'}
                  </div>
                )}
                <div className="flex justify-between mt-auto">
                  <select 
                    className="input-field p-1 text-xs w-auto" 
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  <button className="btn-icon" onClick={() => deleteTask(task.id)} title="Delete task">
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'Done').length;
  const progress = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="animate-fade-in">
      <div className="page-header flex justify-between items-center">
        <div>
          <h1>Tugas Kuliah</h1>
          <p>Manage your assignments and tasks.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : '+ Add Task'}
        </button>
      </div>

      <div className="card mb-6">
        <h3 className="mb-2 text-sm font-semibold text-muted">Overall Progress</h3>
        <div className="flex items-center gap-4">
          <div style={{ flex: 1, height: '8px', backgroundColor: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', backgroundColor: '#10b981', transition: 'width 0.3s ease' }}></div>
          </div>
          <span className="font-bold">{progress}%</span>
        </div>
      </div>

      {isAdding && (
        <div className="card mb-6 animate-fade-in">
          <form onSubmit={handleAddTask} className="grid grid-cols-4 gap-4 items-end">
            <div className="input-group mb-0 col-span-2">
              <label className="input-label">Task Title</label>
              <input 
                type="text" 
                className="input-field" 
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                placeholder="e.g., Math Assignment 3"
                required
              />
            </div>
            <div className="input-group mb-0">
              <label className="input-label">Deadline</label>
              <input 
                type="date" 
                className="input-field" 
                value={newTask.deadline}
                onChange={e => setNewTask({...newTask, deadline: e.target.value})}
              />
            </div>
            <div className="input-group mb-0">
              <label className="input-label">Priority</label>
              <select 
                className="input-field"
                value={newTask.priority}
                onChange={e => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-span-4 mt-2">
              <button type="submit" className="btn btn-primary">Save Task</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex gap-6 overflow-x-auto pb-4">
        {renderTaskColumn('Todo')}
        {renderTaskColumn('In Progress')}
        {renderTaskColumn('Done')}
      </div>
    </div>
  );
};

export default Tasks;
