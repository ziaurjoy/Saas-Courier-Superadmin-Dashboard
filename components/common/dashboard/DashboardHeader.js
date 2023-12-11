import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Layout, Avatar, Badge, Dropdown, Space } from 'antd';

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
        setUserData(res.data)
      })
      .catch(err => console.log(err))
  }


  const fetchSSOData = () => {

    SiteService.fetchSSOApi(BaseApiUrl + apiUrl.SSO)
      .then(res => {

        const url = `http://${res?.domain_data?.domain}:3000/verifysso-login`
        const params = {
          bearer: localStorage.getItem('token'),
          token: res?.token_data

        }
        router.push(url + `?${qs.stringify(params)}`)
      })
      .catch(err => {
        console.log("Error", err)
      })

  }

  const { Header } = Layout;

  const items = [
    {
      label: <Link href="/profile">Edit Profile</Link>,
      key: '0',
      icon: <UserOutlined />,
    },

    {
      label: <Link href="/login">Log-Out</Link>,
      key: '2',
      icon: <LogoutOutlined />,
    },
    {
      // label: <Link href={`http://${domain}:3000/home`} target="_blank">Application</Link>,
      label: <h6 onClick={fetchSSOData}>Application</h6>,
      key: '3',
      icon: <LogoutOutlined />,
    },
  ];


  useEffect(() => {
    getUserData()
  }, [])



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
              {
                userData?.profile_picture ?
                  <img style={{ borderRadius: '50%', height: "40px", width: '40px' }} src={BaseApiUrl + userData?.profile_picture} /> :
                  <Avatar
                    src="https://cdn.pixabay.com/photo/2018/08/28/13/29/avatar-3637561_960_720.png"
                    size="middle"
                    icon={<UserOutlined />}
                  />
              }
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
                    <span style={{ textTransform: 'uppercase' }} className='avatar-author-name'>{userData?.name}</span>
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
