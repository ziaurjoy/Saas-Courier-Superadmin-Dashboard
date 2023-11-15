import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../../components/common/layouts/DashboardLayout';

import { Button, DatePicker, Form, Input, Select, Space, Tooltip, Typography } from 'antd';

import { Card, CardBody, Col, Label } from "reactstrap"

import AuthService from '../../../services/api/auth.service';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { useRouter } from 'next/router';

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../../components/SwalAlert/SwalAlert';



const CreatePacakge = () => {
  const router = useRouter();
  const { Option } = Select;
  const [parcelItems, setParcelItems] = useState([{
    'item_details': '',
    'item_quantity': ''
  }])
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const options = []
  weekday.forEach(myFunction)
  function myFunction(value) {
    options.push({
      value: value,
      label: value,
    })
  }


  const onSubmit = (values) => {
    const formattedEventDateDiscountPeriod = dayjs(values.discount_period).format("YYYY-MM-DD");
    const formattedEventDateDiscountExpiry = dayjs(values.discount_expiry).format("YYYY-MM-DDTHH:mm:ssZ");
    values.discount_period = formattedEventDateDiscountPeriod
    values.discount_expiry = formattedEventDateDiscountExpiry

    console.log('values', values)

    AuthService.CreatePackage(values).then(
      (data) => {
        if (data) {
          SwalAlert("Package Created Successfully")
          toast.success("Package Create Successfuly !");
          router.push('/landing-page/packages')
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

  const addField = () => {
    let filedDummy = [...parcelItems]
    filedDummy.push({
      'item_details': '',
      'item_quantity': ''
    })

    setParcelItems(filedDummy)
  }

  const removeField = (index) => {
    const newFields = [...parcelItems]
    newFields.splice(index, 1)
    setParcelItems(newFields)
  }

  const handleFieldChange = (value, state, index) => {
    const newFields = [...parcelItems]
    newFields[index][state] = value
    setParcelItems(newFields)
  }

  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Packages </h3>
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
          <Form.Item label="Title" name='title' rules={[{ required: true, message: 'Please input Package Title!', },]}>
            <Input type='text' />
          </Form.Item>
          <Form.Item label="Sub Title" name='subtitle'>
            <Input type='text' />
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
          <Form.Item label="Billing Days" name='billing_days' rules={[{ required: true, message: 'Please input billing days Title!', },]}>
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="Trial Days" name='trial_days' rules={[{ required: true, message: 'Please input Trial Days!', },]}>
            <Input type='number' min={0} />
          </Form.Item>
          <Form.Item label="Billing Grace Period" name='billing_grace_period' rules={[{ required: true, message: 'Please input Package billing greace preiod!', },]}>
            <Input type='number' min={0} />
          </Form.Item>

          {/* <Form.List
            name="features"
            initialValue={[{ features: '', status: '' }]}
          >
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div key={key}>

                    <Form.Item
                      label="Features"
                      {...restField}
                      name={[name, 'feature']}
                      fieldKey={[fieldKey, 'feature']}
                      rules={[{ required: true, message: 'Missing features' }]}
                      style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                      <Input placeholder="Features" />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'is_active']}
                      fieldKey={[fieldKey, 'is_active']}
                      rules={[{ required: true, message: 'Missing status' }]}
                      style={{ display: 'inline-block', width: 'calc(42% - 8px)', margin: '0 8px' }}
                    >
                      <Select placeholder="Is Active">
                        <Option value={true}>Active</Option>
                        <Option value={false}>Inactive</Option>
                      </Select>
                    </Form.Item>
                    <Button
                      type="default"
                      onClick={() => {
                        remove(name);
                      }}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add();
                    }}
                  >
                    Add features
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.List> */}




 

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </Col>

  </>;
};
CreatePacakge.Layout = DashboardLayout;
export default CreatePacakge;
