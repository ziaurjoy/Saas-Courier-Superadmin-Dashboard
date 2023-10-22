import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../components/common/layouts/DashboardLayout';
import { Card, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../components/SwalAlert/SwalAlert';
import { authApi } from '../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../config/config';
import { apiUrl } from '../../services/api/apiUrls';



const ViewTenant = () => {
  const router = useRouter();
  const [tenantData, setTenantData] = useState()

  const getTenantData = async (id) => {
    return await authApi.get(BaseApiUrl + 'api/user/tenant/' + id)
      .then((res) => {
        setTenantData(res?.data)
      })
      .catch(err => console.log(err))
  }








  useEffect(() => {
    if (router?.query?.id) {
      getTenantData(router?.query?.id)
    }
  }, [router])


  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="View Tenant">
        <CardBody>
          {/* <div className="invoice-title-card">
            <h3> View Tenant </h3>
          </div> */}
          {/* <hr></hr> */}
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card title="Card" size="small" style={{width: '50%'}}>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card title="Card" size="small" style={{ width: '50%' }}>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
            <Card title="Card" size="small">
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Space>
        </CardBody>
      </Card>
    </Col>

  </>;
};
ViewTenant.Layout = DashboardLayout;
export default ViewTenant;
