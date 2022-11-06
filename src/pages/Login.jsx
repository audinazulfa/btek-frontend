import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import * as authAction from '../redux/asyncActions/auth';

YupPassword(Yup);

function Login() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.login(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.token) {
      window.localStorage.setItem('token', store.user.token);
      navigate('/');
    }
  }, [store]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center lg:text-center">
            <h1 className="text-4xl font-bold">Hello!</h1>
            <p className="py-2">Sign into Your account!</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-teal-400">
            <div className="card-body">
              <div className="form-control">
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
                      <label className="font-semibold text-md m-2" htmlFor="email">Email</label>
                      <Field className="input input-bordered w-full max-w-xs" type="email" name="email" placeholder="Email" />
                      <br />
                      {errors.email && touched.email ? (
                        <div className="text-red-400">{errors.email}</div>
                      ) : null}
                      <br />
                      <label className="font-semibold text-md m-2" htmlFor="password">Password</label>
                      <Field className="input input-bordered w-full max-w-xs" type="password" name="password" placeholder="Password" />
                      <br />
                      {errors.password && touched.password ? (
                        <div className="text-red-400">{errors.password}</div>
                      ) : null}
                      <br />
                      <button className="btn btn-primary block w-full font-bold" type="submit">Login</button>
                      <Link className="link text-sm hover:text-primary text-sm text-black" to="/forgot-password">Forgot Password?</Link>
                      <br />
                      <p className="text-sm m-2 p-3 text-center">
                        Don't have an account?
                        <Link className="link text-sm hover:text-primary" to="/register">Sign Up</Link>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
