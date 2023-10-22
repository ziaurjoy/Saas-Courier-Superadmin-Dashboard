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



const FeatureSectionUpdate = () => {
  const { TextArea } = Input;
  const router = useRouter();
  const [form] = Form.useForm()
  const [featureData, setFeatureData] = useState()

  const getFeatureData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.featureSection + id)
      .then((res) => {
        setFeatureData(res?.data)
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
    formData.append("feature", values?.feature);
    formData.append("description", values?.description);
    if(values?.image){
      formData.append("image", values?.image[0].originFileObj);
    }
    

    await authApi.patch(BaseApiUrl + apiUrl.featureSection + router?.query?.id + '/', formData).then((response) => {
      SwalAlert('Create Feature')
      toast.success('Create Feature')
      router.push('/landing-page/feature')
    }).catch((err) => {
      toast.error(`Create Feature Failed ${err}`)
    })

  };



  useEffect(() => {
    if (router?.query?.id) {
      getFeatureData(router?.query?.id)
    }
  }, [router])



  useEffect(() => {
    if (featureData) {
      form.setFieldValue("feature", featureData?.feature)
      form.setFieldValue("description", featureData?.description)
    }
  }, [featureData])



  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Update Feature </h3>
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
            {/* <Input /> */}
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
FeatureSectionUpdate.Layout = DashboardLayout;
export default FeatureSectionUpdate;
