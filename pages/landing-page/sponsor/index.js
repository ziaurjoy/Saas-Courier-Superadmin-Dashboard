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



const SponsorList = () => {
  const [sponsorData, setSponsorData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.sponsorSection + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getSponsorData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getSponsorData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.sponsorSection)
      .then((res) => {
        setSponsorData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
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
              <Link href={`sponsor/${record?.id}`}>
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
    getSponsorData()
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
            <h3> Sponsors </h3>
            <Link href="sponsor/create">
              <Button type="primary" color="primary">
                {" "}
                + Feature
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={sponsorData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
SponsorList.Layout = DashboardLayout;
export default SponsorList;
