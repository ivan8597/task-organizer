import React, { useState } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from './api';
import { Task } from './type';
import { useQuery, useMutation, useQueryClient } from 'react-query';




function App() {
  const [localTasks, setLocalTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const queryClient = useQueryClient();

  const { data: initialTasks = [] } = useQuery<Task[]>('tasks', getTasks, {
    onSuccess: (data) => {
      if (localTasks.length === 0) {
        setLocalTasks(data);
      }
    }
  });

  const { mutate: addTaskMutation } = useMutation(
    addTask,
    {
      onMutate: async (newTask) => {
        const task = { ...newTask, id: Date.now() };
        setLocalTasks(prev => [...prev, task]);
      }
    }
  );

  const { mutate: deleteTaskMutation } = useMutation(
    deleteTask,
    {
      onMutate: async (deletedId) => {
        setLocalTasks(prev => prev.filter(task => task.id !== deletedId));
      }
    }
  );

  const { mutate: updateTaskMutation } = useMutation(
    updateTask,
    {
      onMutate: async (updatedTask) => {
        setLocalTasks(prev => 
          prev.map(task => 
            task.id === updatedTask.id ? updatedTask : task
          )
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
    <div>
      <h1>Task Organizer</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={() => {
          if (newTask.trim()) {
            addTaskMutation({
              id: Date.now(),
              title: newTask,
              description: '',
              completed: false
            });
            setNewTask('');
          }
        }}>Add Task</button>
      </div>
      <ul>
        {localTasks.map((task) => (
          <li key={task.id}>
            {editingId === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => handleSaveEdit(task)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <button onClick={() => handleStartEdit(task)}>Edit</button>
                <button onClick={() => deleteTaskMutation(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
