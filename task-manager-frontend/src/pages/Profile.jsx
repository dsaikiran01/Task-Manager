import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import axios from '../api/axios';

const Profile = () => {
  const { auth } = useContext(AuthContext);
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/tasks');
        setTaskCount(res.data.length);
      } catch (err) {
        console.error('Failed to fetch tasks');
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>
      <p><strong>Username:</strong> {auth.user.username}</p>
      <p><strong>Role:</strong> {auth.user.role}</p>
      <p><strong>Tasks:</strong> {taskCount}</p>
    </div>
  );
};

export default Profile;
