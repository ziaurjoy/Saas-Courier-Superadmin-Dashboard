import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import * as qs from 'qs'

import { Table, Button, Space } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import { Card, CardBody, Col } from "reactstrap"
// import { Search } from "react-feather"

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

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      // pageSize: GENERAL_ROW_SIZE,
      pageSize: 2
    },
  })

  const [filterQuery, setFilterQuery] = useState({
    page: 1,
    // page_size: GENERAL_ROW_SIZE,
    page_size: 2
  })


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
    return await authApi.get(BaseApiUrl + apiUrl.tenant + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setTenantData(res?.data?.results)
        updatePagination({
          current: res?.data?.page_number,
          pageSize: res?.data?.page_size,
          total: res?.data?.count,
        })
      })
      .catch(err => console.log(err))
  }

  const updatePagination = (info) => {
    const _tableParams = { ...tableParams }

    _tableParams.pagination = info
    setTableParams(_tableParams)
  }

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sorter,
    })

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  function updateFilterQUery(term, value) {
    let filters = { ...filterQuery }
    if (term != 'page') {
      filters['page'] = 1
    }

    if (value) {
      filters[term] = value
    } else {
      filters.hasOwnProperty(term) && delete filters[term]
    }
    setFilterQuery(filters)
  }


  const columns = [
    {
      title: 'Organization name',
      dataIndex: 'organization_name',
    },

    {
      title: 'Schema name',
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

  // useEffect(() => {
  //   getTenantData()
  // }, []);


  useEffect(() => {
    const _tableParams = tableParams
    const _filters = { ...filterQuery }

    if (_tableParams) {
      _filters['page'] = _tableParams.pagination?.current
      _filters['page_size'] = _tableParams.pagination?.pageSize
      // _filters['ordering'] = _tableParams?.sorter?.order == 'ascend' ? _tableParams?.sorter?.field : `-${_tableParams?.sorter?.field}`
    }

    setFilterQuery(_filters)

  }, [JSON.stringify(tableParams)])

  useEffect(() => {
    getTenantData()
  }, [JSON.stringify(filterQuery)])


  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col sm="12" style={{ marginTop: "20px" }}>
      <Card title="Bordered">
        <CardBody>

          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="d-flex align-items-center">
                {/* <Link to={"/merchants/add"}>
                  <Button.Ripple color="primary">Add Merchant</Button.Ripple>
                </Link> */}
              </div>
            </div>
            <div className="col-lg-5">
              <div className="d-flex align-items-center ">
                <input
                  placeholder="Search Tenant"
                  name="user_name"
                  type="text"
                  class="form-control"
                  // value=""
                  onChange={(e) => updateFilterQUery('search', e.target.value)}
                />
                {/* <Button.Ripple className="btn-icon ms-1" outline color="primary">
                  <Search size={16} />
                </Button.Ripple> */}
              </div>
            </div>
          </div>

          <div className="invoice-title-card">
            <h3> Tanent </h3>
          </div>
          <hr></hr>
          {/* <Table scroll={{ x: true }} columns={columns} dataSource={tenantData} pagination={{ pageSize: 50}} /> */}
          <Table scroll={{ x: true }} columns={columns} dataSource={tenantData} onChange={handleTableChange} pagination={tableParams.pagination} />
        </CardBody>
      </Card>
    </Col>
  </>;
};
Tanents.Layout = DashboardLayout;
export default Tanents;
