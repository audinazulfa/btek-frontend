import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RequireAuth from './components/RequireAuth';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

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
    path: '/profile',
    element: <RequireAuth><Profile /></RequireAuth>,
  },
]);

export function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
