import React, { useState, useEffect } from 'react';
import {  BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

import { apiUrl } from '../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../config/config';
import { authApi } from '../../../services/interceptor/auth.interceptor';

const Packages = () => {
  const [packagesData, setPackagesData] = useState()

  const getPackagesData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.geSubscriptionData)
      .then((res) => {
        setPackagesData(res.data)
      })
      .catch(err => console.log(err))
  }


  useEffect(() => {
    getPackagesData()
  }, []);


  return (
    <div className="page_main_content_wrapepr">
      <div className="price_section_wrapper">
        <h5 className="page_title">Packages</h5>
        <div className="container">
          <div className="price_plan_section_wrapper">
            <div className="price_plan_section">
              {packagesData?.map((packag) => (
                <div key={packag.id} className="price_plan_section_card">
                  <div className="price_plan_section_card_title">
                    <h5 className="card_title">{packag?.subscription_package?.title}</h5>
                  </div>

                  <div className="price_plan_body">
                    <div className="price_plan_section_card_price">
                      <div className="card_price_wrapper">
                        <p className="card_price_symbol">৳</p>
                        <h5 className="card_price">{packag?.subscription_package?.price}</h5>
                      </div>
                      <span className="card_price_month">/ Monthly</span>
                    </div>

                    <ul className="card_plan_list_wrapper">
                      <li style={{ textAlign: 'center' }}>Admin Limit {packag?.admin_limit ? packag?.admin_limit : 'Unlimited'}</li>
                      <li style={{ textAlign: 'center' }}>Marchant Limit {packag?.marchant_limit ? packag?.marchant_limit : 'Unlimited'}</li>
                      <li style={{ textAlign: 'center' }}>Rider Limit {packag?.rider_limit ? packag?.rider_limit : 'Unlimited'}</li>
                      <li style={{ textAlign: 'center' }}>Per Month Order Limit {packag?.per_month_order ? packag?.per_month_order : 'Unlimited'}</li>
                      <li style={{ textAlign: 'center' }}>{packag?.live_tracking ? <BsCheckCircleFill className="item_icon_true" size={20} /> : <MdCancel className="item_icon_false" size={24} />} Live Tracking {packag?.export_to_excel ? 'Yes' : 'No'}</li>
                      <li style={{ textAlign: 'center' }}>{packag?.export_to_excel ? <BsCheckCircleFill className="item_icon_true" size={20} /> : <MdCancel className="item_icon_false" size={24} />} Export To Excel {packag?.export_to_excel ? 'Yes' : 'No'}</li>
                      <li style={{ textAlign: 'center' }}>{packag?.export_to_excel ? <BsCheckCircleFill className="item_icon_true" size={20} /> : <MdCancel className="item_icon_false" size={24} />} Export To PDF {packag?.export_to_pdf ? 'Yes' : 'No'}</li>
                      <li style={{ textAlign: 'center' }}>{packag?.export_to_excel ? <BsCheckCircleFill className="item_icon_true" size={20} /> : <MdCancel className="item_icon_false" size={24} />} Rider Mobile APP {packag?.rider_mobile_app ? 'Yes' : 'No'}</li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
