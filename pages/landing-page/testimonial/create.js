import React from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../components/common/layouts/DashboardLayout';

import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../components/SwalAlert/SwalAlert';
import { authApi } from '../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../config/config';
import { apiUrl } from '../../../services/api/apiUrls';



const CreatedTestimonial = () => {
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
    formData.append("company_name", values?.company_name);
    formData.append("testimonial_name", values?.testimonial_name);
    formData.append("designation", values?.designation);
    formData.append("testimonial_title", values?.testimonial_title);
    formData.append("testimonial_description", values?.testimonial_description);

    if (values?.image) {
      formData.append("image", values?.image[0].originFileObj);
    }
  
    await authApi.post(BaseApiUrl + apiUrl.testimonial, formData).then((response) => {
      SwalAlert('Testimonial Created')
      router.push('/landing-page/testimonial')
      toast.success('Testimonial Created')
    }).catch((err) => {
      toast.error(`Testimonial Created Failed ${err}`)
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
            <h3> Create Testimonial </h3>
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
            name="company_name"
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
            label="Testimonial Name"
            name="testimonial_name"
            rules={[
              {
                required: true,
                message: 'Please input testimonial name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designation"
            rules={[
              {
                required: true,
                message: 'Please input designation!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Testimonial Title"
            name="testimonial_title"
            rules={[
              {
                required: true,
                message: 'Please input testimonial title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Testimonial Description"
            name="testimonial_description"
            rules={[
              {
                required: true,
                message: 'Please input testimonial description!',
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
CreatedTestimonial.Layout = DashboardLayout;
export default CreatedTestimonial;
