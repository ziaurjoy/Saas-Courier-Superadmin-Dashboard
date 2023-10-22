import React, { useState, useEffect } from 'react';
import Link from 'next/link'

import { Table, Button, Space } from 'antd';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'

import { apiUrl } from '../../services/api/apiUrls';
import { BaseApiUrl } from '../../config/config';
import { authApi } from '../../services/interceptor/auth.interceptor';

import DashboardLayout from '../../components/common/layouts/DashboardLayout';
import SwalDeleteConfirm from '../../components/SwalConfirm/SwalDeleteConfirm';
import SwalAlert from '../../components/SwalAlert/SwalAlert';



const Tanents = () => {
  const [featureData, setFeatureData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.featureSection + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getFeatureData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getFeatureData = async () => {
    return await authApi.get(BaseApiUrl + 'api/user/tenant')
      .then((res) => {
        setFeatureData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Domain',
      dataIndex: 'domain',
    },

    {
      title: 'Schema name',
      dataIndex: ['tenant', 'schema_name'],
    },

    {
      title: 'Organization name',
      dataIndex: ['tenant', 'organization_name'],
    },

    {
      title: 'Is active',
      dataIndex: ['tenant', 'is_active'],
    },
    {
      title: 'Established on',
      dataIndex: ['tenant', 'established_on'],
    },

    {
      title: 'Active',
      render: (_, record) => (
        <Space size="middle">
          {record?.tenant?.is_active ?
            <Button type="primary" >
              {record?.tenant?.is_active.toString().toUpperCase()}
            </Button>
            :
            <Button type="primary" danger>
              {record?.tenant?.is_active.toString().toUpperCase()}
              {/* Edit */}
            </Button>
          }
        </Space>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <li style={{ padding: '5px' }}>
            <Link href={`/landing-page/feature/${record?.id}`}>
              <Button type="primary">
                View
              </Button>
            </Link>
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
    getFeatureData()
  }, []);



  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>
          <div className="invoice-title-card">
            <h3> Tanent </h3>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={featureData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
Tanents.Layout = DashboardLayout;
export default Tanents;
