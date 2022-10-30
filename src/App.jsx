import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import EditProfile from './pages/EditProfile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Home /></RequireAuth>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>,
  },
  {
    path: '/profile/edit',
    element: <RequireAuth><EditProfile /></RequireAuth>,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
