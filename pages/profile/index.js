import React, { useState, useEffect } from 'react';

import { Row, Col, Upload, Button, Space, Card, Checkbox, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import toast, { Toaster } from 'react-hot-toast'

import { apiUrl } from '../../services/api/apiUrls';
import { BaseApiUrl } from '../../config/config';
import { authApi } from '../../services/interceptor/auth.interceptor';

import DashboardLayout from '../../components/common/layouts/DashboardLayout';
import SwalAlert from '../../components/SwalAlert/SwalAlert';



const Tanents = () => {

  const [form] = Form.useForm()
  const [profileData, setProfileData] = useState()
  const [profilePicture, setProfilePicture] = useState()


  const fetchProfileData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.getUser)
      .then((res) => {
        setProfileData(res?.data)
      })
      .catch(err => console.log(err))
  }



  const onFinish = (values) => {

    let formData = new FormData()

    formData.append('name', values?.name)
    if (profilePicture) {
      formData.append('profile_picture', profilePicture)
    }

    return authApi.patch(BaseApiUrl + apiUrl.updateProfile + 2 + '/', formData)
      .then((res) => {
        SwalAlert("Profile Update")
        toast.success('Profile Update')
      })
      .catch(err => toast.error('Profile Update Failed'))
  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      return e
    }
    setProfilePicture(e?.fileList[0].originFileObj)
    return e?.fileList
  }


  useEffect(() => {
    fetchProfileData()
  }, [])


  useEffect(() => {
    if (profileData) {
      form.setFieldValue("name", profileData?.name)
    }
  }, [profileData])


  return <>

    <Toaster
      position="top-right"
      reverseOrder={false}
    />

    <Row gutter={16}>
      <Col span={8}>
        <Card
          hoverable
          style={{
            width: 300,
          }}
        >
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
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Profile Photo" valuePropName="fileList" name='profile_picture' getValueFromEvent={normFile}>

              <Upload listType="picture-card">
                <div>
                  <PlusOutlined />
                  {/* <div style={{ marginTop: 8 }}>Upload</div> */}
                  <div>Upload</div>
                </div>
              </Upload>

            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        </Card>
      </Col>
    </Row>
  </>;
};
Tanents.Layout = DashboardLayout;
export default Tanents;
