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



const CreateSponsor = () => {
  const router = useRouter();

  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };


  const onSubmit = async (values) => {

    const formData = new FormData();
    formData.append("image", values?.image[0].originFileObj);
  
    await authApi.post(BaseApiUrl + apiUrl.sponsorSection, formData).then((response) => {
      SwalAlert('Create Sponsor')
      toast.success('Create Sponsor')
      router.push('/landing-page/sponsor')
    }).catch((err) => {
      toast.error(`Create Sponsor Failed ${err}`)
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
            <h3> Create Sponsor </h3>
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
CreateSponsor.Layout = DashboardLayout;
export default CreateSponsor;
