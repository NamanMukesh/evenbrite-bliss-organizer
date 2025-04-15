
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Helmet } from 'react-helmet';

const Login = () => {
  return (
    <>
      <Helmet>
        <title>Login - Eventify</title>
      </Helmet>
      <AuthForm type="login" />
    </>
  );
};

export default Login;
