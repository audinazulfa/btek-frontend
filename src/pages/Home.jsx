import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

import button from '../components/Button';

function Home() {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      Home &middot;
      {/* <Link to="/character">Go to Character List</Link> */}
      <Link to="/profile">Profile</Link>
      <button type="button" onClick={logout}>Logout</button>
      <Button>OK</Button>
    </div>
  );
}

export default Home;
