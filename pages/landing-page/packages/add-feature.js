import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/common/layouts/DashboardLayout';

import { Button, DatePicker, Form, Input, Select, InputNumber, Space, Tooltip, Typography } from 'antd';

import { Card, CardBody, Col, Label } from "reactstrap"

import AuthService from '../../../services/api/auth.service';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useRouter } from 'next/router';

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../components/SwalAlert/SwalAlert';
import { authApi } from '../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../config/config';
import { apiUrl } from '../../../services/api/apiUrls';



const AddFeature = () => {
  const router = useRouter();
  const { Option } = Select;
  const [subscriptionPackagesData, setSubscriptionPackagesData] = useState([])
  const [error, setError] = useState()

  const getPackagesData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.getPriceingData)
      .then((res) => {
        // console.log('response dataa',res?.data)
        let subscriptionPackage = []
        res?.data?.map(data => {
          subscriptionPackage.push({ value: data.id, label: data.title })
        })
        // setPackagesData(res.data)
        setSubscriptionPackagesData(subscriptionPackage)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    getPackagesData()
  }, []);


  const onSubmit = (values) => {

    AuthService.subscriptionPackageFeature(values).then(
      (data) => {
        if (data) {
          SwalAlert("Set Subscription Feature Successfully")
          toast.success("Set Subscription Feature !");
          // router.push('/user/admin/dashboard/packages')
        }
        return true;
      },
      (error) => {
        setError(error?.response?.data?.subscription_package[0])
        console.log(error?.response?.data?.subscription_package[0]);
        // return false;
      }
    );

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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
            <h3> Package Feature </h3>
          </div>
          <hr></hr>
        </CardBody>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 17 }}
          layout="horizontal"
          onFinish={onSubmit}
          onFinishFailed={onFinishFailed}
          style={{ maxWidth: "100%" }}
        >
          <Form.Item label="Subscription Package" name='subscription_package' rules={[{ required: true, message: 'Please input subscription package!', },]}>
            <Select options={subscriptionPackagesData}></Select>
          </Form.Item>

          <Form.Item label="Per Month Order" name='per_month_order'>
            <InputNumber min={0}/>
          </Form.Item>

          <Form.Item label="Admin Limit" name='admin_limit'>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Marchant Limit" name='marchant_limit'>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Rider Limit" name='rider_limit'>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label="Rider Mobile App" name='rider_mobile_app' rules={[{ required: true, message: 'Please input subscription package!', },]}>
            <Select placeholder="Is Active">
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Live Tracking" name='live_tracking' rules={[{ required: true, message: 'Please input subscription package!', },]}>
            <Select placeholder="Is Active">
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Export To Excel" name='export_to_excel' rules={[{ required: true, message: 'Please input subscription package!', },]}>
            <Select placeholder="Is Active">
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Export To PDF" name='export_to_pdf' rules={[{ required: true, message: 'Please input subscription package!', },]}>
            <Select placeholder="Is Active">
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Col>

  </>;
};
AddFeature.Layout = DashboardLayout;
export default AddFeature;
