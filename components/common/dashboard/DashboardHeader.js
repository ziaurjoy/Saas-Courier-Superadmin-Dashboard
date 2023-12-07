import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LogoutOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  SettingOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Layout, Avatar, Badge, Dropdown, Space, Popover } from 'antd';

import { apiUrl } from '../../../services/api/apiUrls';
import { authApi } from '../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../config/config';
import SiteService from "../../../services/api/site.service";

import { useRouter } from 'next/router';
import * as qs from "qs"


function DashboardHeader() {
  const [userData, setUserData] = useState()
  const router = useRouter();

  const getUserData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.getUser)
      .then((res) => {
        console.log()
        setUserData(res.data)
      })
      .catch(err => console.log(err))
  }
  console.log('userData', userData)
  useEffect(() => {
    getUserData()
  }, [])

  const fetchSSOData = () => {

    SiteService.fetchSSOApi(BaseApiUrl + apiUrl.SSO)
      .then(res => {
        console.log("res sso", res)

        const url = `http://${res?.domain_data?.domain}:3000/verifysso-login`
        const params = {
          bearer: localStorage.getItem('token'),
          token: res?.token_data
    
        }
        router.push(url+`?${qs.stringify(params)}`)
        // console.log('queryString dashboard page', qs.stringify(params))
      })
      .catch(err => {
        console.log("Error", err)
      })
    // return authApi.get(BaseApiUrl + apiUrl.SSO)
    //   .then((res) => {
    //     // console.log('response', res?.data?.token_data)
    //     // // setSSOData(res?.data?.domain)
    //     router.push(`http://${res?.data?.domain_data?.domain}:3000/login?bearer=${localStorage.getItem('token')}&authtoken=${res?.data?.token_data}`);
    //   })
    //   .catch(err => console.log(err))
  }

  const { Header } = Layout;
  const items = [
    {
      label: <Link href="/user/dashboard/profile">Profile</Link>,
      key: '0',
      icon: <UserOutlined />,
    },
    {
      label: <Link href="/user/dashboard/setting">Setting</Link>,
      key: '1',
      icon: <SettingOutlined />,
    },
    {
      label: <Link href="/login">Log-Out</Link>,
      key: '2',
      icon: <LogoutOutlined />,
    },
    {
      // label: <Link href={`http://${domain}:3000/home`} target="_blank">Application</Link>,
      // label: <Link href="/" target="_blank">Application</Link>,
      label: <h6 onClick={fetchSSOData}>Application</h6>,
      key: '3',
      icon: <LogoutOutlined />,
    },
  ];
  const [openMail, setOpenMail] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const hideNotification = () => {
    setOpenNotification(false);
  };
  const hideMail = () => {
    setOpenMail(false);
  };
  const handleOpenChangeMial = (newOpen) => {
    setOpenMail(newOpen);
  };
  const handleOpenChangeNotification = (newOpen) => {
    setOpenNotification(newOpen);
  };

  



  return (
    <>
      <Header>
        <div className="dashboard-header">
          {/* <div>Brand Logo</div>
          <div>Search Input</div> */}
        </div>

        <div className="dashboard-header-profile-widgets">
          {/* <Popover
            content={<a onClick={hideMail}>Close</a>}
            title="Title"
            trigger="click"
            open={openMail}
            onOpenChange={handleOpenChangeMial}
          >
            <Badge size="small" count={5}>
              <Avatar size="middle" icon={<MailOutlined />} />
            </Badge>
          </Popover>
          <Popover
            content={<a onClick={hideNotification}>Close</a>}
            title="Title"
            trigger="click"
            open={openNotification}
            onOpenChange={handleOpenChangeNotification}
          >
            <Badge size="small" count={5}>
              <Avatar size="middle" icon={<BellOutlined />} />
            </Badge>
          </Popover> */}

          <div className="dashboard-header-author-info">
            <Badge>
              <Avatar
                src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"
                size="middle"
                icon={<UserOutlined />}
              />
            </Badge>
            <>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={['click']}
              >
                <span
                  className="dashboard-header-author-info-button"
                  onClick={(e) => e.preventDefault()}
                >
                  <Space>
                    {/* <span className='avatar-author-name'>Author Name</span> */}
                    <span style={{textTransform: 'uppercase'}} className='avatar-author-name'>{userData?.name}</span>
                    <DownOutlined
                      style={{ fontSize: '10px' }}
                      className="dashboard-author-arrow-down"
                    />
                  </Space>
                </span>
              </Dropdown>
            </>
          </div>
        </div>
      </Header>
    </>
  );
}

export default DashboardHeader;
