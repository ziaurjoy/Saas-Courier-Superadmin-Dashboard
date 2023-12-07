import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/common/layouts/DashboardLayout';

import { Button, Form, Input, Upload, } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { Card, CardBody, Col } from "reactstrap"

import AuthService from '../../../services/api/auth.service';

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../components/SwalAlert/SwalAlert';



const StepSection = () => {

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

  const normFile = (e, any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
            <h3> Steps Create </h3>
          </div>
          <hr></hr>
        </CardBody>
        <Form
          name="basic"
          // labelCol={{
          //   span: 5,
          // }}
          // wrapperCol={{
          //   span: 16,
          // }}
          style={{
            maxWidth: "100",
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Steps"
            name="step"
            rules={[
              {
                required: true,
                message: 'Please input Steps!',
              },
            ]}
          >
            <Input />
          </Form.Item>

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
                message: 'Please input sub-title!',
              },
            ]}
          >
            <Input />
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
StepSection.Layout = DashboardLayout;
export default StepSection;
