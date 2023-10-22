import React from 'react';
import CustomHead from '../components/common/head/Head';
import LoginLayout from '../components/common/layouts/LoginLayout';
import SignupContentArea from '../components/pages/authPage/SignupContentArea';

const SignUpPage = () => {
  return (
    <>
      <CustomHead title="Sign-Up" />
      <SignupContentArea />

    </>
  );
};

SignUpPage.Layout = LoginLayout;

export default SignUpPage;
