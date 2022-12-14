import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function Register() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    password: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.register(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.token) {
      dispatch(authReset.handleReset());
      navigate('/login');
    }
  }, [store]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="hero-content flex-col lg:flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">Login Now!</h1>
            <p className="py-2">Create your account now!</p>
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
                      <Field className="input input-bordered w-full max-w-xs" type="email" name="email" placeholder="Email" />
                      <br />
                      {errors.email && touched.email ? (
                        <div className="text-red-400">{errors.email}</div>
                      ) : null}
                      <br />
                      <Field className="input input-bordered w-full max-w-xs" type="password" name="password" placeholder="Password" />
                      <br />
                      {errors.password && touched.password ? (
                        <div className="text-red-400">{errors.password}</div>
                      ) : null}
                      <br />
                      <button className="btn btn-primary block w-full" type="submit">Submit</button>
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

export default Register;
