
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Helmet } from 'react-helmet';

const Signup = () => {
  return (
    <>
      <Helmet>
        <title>Sign Up - Eventify</title>
      </Helmet>
      <AuthForm type="signup" />
    </>
  );
};

export default Signup;
