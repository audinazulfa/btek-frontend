import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import http from '../helpers/http';

import * as profileAction from '../redux/asyncActions/profile';

function EditProfile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.user);
  // const [userProfile, setUserProfile] = React.useState({});
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token');
  //   const { data } = await http(token).get('/profile');
  //   setUserProfile(data.result);
  // };

  // const saveData = async (e) => {
  //   e.preventDefault();
  //   const token = window.localStorage.getItem('token');

  // const form = new FormData();
  // form.append('fullName', e.target.fullName.value);
  // form.append('birthDate', e.target.birthDate.value);
  // form.append('picture', e.target.picture.files[0]);

  // const { data } = await http(token).put('/profile', form, {
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // });
  //   setUserProfile(data.results);
  //   window.alert('Update data success');
  // };

  const saveData = (e) => {
    e.preventDefault();
    const token = window.localStorage.getItem('token');
    const data = {
      fullName: e.target.fullName.value,
      birthDate: e.target.birthDat.value,
      picture: e.target.picture.file[0],
    };
    dispatch(profileAction.editData({ token, data }));
  };

  React.useEffect(() => {
    // getProfile();
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <>
      {userProfile?.picture && <img style={{ width: '250px', height: '100%' }} src={`http://localhost:8888/assets/uploads/${userProfile?.picture}`} alt={userProfile?.fullName} />}
      <form onSubmit={saveData}>
        <div>
          Full Name:
          <br />
          <input type="text" name="fullName" defaultValue={userProfile?.fullName} />
        </div>
        <div>
          Birthdate:
          <br />
          <input type="text" name="birthDate" defaultValue={userProfile?.birthDate} />
        </div>
        <div>
          Picture:
          <br />
          <input type="file" name="picture" />
        </div>
        <Link to="/profile/edit">Edit Profile</Link>
      </form>
      <Link to="/profile">Go to Profile Page</Link>
    </>
  );
}

export default EditProfile;
