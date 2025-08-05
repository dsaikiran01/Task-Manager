import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const AdminPanel = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks').then(res => setTasks(res.data));
  }, []);

  return (
    <>
      <h2>Admin Panel – All Tasks</h2>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title} – {t.owner}</li>
        ))}
      </ul>
    </>
  );
};

export default AdminPanel;
