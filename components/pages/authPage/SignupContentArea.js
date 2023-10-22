
import React, { useState } from 'react';
import Image from "next/image";
import image3 from '../../../public/assets/icon/joinus.jpg';
import logo1 from '../../../public/images/logo.png';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthService from "../../../services/api/auth.service"

import { Button, Form, Input, Space } from 'antd';

function SignupContentArea() {
  const router = useRouter();
  const [loadings, setLoadings] = useState([]);
  const [RegistrationMessage, setRegistrationMessage] = useState();
  const [error, setError] = useState()


  const enterLoading = (index) => {
    if (index === true) {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[1] = true;
        return newLoadings;
      });
    } else {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[1] = false;
        return newLoadings;
      });
    }
  };


  const onFinish = (values) => {
    enterLoading(true)
    return AuthService.register(values)
      .then((responseData) => {
        if (responseData?.status === 201) {
          // router.push('/login');
          setRegistrationMessage('Please Check Your Email')
          enterLoading(false)
        }
      })

  };
  const onFinishFailed = (errorInfo) => {
    setError(errorInfo)
    console.log('Failed:', errorInfo);
  };


  return <>
    <div className="container signup-content-area">
      <div className="row from-content">
        <div className="col-lg-6 image-area">
          <div className="image-area-logo-wrapper">
            <Image
              src={logo1}
              alt=""
              style={{
                maxWidth: "100%",
                height: "auto",
                maxWidth: "100%",
                height: "auto"
              }} />
            
          </div>
          <div className="form-image-wrapper">
            <Image
              src={image3}
              alt=""
              width={500}
              height={350}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
                objectPosition: "center",
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
          <div className="image-area-desc">
            <h6>Buy and Sell Easy Only at This Site</h6>
            <p>Login and feel the ease of doing transactions on This Site</p>
            <Link href="/">
              Go To Homepage
            </Link>
          </div>
        </div>
        <div className="col-lg-6 form-area">
          <div className="from-area-wrapper">
            <div className="form-title">
              <h2>create an account</h2>
              <p>
                Already have an account ?
                <Link href="/login" legacyBehavior>
                  <span> Log In</span>
                </Link>
              </p>
              {RegistrationMessage ? <h4 style={{color: 'green'}}>{RegistrationMessage}</h4> : null}
            </div>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <Form
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Full Name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={'email'}
                label="Email"
                rules={[
                  {
                    type: 'email',
                    required: true
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Confirm password"
                name="password2"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Confirm password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadings[1]}>
                  Submit
                </Button>

              </Form.Item>
            </Form>

          </div>
        </div>
      </div>
    </div>
  </>;
}

export default SignupContentArea;
