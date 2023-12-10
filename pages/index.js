import React, { useState, useEffect } from 'react';
import CustomHead from '../components/common/head/Head';
// import HomeContent from '../components/pages/homepage/home/HomeContent';

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

import { apiUrl } from '../services/api/apiUrls';
import { BaseApiUrl } from '../config/config';
import { authApi } from '../services/interceptor/auth.interceptor';

const HomePage = () => {
  const [tenantCount, setTenantCount] = useState()

  const getTenantCount = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.tenantCount)
      .then((res) => {
        setTenantCount(res?.data)
        console.log('res?.data', res?.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getTenantCount()
  }, [])

  return (
    <>
      {/* <CustomHead /> */}
      {/* <HomeContent /> */}

      <div className="dashboard-content-area">
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Total Tenant"
                value={tenantCount?.total_tenant}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
      </div>


    </>
  );
};

export default HomePage;



// const DashboardContentArea = () => {
//   return (
//     <>
      
//     </>
//   );
// };

// export default DashboardContentArea;

