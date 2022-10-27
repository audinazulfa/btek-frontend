import React from 'react';
import { useNavigate } from 'react-router-dom';
import http from '../helpers/http';

function EditProfile() {
  const navigate = useNavigate();
  const updateAction = async (e) => {
    try {
      e.preventDefault();
      const form = {
        fullName: e.target.fullName.value,
        birthDate: e.target.birthDate.value,
        picture: e.target.picture.value,
      };
      const encoded = new URLSearchParams(form);
      const { data } = await http().put('/profile', encoded.toString());
      window.localStorage.getItem('token', data.result.token);
      navigate('/profile');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={updateAction}>
      fullName :
      <br />
      <input type="text" name="fullName" />
      <br />
      birthDate :
      <br />
      <input type="text" name="birthDate" />
      <br />
      picture :
      <br />
      <input type="text" name="picture" />
      <br />
      <button type="submit">Save Profile</button>
    </form>
  );
}

export default EditProfile;
