import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../components/common/layouts/DashboardLayout';

import { Button, Form, Input, Upload, Space } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../../components/SwalAlert/SwalAlert';
import { authApi } from '../../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../../config/config';
import { apiUrl } from '../../../../services/api/apiUrls';



const CreateTaskCountFeatureSection = () => {

  const router = useRouter();

  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  const onSubmit = async (values) => {

    const formData = new FormData();
    formData.append("feature_name", values?.feature_name);
    formData.append("count", values?.count);
    formData.append("image", values?.image[0].originFileObj);
  
    await authApi.post(BaseApiUrl + apiUrl.taskCountFeatureSection, formData).then((response) => {
      SwalAlert('Create Task Feature Section')
      toast.success('Create Task Feature Section')
      router.push('/landing-page/task/count-feature')
    }).catch((err) => {
      toast.error(`Create Feature Section Failed ${err}`)
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
            <h3> Task Feature Section </h3>
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
            label="Feature Name"
            name="feature_name"
            rules={[
              {
                required: true,
                message: 'Please input feature!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Count"
            name="count"
            rules={[
              {
                required: true,
                message: 'Please input count!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Image" valuePropName="fileList" name='image' getValueFromEvent={normFile}>
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
CreateTaskCountFeatureSection.Layout = DashboardLayout;
export default CreateTaskCountFeatureSection;
