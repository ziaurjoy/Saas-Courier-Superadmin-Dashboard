import React, { useState, useEffect } from 'react';
import Link from 'next/link'

import { Table, Button, Space } from 'antd';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'

import { apiUrl } from '../../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../../config/config';
import { authApi } from '../../../../services/interceptor/auth.interceptor';

import DashboardLayout from '../../../../components/common/layouts/DashboardLayout';
import SwalDeleteConfirm from '../../../../components/SwalConfirm/SwalDeleteConfirm';
import SwalAlert from '../../../../components/SwalAlert/SwalAlert';



const countFeatures = () => {
  const [countFeatureData, setCountFeatureData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.taskCountFeatureSection + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getCountFeatureData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getCountFeatureData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.taskCountFeatureSection)
      .then((res) => {
        setCountFeatureData(res.data)
      })
      .catch(err => console.log(err))
  }


  const columns = [
    {
      title: 'Feature',
      dataIndex: 'feature_name',
    },
    {
      title: 'Count',
      dataIndex: 'count',
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
          <li style={{ padding: '5px' }}>
            <Link href={`count-feature/${record?.id}`}>
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
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getCountFeatureData()
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
            <h3> Count Feature Section </h3>
            <Link href="/landing-page/task/count-feature/create">
              <Button type="primary" color="primary">
                {" "}
                + Count Feature Section
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={countFeatureData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
countFeatures.Layout = DashboardLayout;
export default countFeatures;
