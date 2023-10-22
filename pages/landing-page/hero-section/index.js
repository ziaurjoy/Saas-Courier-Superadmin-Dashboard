import React, { useState, useEffect } from 'react';
import Link from 'next/link'

import { Table, Button, Space } from 'antd';
import { Card, CardBody, Col } from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import { AiTwotoneDelete, BsXCircle } from 'react-icons/bs';


import axios from "axios";
import { apiUrl } from '../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../config/config';
import { authApi } from '../../../services/interceptor/auth.interceptor';

import DashboardLayout from '../../../components/common/layouts/DashboardLayout';
import SwalDeleteConfirm from '../../../components/SwalConfirm/SwalDeleteConfirm';
import SwalAlert from '../../../components/SwalAlert/SwalAlert';



const HeroSectionList = () => {
  const [heroSectionData, setHeroSectionData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.heroSection + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getheroSectionData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getheroSectionData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.heroSection)
      .then((res) => {
        setHeroSectionData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
    },
    {
      title: 'Sub Title',
      dataIndex: 'sub_title',
    },

    {
      title: 'Demo',
      dataIndex: 'demo_link',
    },

    {
      title: 'Banner Image',
      key: 'banner_image',
      render: (_, record) => (
        <Space size="middle">
          <img style={{ height: '100px', width: "150px" }} src={record?.banner_image}/>
        </Space>
      ),
    },

    {
      title: 'Device Image',
      key: 'device_image',
      render: (_, record) => (
        <Space size="middle">
          <img style={{height: '100px', width: "150px"}} src={record?.device_image} />
        </Space>
      ),
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <li style={{ padding: '5px' }}>
            <Link href={`hero-section/${record?.id}`}>
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
    getheroSectionData()
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
              <h3> Hero Section </h3>
            {heroSectionData ?
              null :
              <Link href="/dashboard/heroSection/create">
                <Button type="primary" color="primary">
                  {" "}
                  + Create Hero Section
                </Button>
              </Link>
            }
            </div>  
         
          
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={heroSectionData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
HeroSectionList.Layout = DashboardLayout;
export default HeroSectionList;
