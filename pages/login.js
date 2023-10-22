import React from 'react';
import CustomHead from '../components/common/head/Head';
import LoginLayout from '../components/common/layouts/LoginLayout';
import SigninContentArea from '../components/pages/authPage/SigninContentArea';
import { useRouter } from 'next/router';
import axios from 'axios'

const LoginPage = () => {
  
  return (
    <>
      <CustomHead title="Login" />
      <SigninContentArea />
    </>
  );
};

LoginPage.Layout = LoginLayout;

export default LoginPage;
