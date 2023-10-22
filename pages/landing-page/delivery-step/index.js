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



const DeliveryStepList = () => {
  const [deliveryStepData, setDeliveryStepData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.deliveryStepSection + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getDeliveryStepData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getDeliveryStepData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.deliveryStepSection)
      .then((res) => {
        setDeliveryStepData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Step No',
      dataIndex: 'step_no',
    },
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Sub Title',
      dataIndex: 'sub_title',
    },

    {
      title: 'Left Image',
      render: (_, record) => (
        <Space size="middle">
          {record.left_image && <img src={record.left_image} style={{ height: '50px', width: "50px" }} />}

        </Space>
      ),

    },

    {
      title: 'Center Image',
      render: (_, record) => (
        <Space size="middle">
          {record.center_image && <img src={record.center_image} style={{ height: '50px', width: "50px" }} />}
        </Space>
      ),

    },

    {
      title: 'Right Image',
      render: (_, record) => (
        <Space size="middle">{
          record.right_image && <img src={record.right_image} style={{ height: '50px', width: "50px" }} />
        }
        </Space>
      ),

    },

    {
      title: 'line Image',
      render: (_, record) => (
        <Space size="middle">{
          record.line_image && <img src={record.line_image} style={{ height: '50px', width: "50px" }} />
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
            <Link href={`/dashboard/delivery-step/${record?.id}`}>
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
    getDeliveryStepData()
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
            <h3> Delivery Step </h3>
            <Link href="/landing-page/delivery-step/create">
              <Button type="primary" color="primary">
                {" "}
                + Delivery Step
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={deliveryStepData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
DeliveryStepList.Layout = DashboardLayout;
export default DeliveryStepList;
