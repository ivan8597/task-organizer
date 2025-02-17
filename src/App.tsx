import React, { useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import { Task } from './type';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import './styles/App.css';

function App() {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const queryClient = useQueryClient();

  const { data: initialTasks = [] } = useQuery<Task[]>('tasks', getTasks, {
    onSuccess: (data) => {
      setLocalTasks(data);
    }
  });

  const { mutate: addTaskMutation } = useMutation(
    addTask,
    {
      onMutate: async (newTask) => {
        const task = { ...newTask, id: Date.now() };
        setLocalTasks(prev => Array.isArray(prev) ? [...prev, task] : [task]);
      }
    }
  );

  const { mutate: deleteTaskMutation } = useMutation(
    deleteTask,
    {
      onMutate: async (deletedId) => {
        setLocalTasks(prev => Array.isArray(prev) ? prev.filter(task => task.id !== deletedId) : []);
      }
    }
  );

  const { mutate: updateTaskMutation } = useMutation(
    updateTask,
    {
      onMutate: async (updatedTask) => {
        setLocalTasks(prev => 
          Array.isArray(prev) ? prev.map(task => 
            task.id === updatedTask.id ? updatedTask : task
          ) : []
        );
        setEditingId(null);
      }
    }
  );

  const handleToggleTask = (task: Task) => {
    // Implementation of handleToggleTask
  };

  const handleStartEdit = (task: Task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const handleSaveEdit = (task: Task) => {
    if (editingText.trim()) {
      updateTaskMutation({
        ...task,
        title: editingText
      });
    }
  };

  return (
    <div className="container fade-in" style={{border: '2px solid red'}}>
      <h1 className="title">Task Organizer</h1>
      <div className="form-group">
        <input
          className="input"
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button 
          className="button"
          onClick={() => {
            if (newTask.trim()) {
              addTaskMutation({
                id: Date.now(),
                title: newTask,
                description: '',
                completed: false
              });
              setNewTask('');
            }
          }}
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {localTasks.map((task) => (
          <li key={task.id} className="task-card">
            {editingId === task.id ? (
              <>
                <input
                  className="input"
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button className="button" onClick={() => handleSaveEdit(task)}>Save</button>
                <button className="button button-secondary" onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span className={`status-badge ${task.completed ? 'status-completed' : 'status-pending'}`}>
                  {task.title}
                </span>
                <div style={{ marginTop: '10px' }}>
                  <button className="button" onClick={() => handleStartEdit(task)}>Edit</button>
                  <button 
                    className="button button-secondary" 
                    style={{ marginLeft: '10px' }}
                    onClick={() => deleteTaskMutation(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
