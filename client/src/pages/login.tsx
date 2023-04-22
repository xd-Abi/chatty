import React from 'react';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginInterface {
  email: string;
  password: string;
}

export default function Login() {
  const formik = useFormik<LoginInterface>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <React.Fragment>
      <Head>
        <title>Login - Chatty</title>
      </Head>
      <main className="h-screen bg-white flex justify-center items-center">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <p className="text-center text-slate-800 text-3xl font-bold tracking-tight">
              Log in to your Account 💫
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              <div className="relative mt-2 shadow-sm">
                <label className="block text-sm font-medium leading-6 text-slate-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-transparent px-3 py-2 border text-slate-800 border-slate-500 placeholder:text-slate-500 flex min-w-full rounded-md focus:outline-none"
                  placeholder="Email Address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email !== '' && (
                  <p className="block text-sm font-medium leading-6 text-red-500 mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="relative shadow-sm">
                <label className="block text-sm font-medium leading-6 text-slate-500 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-transparent px-3 py-2 border text-slate-800 border-slate-500 placeholder:text-slate-500 flex min-w-full rounded-md focus:outline-none"
                  placeholder="Your Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password !== '' && (
                  <p className="block text-sm font-medium leading-6 text-red-500 mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <button className="bg-black px-3 py-3 border border-black text-slate-50 font-medium min-w-full mt-3 rounded-md hover:bg-transparent hover:text-black">
                Continue
              </button>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              No account yet?{' '}
              <a className="font-semibold leading-6 text-sky-600 cursor-pointer">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
