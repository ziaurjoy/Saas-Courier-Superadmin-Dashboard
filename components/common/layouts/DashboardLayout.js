import React from 'react';
import DashboardSidebar from '../dashboard/DashboardSidebar';
import DashboradFooter from '../dashboard/DashboradFooter';
import DashboardHeader from '../dashboard/DashboardHeader';
import { Breadcrumb, Layout } from 'antd';

function DashboardLayout({ children }) {
  const { Content } = Layout;
  return (
    <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <DashboardSidebar />

        <Layout className="site-layout">
          <DashboardHeader />
          <Content className="dashboard-container">{children}</Content>

          <DashboradFooter />
        </Layout>
      </Layout>
    </>
  );
}

export default DashboardLayout;
