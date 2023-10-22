import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { TeamOutlined, LayoutOutlined, AppstoreOutlined, MenuUnfoldOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';

function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;
  const router = useRouter();
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="dashboard-sidebar-logo-section">
          {/* <h5
            className={`${!collapsed
                ? 'dashboard-brand-logo'
                : 'dashboard-brand-logo-colapsed'
              }`}
          > */}
          <img style={{ height: '80px', width: '100%' }} src='images/updatetechlogo.png' />
          {/* </h5> */}
        </div>

        <Menu mode="inline" theme="dark">
          <Menu.Item
            onClick={() => router.push('/')}
            key="dashboard"
            icon={<TeamOutlined />}
          >
            <span className="nav-text">Dashboard</span>
          </Menu.Item>


          <Menu.SubMenu key="landing-page" title="Landing Page" icon={< LayoutOutlined />}>

            <Menu.SubMenu key="general-setting" title="General Setting" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/general-setting")} icon={<MenuUnfoldOutlined />} key="general-setting-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/general-setting/create")} icon={<PlusSquareOutlined />} key="general-setting-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="package" title="Package" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/packages")} icon={<MenuUnfoldOutlined />} key="package-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/packages/create")} icon={<PlusSquareOutlined />} key="package-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="Hero-Section" title="Hero Section" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/hero-section")} icon={<MenuUnfoldOutlined />} key="hero-section-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/hero-section/create")} icon={<PlusSquareOutlined />} key="hero-section-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="features" title="Features" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/feature")} icon={<MenuUnfoldOutlined />} key="feature-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/feature/create")} icon={<PlusSquareOutlined />} key="feature-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="sponsor" title="Sponsors" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/sponsor")} icon={<MenuUnfoldOutlined />} key="sponsor-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/sponsor/create")} icon={<PlusSquareOutlined />} key="sponsor-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="delivery-step" title="Delivery Step" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/delivery-step")} icon={<MenuUnfoldOutlined />} key="delivery-step-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/delivery-step/create")} icon={<PlusSquareOutlined />} key="delivery-step-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu key="task" title="Task" icon={<AppstoreOutlined />}>
              <Menu.SubMenu key="count-feature" title="Count Feature" icon={<AppstoreOutlined />}>
                <Menu.Item onClick={() => router.push("/landing-page/task/count-feature")} icon={<MenuUnfoldOutlined />} key="count-feature-list">
                  <span className="nav-text">List</span>
                </Menu.Item>
                <Menu.Item onClick={() => router.push("/landing-page/task/count-feature/create")} icon={<PlusSquareOutlined />} key="count-feature-create">
                  <span className="nav-text">Create</span>
                </Menu.Item>
              </Menu.SubMenu>

              <Menu.SubMenu key="count-title" title="Count Title" icon={<AppstoreOutlined />}>
                <Menu.Item onClick={() => router.push("/landing-page/task/count-title")} icon={<MenuUnfoldOutlined />} key="count-title-list">
                  <span className="nav-text">List</span>
                </Menu.Item>
                <Menu.Item onClick={() => router.push("/landing-page/task/count-title/create")} icon={<PlusSquareOutlined />} key="count-title-create">
                  <span className="nav-text">Create</span>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>

            <Menu.SubMenu key="testimonial" title="Testimonial" icon={<AppstoreOutlined />}>
              <Menu.Item onClick={() => router.push("/landing-page/testimonial")} icon={<MenuUnfoldOutlined />} key="testimonial-list">
                <span className="nav-text">List</span>
              </Menu.Item>
              <Menu.Item onClick={() => router.push("/landing-page/testimonial/create")} icon={<PlusSquareOutlined />} key="testimonial-create">
                <span className="nav-text">Create</span>
              </Menu.Item>
            </Menu.SubMenu>

          </Menu.SubMenu>


          <Menu.SubMenu key="tanent-page" title="Tanents" icon={< LayoutOutlined />}>

            <Menu.Item onClick={() => router.push("/tanent")} icon={<MenuUnfoldOutlined />} key="general-setting-list">
              <span className="nav-text">List</span>
            </Menu.Item>
            {/* <Menu.Item onClick={() => router.push("/landing-page/general-setting/create")} icon={<PlusSquareOutlined />} key="general-setting-create">
              <span className="nav-text">Create</span>
            </Menu.Item> */}
          </Menu.SubMenu>

        </Menu>
      </Sider>
    </>
  );
}

export default DashboardSidebar;
