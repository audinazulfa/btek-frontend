// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import http from '../helpers/http';

// function ForgotPassword() {
//   const navigate = useNavigate();
//   const forgotAction = async (e) => {
//     try {
//       e.preventDefault();
//       const email = e.target.email.value;
//       await http().post('/auth/forgot-password', email);
//       navigate('/reset-password');
//     } catch (err) {
//       window.alert(err.response.data.message);
//     }
//   };

//   return (
//     <form onSubmit={forgotAction}>

//       <input type="email" name="email" />
//       <br />
//       <button type="submit">Go Login</button>
//     </form>
//   );
// }

// export default Login;
