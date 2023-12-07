import React, { useState } from 'react';
import DashboardLayout from '../../components/common/layouts/DashboardLayout';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Image, Checkbox } from 'antd';
function DashboardSetting() {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div className="dashboard-content-area">
        <div className="row">
          <div className="col-lg-12">
            <div className="dashboard-profile-section">
              <div className="dashboard-profile-section-title">
                <div>
                  <h5>Account Setting</h5>
                </div>
              </div>
              <Form
                form={form}
                layout="vertical"
                name="advanced_search"
                className="ant-advanced-search-form"
                onFinish={onFinish}
              >
                <Row gutter={24}>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item label="Default Language">
                      <Select defaultValue="English">
                        <Select.Option value="english">English</Select.Option>
                        <Select.Option value="bangla">Bangla</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={12} sm={24} xs={24}>
                    <Form.Item label="Default Curency">
                      <Select defaultValue="BDT">
                        <Select.Option value="Bdt">BDT</Select.Option>
                        <Select.Option value="usd">USD</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
DashboardSetting.Layout = DashboardLayout;
export default DashboardSetting;
