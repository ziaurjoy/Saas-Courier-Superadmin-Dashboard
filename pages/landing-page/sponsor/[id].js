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



const SponsorSectionUpdate = () => {
  const { TextArea } = Input;
  const router = useRouter();
  const [form] = Form.useForm()

  const getFeatureData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.sponsorSection + id)
      .then((res) => {
        // setFeatureData(res?.data)
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

      formData.append("image", values?.image[0].originFileObj);
    
    await authApi.patch(BaseApiUrl + apiUrl.sponsorSection + router?.query?.id + '/', formData).then((response) => {
      SwalAlert('Update Sponsor')
      toast.success('Update Sponsor')
      router.push('/landing-page/sponsor')
    }).catch((err) => {
      toast.error(`Update Sponsor Failed ${err}`)
    })

  };



  useEffect(() => {
    if (router?.query?.id) {
      getFeatureData(router?.query?.id)
    }
  }, [router])






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
SponsorSectionUpdate.Layout = DashboardLayout;
export default SponsorSectionUpdate;
