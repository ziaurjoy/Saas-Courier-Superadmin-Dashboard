'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import { Card, CardBody, Col } from "reactstrap"
import toast, { Toaster } from 'react-hot-toast'

import { apiUrl } from '../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../config/config';
import { authApi } from '../../../services/interceptor/auth.interceptor';
import AuthService from '../../../services/api/auth.service';

import DashboardLayout from '../../../components/common/layouts/DashboardLayout';
import SwalDeleteConfirm from '../../../components/SwalConfirm/SwalDeleteConfirm';
import SwalAlert from '../../../components/SwalAlert/SwalAlert';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';



const EditPackages = () => {


  const router = useRouter();
  const [packageData, setPackageData] = useState()

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const options = []
  weekday.forEach(myFunction)
  function myFunction(value) {
    options.push({
      value: value,
      label: value,
    })
  }


  const getPackageData = async (id) => {
    return await authApi
      .get(BaseApiUrl + apiUrl.superAdminPacakge + id)
      .then((response) => {
        setPackageData(response?.data)

      }).catch((error) => { toast.error(`Package Update Failed Error ${error}`) })
  }


  useEffect(() => {
    if (router?.query?.id) {
      getPackageData(router?.query?.id)
    }
  }, [])


  const onSubmit = (values) => {
    const formattedEventDateDiscountPeriod = dayjs(values.discount_period).format("YYYY-MM-DD");
    const formattedEventDateDiscountExpiry = dayjs(values.discount_expiry).format("YYYY-MM-DDTHH:mm:ssZ");
    values.discount_period = formattedEventDateDiscountPeriod
    values.discount_expiry = formattedEventDateDiscountExpiry

    AuthService.CreatePackage(values).then(
      (data) => {
        if (data) {
          SwalAlert("Package Created Successfully")
          toast.success("Success Notification !");
          router.push('/user/admin/dashboard/packages')
        }
        return true;
      },
      (error) => {
        console.log(error?.response?.data?.message);
        return false;
      }
    );

  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };

  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Update Packages </h3>
          </div>
          <hr></hr>
        </CardBody>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 17 }}
          layout="horizontal"
          onFinish={onSubmit}
          // onFinishFailed={onFinishFailed}
          style={{ maxWidth: "100%" }}
        >
          <Form.Item label="Title" name='title' rules={[{ required: true, message: 'Please input Package Title!' }]}>
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Sub Title" name='subtitle'>
            <Input type='text' />
          </Form.Item>

          <Form.Item label="Features" name='features'>
            <Select
              mode="tags"
              style={{
                width: '100%',
              }}
              tokenSeparators={[',']}
              options={options}
            />
          </Form.Item>

          <Form.Item label="Price" name='price' rules={[{ required: true, message: 'Please input Package Title!', },]}>
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="Discount" name='discount'>
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="Discount Period" name='discount_period'>
            <DatePicker />
          </Form.Item>
          <Form.Item label="Discount Expiry" name='discount_expiry'>
            <DatePicker showTime={{
              format: 'HH:mm',
            }} />

          </Form.Item>
          <Form.Item label="Billing Days" name='billing_days'>
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="Trial Days" name='trial_days' rules={[{ required: true, message: 'Please input Trial Days!', },]}>
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="Billing Grace Period" name='billing_grace_period' rules={[{ required: true, message: 'Please input Package billing greace preiod!', },]}>
            <Input type='number' min={0} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Col>

  </>;
};
EditPackages.Layout = DashboardLayout;
export default EditPackages;
