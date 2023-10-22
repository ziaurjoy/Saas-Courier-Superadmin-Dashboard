import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../../../components/common/layouts/DashboardLayout';

import { Button, Form, Input, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../../components/SwalAlert/SwalAlert';
import { authApi } from '../../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../../config/config';
import { apiUrl } from '../../../../services/api/apiUrls';



const CreateTaskCountFeatureSection = () => {
  const router = useRouter();
  const [form]=Form.useForm()
  const [countFeatureData, setCountFeatureData] = useState()

  const getCountFeatureData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.taskCountFeatureSection + id)
      .then((res) => {
        setCountFeatureData(res?.data)
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
    formData.append("feature_name", values?.feature_name);
    formData.append("count", values?.count);

    if(values?.image){
      formData.append("image", values?.image[0].originFileObj);
    }
    
    await authApi.patch(BaseApiUrl + apiUrl.taskCountFeatureSection + router?.query?.id + '/', formData).then((response) => {
      SwalAlert('Create Task Feature Section')
      toast.success('Create Task Feature Section')
      router.push('/landing-page/task/count-feature')
    }).catch((err) => {
      toast.error(`Create Feature Section Failed ${err}`)
    })

  };



  useEffect(() => {
    if (router?.query?.id) {
      getCountFeatureData(router?.query?.id)
    }
  }, [router])



  useEffect(() => {
    if (countFeatureData) {
      form.setFieldValue("feature_name", countFeatureData?.feature_name)
      form.setFieldValue("count", countFeatureData?.count)
    }
  }, [countFeatureData])



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
          form={form}
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
