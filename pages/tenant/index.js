import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [tenantData, setTenantData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.tenant + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getTenantData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const TenantStatusUpdate = async (e, id, values) => {

    e.preventDefault()
    return SwalDeleteConfirm(`Will update it?`, "Update").then(
      async function (result) {
        if (result.value) {
          const formData = new FormData();
          formData.append("is_active", values);

          await authApi.patch(BaseApiUrl + apiUrl.tenant + id + '/', formData).then((response) => {
            SwalAlert('Status Update')
            getTenantData()
            toast.success('Status Update')
            
          }).catch((err) => {
            toast.error(`Status Update Failed ${err}`)
          })
        }
      }
    )

  };


  const getTenantData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.tenant)
      .then((res) => {
        setTenantData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'organization_name',
      dataIndex: 'organization_name',
    },

    {
      title: 'schema_name',
      dataIndex: 'schema_name',
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
            <Link href={`tenant/${record?.user}`}>
              <Button type="primary">
                View
              </Button>
            </Link>
          </li>
          <li style={{ padding: '5px' }}>
            {record?.is_active? 
            <Button onClick={(e) => { TenantStatusUpdate(e,record?.id, false) }} type="primary" info>
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
    getTenantData()
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
          <Table scroll={{ x: true }} columns={columns} dataSource={tenantData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
Tanents.Layout = DashboardLayout;
export default Tanents;
