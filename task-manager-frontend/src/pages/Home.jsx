import React from 'react';
import TaskForm from './TaskForm';
import AdminPanel from './AdminPanel';
import UserTasks from './UserTasks';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const Home = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <h1>Welcome, {auth.user.username}</h1>
      <TaskForm />
      {auth.user.role === 'admin' ? <AdminPanel /> : <UserTasks />}
    </>
  );
};

export default Home;
