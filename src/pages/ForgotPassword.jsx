import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

function ForgotPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.forgotPassword(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/reset-password');
    }
  }, [store]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-teal-400">
          <div className="card-body">
            <h className="text-xl font-bold text-center">Forgot Password</h>
            <p className="text-center">Enter Your Email. There will be a confirmation code in your email.</p>
            <div className="form-control">
              <Formik
                initialValues={{
                  email: '',
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
                    <button type="submit" className="btn btn-primary block w-full bg-teal-600">Send code</button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
