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



const countTitle = () => {
  const [countTitleData, setCountTitleData] = useState()

  const deleteAction = async (e, id) => {

    e.preventDefault()
    return SwalDeleteConfirm(`You won't be able to revert this!`, "Delete").then(
      async function (result) {
        if (result.value) {
          await authApi
            .delete(BaseApiUrl + apiUrl.taskCountTtitleSection + id)
            .then((response) => {
              SwalAlert("Deleted Successfully")
              getCountTitleData()
              toast.success("Deleted Successfully !");
            }).catch((error) => { toast.error("Deleted Failed !"); })
        }
      }
    )
  }


  const getCountTitleData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.taskCountTtitleSection)
      .then((res) => {
        setCountTitleData(res.data)
      })
      .catch(err => console.log(err))
  }



  const columns = [
    {
      title: 'Task Count Title',
      dataIndex: 'task_count_title',
    },
    {
      title: 'Task Count Sub Title',
      dataIndex: 'task_count_sub_title',
    },


    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <li style={{ padding: '5px' }}>
            <Link href={`count-title/${record?.id}`}>
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
    getCountTitleData()
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
            <h3> Count Title </h3>
            <Link href="count-title/create">
              <Button type="primary" color="primary">
                {" "}
                + Count Title Section
              </Button>
            </Link>
          </div>
          <hr></hr>
          <Table scroll={{ x: true }} columns={columns} dataSource={countTitleData} pagination={2} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
countTitle.Layout = DashboardLayout;
export default countTitle;
