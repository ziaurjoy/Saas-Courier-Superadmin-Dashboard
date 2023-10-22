import React, { useState, useEffect } from 'react';
import Link from 'next/link'

import { Table, Button, Space } from 'antd';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'

import { apiUrl } from '../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../config/config';
import { authApi } from '../../../services/interceptor/auth.interceptor';

import DashboardLayout from '../../../components/common/layouts/DashboardLayout';
import SwalDeleteConfirm from '../../../components/SwalConfirm/SwalDeleteConfirm';
import SwalAlert from '../../../components/SwalAlert/SwalAlert';



const Features = () => {
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
    return await authApi.get(BaseApiUrl + apiUrl.featureSection)
      .then((res) => {
        setFeatureData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Feature',
      dataIndex: 'feature',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Image',
      render: (_, record) => (
        <Space size="middle">
          <img src={record.image} style={{ height: '50px', width: "50px" }} />
        </Space>
      ),

    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <ul>
            <li style={{ padding: '5px' }}>
              <Link href={`/landing-page/feature/${record?.id}`}>
                <Button type="primary">
                  Edit
                </Button>
              </Link>
            </li>
            <li >
              <Button onClick={(e) => { deleteAction(e, record.id) }} type='primary' danger>
                Delete
              </Button>
            </li>
          </ul>
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
            <h3> Features </h3>
            <Link href="/dashboard/feature/create">
              <Button type="primary" color="primary">
                {" "}
                + Feature
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={featureData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
Features.Layout = DashboardLayout;
export default Features;
