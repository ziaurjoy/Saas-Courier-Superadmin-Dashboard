import React, { useState, useEffect } from 'react';
import {  BsCheckCircleFill } from 'react-icons/bs';
import { MdCancel } from 'react-icons/md';

import { apiUrl } from '../../../services/api/apiUrls';
import { BaseApiUrl } from '../../../config/config';
import { authApi } from '../../../services/interceptor/auth.interceptor';

const Packages = () => {
  const [packagesData, setPackagesData] = useState()

  const getPackagesData = async () => {
    return await authApi.get(BaseApiUrl + apiUrl.getPriceingData)
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
              {packagesData && packagesData?.map((packag) => (
                <div key={packag.id} className="price_plan_section_card">
                  <div className="price_plan_section_card_title">
                    <h5 className="card_title">{packag?.title}</h5>
                  </div>

                  <div className="price_plan_body">
                    <div className="price_plan_section_card_price">
                      <div className="card_price_wrapper">
                        <p className="card_price_symbol">৳</p>
                        <h5 className="card_price">{packag?.price}</h5>
                      </div>
                      <span className="card_price_month">/ Monthly</span>
                    </div>

                    <ul className="card_plan_list_wrapper">
                      {packag?.features?.map((item, index) => (
                        <li key={index} className="card_plan_list">
                          {item.is_active ? <BsCheckCircleFill className="item_list_icon" size={20} /> : <MdCancel className="item_icon_false" style={{ color: 'rgba(219, 89, 100, 0.895)' }} size={24} />}
                          <p className="item_list_title">{item?.feature}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="price_plan_button">Get Started</button>
                </div>
              ))}
            </div>

            {/* <div className="price_compare_section">
              <h5 className="price_compare_section_title">Compare Plans</h5>

              <div className="price_compare_table_wrapper">
                <table className="price_compare_table">
                  <thead className="price_compare_tablehead">
                    <tr>
                      <th>Features</th>
                      <th>
                        <p>starter</p>
                        <span>$ 125 / Monthly</span>
                      </th>
                      <th>
                        <p>Business</p>
                        <span>$ 125 / Monthly</span>
                      </th>
                      <th>Enterprise </th>
                    </tr>
                  </thead>
                  <tbody className="price_compare_tablebody">
                    {priceCompareItem.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="price_compare_feature_wrapper">
                            <BsArrowRightCircleFill className="item_list_icon" size={18} />
                            <span>{item.feature}</span>
                          </div>
                        </td>
                        <td>
                          {item?.starter === true ? (
                            <BsCheckCircleFill className="item_icon_true" size={20} />
                          ) : (
                            <MdCancel className="item_icon_false" size={24} />
                          )}
                        </td>{' '}
                        <td>
                          {item?.business === true ? (
                            <BsCheckCircleFill className="item_icon_true" size={20} />
                          ) : (
                            <MdCancel className="item_icon_false" size={24} />
                          )}
                        </td>{' '}
                        <td>
                          {item?.enterprise === true ? (
                            <BsCheckCircleFill className="item_icon_true" size={20} />
                          ) : (
                            <MdCancel className="item_icon_false" size={24} />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
