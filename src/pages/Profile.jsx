import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as profileAction from '../redux/asyncActions/profile';
import * as profileReducerAction from '../redux/reducers/profile';

function Profile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.user);
  // const [userProfile, setUserProfile] = React.useState({});
  // const getProfile = async () => {
  //   const token = window.localStorage.getItem('token');
  //   const { data } = await http(token).get('/profile');
  //   setUserProfile(data.result);
  // };

  React.useEffect(() => {
    // getProfile();
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <div>
      <div>
        Full Name:
        {' '}
        {userProfile?.fullName}
      </div>
      <div>
        Birthdate:
        {' '}
        {userProfile?.birthDate}
      </div>
      <div>
        Picture:
        {' '}
        {userProfile?.picture}
      </div>
      <Link to="/profile/edit">Edit Profile</Link>
      <br />
      <button onClick={() => dispatch(profileReducerAction.resetProfile())}>Reset data Redux</button>
    </div>
  );
}

export default Profile;
