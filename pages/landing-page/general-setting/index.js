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
  const [generalSettingData, setGeneralSettingData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.generalSetting + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getGeneralSettingData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getGeneralSettingData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.generalSetting)
      .then((res) => {
        setGeneralSettingData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'facebook',
      dataIndex: 'facebook',
    },
    {
      title: 'instagram',
      dataIndex: 'instagram',
    },
    {
      title: 'twitter',
      dataIndex: 'twitter',
    },
    {
      title: 'linkedin',
      dataIndex: 'linkedin',
    },

    {
      title: 'Logo',
      render: (_, record) => (
        <Space size="middle">
          {record.logo && <img src={record.logo} style={{ height: '50px', width: "80px" }} />}
        </Space>
      ),

    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <li style={{ padding: '5px' }}>
            <Link href={`general-setting/${record?.id}`}>
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
    getGeneralSettingData()
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
            <h3> General Setting </h3>

            <Link href="general-setting/create">
              <Button type="primary" color="primary">
                {" "}
                + General Setting
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={generalSettingData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
DeliveryStepList.Layout = DashboardLayout;
export default DeliveryStepList;
