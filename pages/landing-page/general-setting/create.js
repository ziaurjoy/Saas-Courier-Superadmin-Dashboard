import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../components/common/layouts/DashboardLayout';

import { Button, Form, Input, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../components/SwalAlert/SwalAlert';
import { authApi } from '../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../config/config';
import { apiUrl } from '../../../services/api/apiUrls';



const CreateStep = () => {
  const { TextArea } = Input;
  const router = useRouter();

  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  const onSubmit = async (values) => {

    const formData = new FormData();
    formData.append("name", values?.name);
    formData.append("email", values?.email);
    formData.append("phone", values?.phone);
    formData.append("address", values?.address);

    if (values?.facebook) {
      formData.append("facebook", values?.facebook);
    }
    if (values?.instagram) {
      formData.append("instagram", values?.instagram);
    }
    if (values?.twitter) {
      formData.append("twitter", values?.twitter);
    }
    if (values?.linkedin) {
      formData.append("linkedin", values?.linkedin);
    }
    if (values?.logo) {
      formData.append("logo", values?.logo[0].originFileObj);
    }
  
    await authApi.post(BaseApiUrl + apiUrl.generalSetting, formData).then((response) => {
      SwalAlert('General Setting Created')
      router.push('/landing-page/general-setting')
      toast.success('General Setting Created')
    }).catch((err) => {
      toast.error(`General Setting Already Created`)
    })

  };

  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Create General Setting </h3>
          </div>
          <hr></hr>
        </CardBody>
        <Form
          name="basic"
          style={{
            maxWidth: "100",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          encType='multipart/form-data'
          autoComplete="off"
        >

          <Form.Item
            label="Company Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input Company name ..!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input company email!',
              },
            ]}
          >
            <Input type='email' />
          </Form.Item>

          <Form.Item
            label="Company Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input company phone number!',
              },
            ]}
          >
            <Input type='number' />
          </Form.Item>

          <Form.Item
            label="Company Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input company address!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item
            label="Facebook Link"
            name="facebook"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Instagram Link"
            name="instagram"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Twitter Link"
            name="twitter"
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Linkedin Link"
            name="linkedin"
          >
            <Input />
          </Form.Item>

          

          <Form.Item label="Logo" valuePropName="fileList" name='logo' getValueFromEvent={normFile}>
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>


          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>

  </>;
};
CreateStep.Layout = DashboardLayout;
export default CreateStep;
