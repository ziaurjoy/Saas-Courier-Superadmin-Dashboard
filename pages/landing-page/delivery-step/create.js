import React from 'react';
import { useRouter } from 'next/router';

import toast, { Toaster } from 'react-hot-toast'
import { Button, Form, Input, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"


import SwalAlert from '../../../components/SwalAlert/SwalAlert';
import DashboardLayout from '../../../components/common/layouts/DashboardLayout';
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
    formData.append("step_no", values?.step_no);
    formData.append("title", values?.title);
    formData.append("sub_title", values?.sub_title);
    if (values?.center_image) {
      formData.append("center_image", values?.center_image[0].originFileObj);
    }
    if (values?.left_image) {
      formData.append("left_image", values?.left_image[0].originFileObj);
    }
    if (values?.right_image) {
      formData.append("right_image", values?.right_image[0].originFileObj);
    }
    if (values?.line_image) {
      formData.append("line_image", values?.line_image[0].originFileObj);
    }
  
    await authApi.post(BaseApiUrl + apiUrl.deliveryStepSection, formData).then((response) => {
      SwalAlert('Create Step')
      router.push('/landing-page/delivery-step')
      toast.success('Create Step')
    }).catch((err) => {
      toast.error(`Create Step Failed ${err}`)
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
            <h3> Create Delivery Step </h3>
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
            label="Step No"
            name="step_no"
            rules={[
              {
                required: true,
                message: 'Please input Step No!',
              },
            ]}
          >
            <Input type='number' min={0} />
          </Form.Item>

          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input Title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sub Title"
            name="sub_title"
            rules={[
              {
                required: true,
                message: 'Please input Sub Title!',
              },
            ]}
          >
            <TextArea />
          </Form.Item>

          

          <Form.Item label="left Image" valuePropName="fileList" name='left_image' getValueFromEvent={normFile}>
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Center Image" valuePropName="fileList" name='center_image' getValueFromEvent={normFile}>
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Right Image" valuePropName="fileList" name='right_image' getValueFromEvent={normFile}>
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Line Image" valuePropName="fileList" name='line_image' getValueFromEvent={normFile}>
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
