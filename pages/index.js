import React, { useState, useEffect } from 'react';
import Link from 'next/link'
// import HomeContent from '../components/pages/homepage/home/HomeContent';

import { AppstoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Table, Space, Button } from 'antd';

import { apiUrl } from '../services/api/apiUrls';
import { BaseApiUrl } from '../config/config';
import { authApi } from '../services/interceptor/auth.interceptor';



const HomePage = () => {

  const [tenantCount, setTenantCount] = useState()
  const [tenantData, setTenantData] = useState()
  const [packageCount, setPackageCount] = useState()


  const getTenantCount = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.tenantCount)
      .then((res) => {
        setTenantCount(res?.data)
      })
      .catch(err => console.log(err))
  }



  const getPackagetCount = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.getPriceingData)
      .then((res) => {
        setPackageCount(res?.data?.length)
      })
      .catch(err => console.log(err))
  }



  const getTenantData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.tenant)
      .then((res) => {
        setTenantData(res?.data?.results)
      })
      .catch(err => console.log(err))
  }


  const columns = [
    {
      title: 'Organization name',
      dataIndex: 'organization_name',
    },

    {
      title: 'Schema name',
      dataIndex: 'schema_name',
    },

    {
      title: 'Package',
      dataIndex: 'package',
    },

    {
      title: 'Established on',
      dataIndex: 'established_on',
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <li style={{ padding: '5px' }}>
            <Link href={`tenant/${record?.id}`}>
              <Button type="primary">
                View
              </Button>
            </Link>
          </li>
          <li style={{ padding: '5px' }}>
            {record?.is_active ?
              <Button onClick={(e) => { TenantStatusUpdate(e, record?.id, false) }} type="primary" info>
                Active
              </Button>
              :
              <Button onClick={(e) => { TenantStatusUpdate(e, record?.id, true) }} className='bg-warning' type="primary" info>
                In Aeactive
              </Button>

            }

          </li>
          <li >
            <Button onClick={(e) => { deleteAction(e, record.id) }} type='primary' danger>
              Delete
            </Button>
          </li>

        </Space>
      ),
    },
  ];


  useEffect(() => {
    getTenantCount()
    getTenantData()
    getPackagetCount()
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
                title="Tenants"
                value={tenantCount?.total_tenant}
                valueStyle={{ color: '#3f8600' }}
                // prefix={<AntCloudOutlined />}
                prefix={<AppstoreOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Packages"
                value={packageCount}
                valueStyle={{ color: '#00baff' }}
                prefix={<UnorderedListOutlined />}
              />
            </Card>
          </Col>
          {/* <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Merchant"
                value={2}
                valueStyle={{ color: '#ffc107' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Total Rider"
                // value={9.3}
                value={9}
                // precision={2}
                valueStyle={{ color: '#fa561494' }}
                prefix={<TeamOutlined />}
              // suffix="%"
              />
            </Card>
          </Col> */}
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Table scroll={{ x: true }} columns={columns} dataSource={tenantData} />
          </Col>
        </Row>
      </div>

    </>
  );
};

export default HomePage;



