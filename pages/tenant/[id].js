import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import DashboardLayout from '../../components/common/layouts/DashboardLayout';
import { Card, Space ,Row,Col} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CardBody} from "reactstrap"

import toast, { Toaster } from 'react-hot-toast'
import SwalAlert from '../../components/SwalAlert/SwalAlert';
import { authApi } from '../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../config/config';
import { apiUrl } from '../../services/api/apiUrls';



const ViewTenant = () => {
  const router = useRouter();
  const [tenantData, setTenantData] = useState()

  const getTenantData = async (id) => {
    return await authApi.get(BaseApiUrl + apiUrl.tenant + id)
      .then((res) => {
        setTenantData(res?.data)
      })
      .catch(err => console.log(err))
  }



  useEffect(() => {
    if (router?.query?.id) {
      getTenantData(router?.query?.id)
    }
  }, [router])


  return <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    <Col  style={{ marginTop: "20px" }}>
      <Card title="View Tenant">
        <CardBody>
          {/* <div className="invoice-title-card">
            <h3> View Tenant </h3>
          </div> */}
          {/* <hr></hr> */}

          <Row gutter={12}>
            <Col span={12}>
              <Card title="Tenant Details" >
                <p>name : {tenantData?.package_data?.user?.name}</p>
                <p>email : {tenantData?.package_data?.user?.email}</p>
                <p>Domain : {tenantData?.domainData?.domain}</p>
                <p>Organization : {tenantData?.domainData?.tenant?.organization_name}</p>
                <p>Total User : {tenantData?.user_info?.total_user}</p>
                <p>Total Rider : {tenantData?.user_info?.total_rider}</p>
                <p>Total Marchant : {tenantData?.user_info?.total_marchant}</p>
                <p>Schema : {tenantData?.domainData?.tenant?.schema_name}</p>
                <p>IsActive : {tenantData?.domainData?.tenant?.is_active}</p>
                <p>Established On : {tenantData?.domainData?.tenant?.established_on}</p>
                <p>Description : {tenantData?.domainData?.tenant?.description}</p>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Package Details"  >
                <p>Package : {tenantData?.package_data?.subscribed_package?.title}</p>
                <p>Sub Title : {tenantData?.package_data?.subscribed_package?.subtitle}</p>
                <p>trial_days : {tenantData?.package_data?.subscribed_package?.trial_days}</p>
                <p>billing_days : {tenantData?.package_data?.subscribed_package?.billing_days}</p>
                <p>billing_grace_period : {tenantData?.package_data?.subscribed_package?.billing_grace_period}</p>
                <p>discount : {tenantData?.package_data?.subscribed_package?.discount}</p>
                <p>discount_expiry : {tenantData?.package_data?.discount_expiry}</p>
                <p>last_billing_date : {tenantData?.package_data?.last_billing_date}</p>
                <p>next_billing_date : {tenantData?.package_data?.next_billing_date}</p>
                <p>pricing_status : {tenantData?.package_data?.pricing_status}</p>
                <p>status : {tenantData?.package_data?.status}</p>
              </Card>
            </Col>
          </Row>
      
        </CardBody>
      </Card>
    </Col>

  </>;
};
ViewTenant.Layout = DashboardLayout;
export default ViewTenant;
