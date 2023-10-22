import React, {useState, useEffect} from 'react';
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



const HeroSectionUpdate = () => {
  const router = useRouter();
  const [form] = Form.useForm()
  const [heroSectionData, setHeroSectionData] = useState()

  const getHeroSectionData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.heroSection + id)
      .then((res) => {
        setHeroSectionData(res?.data)
      })
      .catch(err => console.log(err))
  }

  const onSubmit = async (values) => {

    const formData = new FormData();
    formData.append("title", values?.title);
    formData.append("sub_title", values?.sub_title);
    if (values?.demo_link){
      formData.append("demo_link", values?.demo_link);
    }
    if (values?.device_image) {
      formData.append("device_image", values?.device_image[0].originFileObj);
    }
    if (values?.banner_image){
      formData.append("banner_image", values?.banner_image[0].originFileObj);
    }
    
    await authApi.patch(BaseApiUrl + apiUrl.heroSection + router?.query?.id + '/', formData).then((response) => {
      SwalAlert('Update Hero Section')
      toast.success('Update Hero Section')
      router.push('/landing-page/hero-section')
    }).catch((err) => {
      toast.error(`A HeroSection object already exists. You cannot create another one`)
      toast.error(`Update Hero Section Failed ${err}`)
    })

  };

  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    if (router?.query?.id) {
      getHeroSectionData(router?.query?.id)
    }
  }, [router])

  useEffect(() => {
    if (heroSectionData) {

      form.setFieldValue("title", heroSectionData?.title);
      form.setFieldValue("sub_title", heroSectionData?.sub_title);
      form.setFieldValue("demo_link", heroSectionData?.demo_link);

    }
  }, [heroSectionData])

  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Create HeroSection </h3>
          </div>
          <hr></hr>
        </CardBody>
        <Form
          name="basic"
          form={form}
          encType='multipart/form-data'

          style={{
            maxWidth: "100",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input title!',
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
                message: 'Please input sub title!',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Demo Link"
            name="demo_link"
          >
            <Input />
          </Form.Item>

          <Form.Item label="Banner Image" valuePropName="fileList" name='banner_image' getValueFromEvent={normFile}>
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item label="Device Image" valuePropName="fileList" name='device_image' getValueFromEvent={normFile}>
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>


          <Form.Item
            wrapperCol={{
              offset: 1,
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

  </>;
};
HeroSectionUpdate.Layout = DashboardLayout;
export default HeroSectionUpdate;
