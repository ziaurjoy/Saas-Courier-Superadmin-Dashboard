import React from 'react';
import DashboardLayout from '../../components/common/layouts/DashboardLayout';
import DashboardContentArea from '../../components/pages/user/DashboardContentArea';

const index = () => {
  return (
    <>
      <DashboardContentArea />
    </>
  );
};
index.Layout = DashboardLayout;

export default index;
