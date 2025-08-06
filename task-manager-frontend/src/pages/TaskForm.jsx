import React, { useState } from 'react';
import axios from '../api/axios';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/tasks', { title });
      setTitle('');
      setStatus('success');
      setTimeout(() => setStatus('idle'), 1000);
      if (onTaskAdded) onTaskAdded(); // Refresh tasks
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a Task</h3>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <button type="submit">Add Task</button>
      {status === 'success' && <span>✔️ Task created!</span>}
      {status === 'error' && <span>❌ Error creating task</span>}
    </form>
  );
};

export default TaskForm;
