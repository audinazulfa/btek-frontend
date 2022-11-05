import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as profileAction from '../redux/asyncActions/profile';
import * as profileReducerAction from '../redux/reducers/profile';

function Profile() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.user);

  React.useEffect(() => {
    // getProfile();
    const token = window.localStorage.getItem('token');
    if (!userProfile?.fullName) {
      dispatch(profileAction.getDataUser({ token }));
    }
  }, []);

  return (
    <div className="hero min-h-screen bg-green-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Your Profile</h1>
          <div className="flex justify-center items-center">
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
          <button type="button" className="btn btn-primary mx-1 btn-outline" onClick={() => dispatch(profileReducerAction.resetProfile())}>Reset data Redux</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
