import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import http from '../helpers/http';

YupPassword(Yup);

function Login() {
  const navigate = useNavigate();
  // const submitAction = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const form = {
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //     };
  //     const encoded = new URLSearchParams(form);
  //     const { data } = await http().post('/auth/login', encoded.toString());
  //     window.localStorage.setItem('token', data.result.token);
  //     navigate('/');
  //   } catch (err) {
  //     window.alert(err.response.data.message);
  //   }
  // };

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid'),
    password: Yup.string().password().required(),
  });

  const submitAction = async (values) => {
    try {
      const form = new URLSearchParams(values);
      const { data } = await http().post('/auth/login', form.toString());
      window.localStorage.setItem('token', data.result.token);
      navigate('/');
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };
  return (
    <div className="h-screen flex justify-center item-center">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={basicAuthSchema}
        onSubmit={submitAction}
      >
        {({ errors, touched }) => (
          <Form>
            <label htmlFor="email">Email</label>
            <Field className="input input-bordered w-full max-w-xs" type="text" name="email" />
            <br />
            {errors.email && touched.email ? (
              <div className="text-red-400">{errors.email}</div>
            ) : null}
            <br />
            <label htmlFor="password">Password</label>
            <Field className="input input-bordered w-full max-w-xs" type="password" name="password" />
            <br />
            {errors.password && touched.password ? (
              <div className="text-red-400">{errors.password}</div>
            ) : null}
            <button className="btn btn-primary block w-full" type="submit">Login</button>
          </Form>
        )}
      </Formik>
    </div>

  // <form onSubmit={submitAction}>
  //   <input type="email" name="email" />
  //   <br />
  //   <input type="password" name="password" />
  //   <br />
  //   <button type="submit">Go Login</button>
  // </form>
  );
}

export default Login;
