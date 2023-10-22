import React, {useEffect, useState} from 'react';
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



const CreateTaskCountTitleSection = () => {
  const router = useRouter();
  const [form] = Form.useForm()
  const [countTitleData, setCountTitleData] = useState()

  const getCountTitleData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.taskCountTtitleSection + id)
      .then((res) => {
        setCountTitleData(res?.data)
      })
      .catch(err => console.log(err))
  }

  const onSubmit = async (values) => {

    await authApi.patch(BaseApiUrl + apiUrl.taskCountTtitleSection + router?.query?.id + '/', values).then((response) => {
      SwalAlert('Create Task Count Section')
      toast.success('Create Task Count Section')
      router.push('/landing-page/task/count-title')
    }).catch((err) => {
      toast.error(`A task count object already exists. You cannot create another one`)
      toast.error(`Create Hero Section Failed ${err}`)
    })

  };

  useEffect(() => {
    if (router?.query?.id) {
      getCountTitleData(router?.query?.id)
    }
  }, [router])



  useEffect(() => {
    if (countTitleData) {
      form.setFieldValue("task_count_title", countTitleData?.task_count_title)
      form.setFieldValue("task_count_sub_title", countTitleData?.task_count_sub_title)
    }
  }, [countTitleData])

  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Task Title Section </h3>
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
          autoComplete="off"
          form={form}
        >

          <Form.Item
            label="Title"
            name="task_count_title"
            rules={[
              {
                required: true,
                message: 'Please input Count Title!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Sub Title"
            name="task_count_sub_title"
            rules={[
              {
                required: true,
                message: 'Please input Count Title!',
              },
            ]}
          >
            <Input />
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
CreateTaskCountTitleSection.Layout = DashboardLayout;
export default CreateTaskCountTitleSection;
