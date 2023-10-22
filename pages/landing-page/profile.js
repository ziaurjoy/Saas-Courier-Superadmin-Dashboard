import React, { useState } from 'react';
import DashboardLayout from '../../../components/common/layouts/DashboardLayout';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Image, Checkbox } from 'antd';
function dashboardProfile() {
  const [form] = Form.useForm();

  const onFinish = (value) => {
    console.log(value);
  };

  const [componentDisabled, setComponentDisabled] = useState(true);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <div className="dashboard-content-area">
        <div className="row">
          <div className="col-lg-4 col-md-5 col-sm-12">
            <div className="dashboard-profile-section">
              <h5>Profile</h5>
              <div className="dashboard-profile">
                <div className="dashboard-profile-image-wrapper">
                  <Image src="https://cdn.pixabay.com/photo/2016/06/15/16/16/man-1459246_960_720.png" />
                </div>
                <div className="mt-2 text-center">
                  <h6>Author Name</h6>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="dashboard-profile-info">
                <p>Email</p>
                <span>example@gamil.com</span>
                <p>Phone</p>
                <span>+881125478965</span>
                <p>Location</p>
                <span>Mirpur, Dhaka, Bangladesh, 1210</span>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-md-7 col-sm-12">
            <div className="dashboard-profile-section">
              <div className="dashboard-profile-section-title">
                <div>
                  <h5>Profile Setting</h5>
                </div>
                <div>
                  <label
                    htmlFor="edit1"
                    className="dashboard-profile-section-title-checkbox-label"
                  >
                    <h5>Edit</h5>
                    <EditOutlined />
                  </label>
                  <input
                    id="edit1"
                    type="checkbox"
                    checked={componentDisabled}
                    onChange={(e) => setComponentDisabled(e.target.checked)}
                    className="dashboard-profile-section-title-checkbox"
                  />
                </div>
              </div>

              <div className="dashboard-profile-setting">
                <Form
                  form={form}
                  layout="vertical"
                  name="advanced_search"
                  className="ant-advanced-search-form"
                  onFinish={onFinish}
                  onValuesChange={onFormLayoutChange}
                  disabled={componentDisabled}
                >
                  <Row gutter={24}>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="First Name"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input
                          placeholder="input placeholder"
                          value="Mahfuzar Rahman"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Last Name"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input placeholder="input placeholder" value="Shovon" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Email"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input
                          placeholder="input placeholder"
                          value="Example@gmail.com"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Phone"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input
                          placeholder="input placeholder"
                          value="01770000000"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Demo"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input placeholder="input placeholder" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Demo"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input placeholder="input placeholder" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Demo"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input placeholder="input placeholder" />
                      </Form.Item>
                    </Col>
                    <Col lg={12} sm={24} xs={24}>
                      <Form.Item
                        label="Demo"
                        required={!componentDisabled}
                        tooltip={`${
                          !componentDisabled ? 'This is a required field' : ''
                        }`}
                      >
                        <Input placeholder="input placeholder" />
                      </Form.Item>
                    </Col>
                  </Row>
                  {!componentDisabled && (
                    <button className="user-profile-button" type="submit">
                      Update
                    </button>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
dashboardProfile.Layout = DashboardLayout;
export default dashboardProfile;
