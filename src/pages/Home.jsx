import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as authAction from '../redux/reducers/auth';
import Button from '../components/Button';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch(authAction.handleReset());
    navigate('/login');
  };

  const profile = () => {
    navigate('/profile');
  };

  return (
    <div className="hero min-h-screen bg-green-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Hello!</h1>
          <p className="py-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          <button type="button" onClick={profile} className="btn btn-primary mx-1">Profile</button>
          <button type="button" onClick={logout} className="btn btn-primary btn-outline mx-1">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
