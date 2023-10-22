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



const TestimonialList = () => {
  const [testimonialData, setTestimonialData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.testimonial + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getTestimonialData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getTestimonialData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.testimonial)
      .then((res) => {
        setTestimonialData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'company_name',
    },
    {
      title: 'Testimonial Name',
      dataIndex: 'testimonial_name',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
    },
    {
      title: 'Testimonial Title',
      dataIndex: 'testimonial_title',
    },
    {
      title: 'Testimonial Description',
      dataIndex: 'testimonial_description',
    },

    {
      title: 'image',
      render: (_, record) => (
        <Space size="middle">
          {record.image && <img src={record.image} style={{ height: '50px', width: "80px" }} />}
        </Space>
      ),

    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <li style={{ padding: '5px' }}>
            <Link href={`testimonial/${record?.id}`}>
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
    getTestimonialData()
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
            <h3> Testimonials </h3>

            <Link href="/landing-page/testimonial/create">
              <Button type="primary" color="primary">
                {" "}
                + Testimonial
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={testimonialData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
TestimonialList.Layout = DashboardLayout;
export default TestimonialList;
