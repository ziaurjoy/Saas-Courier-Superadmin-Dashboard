import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router';
import * as qs from 'qs'

import { Table, Button, Tag } from 'antd';
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



const Invoices = () => {
  const router = useRouter();
  const [invoiceData, setInvoiceData] = useState()

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



  const getInvoices = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.invoice + `?${qs.stringify(filterQuery)}`)
      .then((res) => {
        setInvoiceData(res?.data?.results)
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

      render: (_, item) => (

        <div className="dashboard_billing_table_wrapper">
          <table class="dashboard_billing_table">
            <thead>
              <tr>
                <th>Number</th>
                <th>Due date</th>
                <th>Amount</th>
                <th>User</th>
                <th>Package</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody>
              <tr key={item.id}>
                <td>
                  <div className="billing_invoice_number_wrapper">
                    <span>Invoice</span>
                    <span>Id: {item.invoice_ID}</span>
                    {/* <BiDownload className="invoice_icon" /> */}
                  </div>
                  <div className="billing_invoice_issue_date_wraaper">
                    <span>Issue date</span>
                    <span>{item.issue_date}</span>
                  </div>
                  <div style={{ paddingTop: '10px' }}>
                    {item.payment_status === 'UNPAID' ?
                      <Button onClick={() => paymentStripe(item.id)} type="primary">Payment</Button> :
                      null
                    }

                  </div>
                </td>

                <td>
                  <p className="billing_invoice_due_date">{item.due_date}</p>
                </td>
                <td>
                  <p className="billing_invoice_amount">$ {item.amount}</p>
                </td>
                <td>
                  <p className="billing_invoice_amount"> {item?.user?.name}</p>
                </td>
                <td>
                  <p className="billing_invoice_amount"> {item?.subscription?.title}</p>
                </td>
                <td>
                  <div className="billing_invoice_status_wrapper">
                    {/* <AiFillCheckCircle size={18} className={item.payment_status === true ? 'status_true' : 'status_false'} /> */}
                    {item?.payment_status == 'UNPAID' ?
                      <Tag color="warning"><span>{item.payment_status}</span></Tag> :
                      <Tag color="#55acee"><span>{item.payment_status}</span></Tag>
                    }
                  </div>
                </td>
                <td>
                  <div className="billing_invoice_payment_method">
                    <p className="billing_invoice_payment_toptitle">paid using</p>
                    <div className="billing_invoice_payment_title">
                      {/* <div className="card_image">
                            <Image
                              src={'/assets/icon/card.png'}
                              width={20}
                              height={20}
                              alt="picture"
                              Layout="fill"
                              style={{
                                maxWidth: "100%",
                                height: "auto",
                                objectFit: "contain"
                              }} />
                          </div> */}
                      <span>Credit Card</span>
                    </div>
                    <p>Proccesd on january 3, 2020 11.28 AM</p>
                  </div>
                </td>

              </tr>

            </tbody>
          </table>
        </div>

      ),
    },
  ];

  // useEffect(() => {
  //   getInvoices()
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
    getInvoices()
  }, [JSON.stringify(filterQuery)])


  return <>
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
                  placeholder="Search Invoice"
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
            <h3> Invoice </h3>
          </div>
          <hr></hr>
          {/* <Table scroll={{ x: true }} columns={columns} dataSource={invoiceData} pagination={{ pageSize: 50}} /> */}
          <div className="dashboard_billing_section">
            <h5 className="dashboard_billing_section_title">Invoices</h5>
            <p className="dashboard_billing_section_subtitle">see and pay your issued invoices</p>
            <Table scroll={{ x: true }} columns={columns} dataSource={invoiceData} onChange={handleTableChange} pagination={tableParams.pagination} />
          </div>
        </CardBody>
      </Card>
    </Col>
  </>;
};
Invoices.Layout = DashboardLayout;
export default Invoices;
