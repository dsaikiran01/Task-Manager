import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const UserTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('/tasks').then(res => setTasks(res.data));
  }, []);

  return (
    <>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </>
  );
};

export default UserTasks;
