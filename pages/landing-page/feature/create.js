import React from 'react';
import { useRouter } from 'next/router';



import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast';

import DashboardLayout from '../../../components/common/layouts/DashboardLayout';
import SwalAlert from '../../../components/SwalAlert/SwalAlert';
import { apiUrl } from '../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../config/config';
import { authApi } from '../../../services/interceptor/auth.interceptor';





const CreateFeature = () => {
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
    formData.append("feature", values?.feature);
    formData.append("description", values?.description);
    formData.append("image", values?.image[0].originFileObj);
  
    await authApi.post(BaseApiUrl + apiUrl.featureSection, formData).then((response) => {
      SwalAlert('Create Feature')
      toast.success('Create Feature')
      router.push('/landing-page/feature')
    }).catch((err) => {
      toast.error(`Create Feature Failed ${err}`)
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
            name="feature"
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
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input description!',
              },
            ]}
          >
            <TextArea />
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
CreateFeature.Layout = DashboardLayout;
export default CreateFeature;
