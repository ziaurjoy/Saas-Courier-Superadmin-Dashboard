import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Image from "next/image";
import image3 from '../../../public/assets/icon/login.jpg';
import logo1 from '../../../public/images/logo.png';
import Link from 'next/link';
import AuthService from '../../../services/api/auth.service';
import axios from 'axios';

import { Button, Form, Input, Alert, Space } from 'antd';

function SigninContentArea() {

  const router = useRouter();
  const [error, setError] = useState()
  const [loadings, setLoadings] = useState([]);
  


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
    return AuthService.signIn(values)
      .then((data) => {
        if (data?.msg == 'Login Success') {

          localStorage.setItem('token', data?.token?.access);
          localStorage.setItem('refresh', data?.token?.refresh);

          AuthService.getUser()
            .then(
              (data) => {
                if (data?.is_superadmin === true) {
                  router.push('/dashboard');
                  enterLoading(false)
                }
                else {
                  setError('Sorry Your are Not Supper Admin')
                  // router.push('/information');
                  enterLoading(false)
                }
              },
            )
        }
      },
        (error) => {
          setError(error?.response?.data?.errors?.non_field_errors || 'Something went wrong')
          enterLoading(false)
          return false;
        }
      )

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    const userToken = searchParams.get('user_token')

    if (userToken) {
      userActivate(userToken)
    }

  }, [])

  const userActivate = async (userToken) => {
    axios.get(`http://localhost:8000/api/user/confirm/${userToken}`)
      .then((res) => {
        console.log('Activate')
      })
      .catch(err => console.log('error'))
  }


  return <>
    <div className="container signin-content-area">
      <div className="row from-content flex-row-reverse">
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
              height={300}
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
              <h2>login your account</h2>
              <p>
                need an account ?
                <Link href="/signup" legacyBehavior>
                  <span> register now</span>
                </Link>
              </p>
            </div>



            {error && (
              <>

                <Space
                  direction="vertical"
                  style={{
                    width: '80%',
                    margin: '10px'
                  }}
                ></Space>
                <Alert
                  message="Error"
                  description={error}
                  type="error"
                  closable
                // onClose={onClose}
                />

              </>
            )
            }

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

export default SigninContentArea;
