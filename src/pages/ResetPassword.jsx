import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import * as authAction from '../redux/asyncActions/auth';
import * as authReset from '../redux/reducers/auth';

YupPassword(Yup);

function ResetPassword() {
  const navigate = useNavigate();

  const basicAuthSchema = Yup.object().shape({
    email: Yup.string().email('Email is not valid').required(),
    code: Yup.number().min(6).required(),
    newPassword: Yup.string().password().required(),
  });

  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (values) => {
    try {
      dispatch(authAction.resetPassword(values));
    } catch (err) {
      window.alert(err.response.data.message);
    }
  };

  React.useEffect(() => {
    if (store.user.email) {
      dispatch(authReset.handleReset());
      navigate('/login');
    }
  }, [store]);

  return (
    <div className="grid grid-cols-6 gap-4">
      <div className="h-screen flex justify-center items-center col-start-2 col-span-4">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-teal-400">
          <div className="card-body">
            <h className="text-xl text-center font-bold">Reset Password</h>
            <p className="text-center text-sm">Enter The Confirmation Code.</p>
            <div className="form-control">
              <Formik
                initialValues={{
                  email: '',
                  code: '',
                  newPassword: '',
                  confirmPassword: '',
                }}
                validationSchema={basicAuthSchema}
                onSubmit={submitAction}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field type="text" name="code" className="input input-bordered w-full max-w-xs text-md" placeholder="Confirmation Code" />
                    <br />
                    {errors.code && touched.code ? (
                      <div className="text-red-400">{errors.code}</div>
                    ) : null}
                    <br />
                    <Field type="text" name="email" className="input input-bordered w-full max-w-xs text-md" placeholder="Your Email" />
                    <br />
                    {errors.email && touched.email ? (
                      <div className="text-red-400">{errors.email}</div>
                    ) : null}
                    <br />
                    <Field type="password" name="newPassword" className="input input-bordered w-full max-w-xs text-md" placeholder="New Password" />
                    <br />
                    {errors.newPassword && touched.newPassword ? (
                      <div className="text-red-400">{errors.newPassword}</div>
                    ) : null}
                    <br />
                    <Field type="password" name="confirmPassword" className="input input-bordered w-full max-w-xs text-md" placeholder="Confirm Password" />
                    <br />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="text-red-400">{errors.confirmPassword}</div>
                    ) : null}
                    <br />
                    <button type="submit" className="btn btn-primary block w-full bg-teal-600">save changes</button>
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

export default ResetPassword;
