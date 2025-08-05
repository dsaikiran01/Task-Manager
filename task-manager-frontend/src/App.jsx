import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import UserTasks from './pages/UserTasks';
import { AuthProvider, AuthContext } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function RoleBasedRoute() {
  const { auth } = useContext(AuthContext);
  return auth.user.role === 'admin' ? <AdminPanel /> : <UserTasks />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                {/* <RoleBasedRoute /> */}
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
