import React, { useEffect, useState } from 'react';
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



const TestimonialUpdate = () => {
  const { TextArea } = Input;
  const router = useRouter();
  const [form] = Form.useForm()
  const [testimonialData, setTestimonialData] = useState()

  const getTestimonialData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.testimonial + id)
      .then((res) => {
        setTestimonialData(res?.data)
      })
      .catch(err => console.log(err))
  }


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


    await authApi.patch(BaseApiUrl + apiUrl.testimonial + router?.query?.id + '/', formData).then((response) => {
      SwalAlert('Update Testimonial')
      toast.success('Update Testimonial')
      router.push('/landing-page/testimonial')
    }).catch((err) => {
      toast.error(`Update Testimonial Failed ${err}`)
    })

  };



  useEffect(() => {
    if (router?.query?.id) {
      getTestimonialData(router?.query?.id)
    }
  }, [router])



  useEffect(() => {
    if (testimonialData) {
      form.setFieldValue("company_name", testimonialData?.company_name);
      form.setFieldValue("testimonial_name", testimonialData?.testimonial_name);
      form.setFieldValue("designation", testimonialData?.designation);
      form.setFieldValue("testimonial_title", testimonialData?.testimonial_title);
      form.setFieldValue("testimonial_description", testimonialData?.testimonial_description);
    }
  }, [testimonialData])



  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Update Testimonial </h3>
          </div>
          <hr></hr>
        </CardBody>
        <Form

          name="basic"
          style={{
            maxWidth: "100",
          }}
          form={form}
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
TestimonialUpdate.Layout = DashboardLayout;
export default TestimonialUpdate;
