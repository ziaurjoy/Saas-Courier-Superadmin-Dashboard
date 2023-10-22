import React from 'react';
import { Layout } from 'antd';
function DashboradFooter() {
  const { Footer } = Layout;
  return (
    <>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        © Update Tech Ltd 2018- 2023 - All Rights Reserved
      </Footer>
    </>
  );
}

export default DashboradFooter;
