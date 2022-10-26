import React from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';

function Login() {
  const navigate = useNavigate();
  const submitAction = async (e) => {
    try {
      e.preventDefault();
      const form = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const encoded = new URLSearchParams(form);
      const { data } = await http().post('/auth/login', encoded.toString());
      window.localStorage.setItem('token', data.result.token);
      navigate('/');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={submitAction}>
      <input type="email" name="email" />
      <br />
      <input type="password" name="password" />
      <br />
      <button type="submit">Go Login</button>
    </form>
  );
}

export default Login;