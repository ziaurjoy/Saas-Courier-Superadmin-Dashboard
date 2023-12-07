import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link'

import { api } from '../../../services/interceptor/auth.interceptor';
import { BaseApiUrl } from '../../../config/config';
import { apiUrl } from '../../../services/api/apiUrls';


const Footer = () => {
	const [showScroll, setShowScroll] = useState(false);

	const [generalSettingData, setGeneralSettingData] = useState()


	const getGeneralSettingData = async () => {
		return await api.get(BaseApiUrl + apiUrl.publicGeneralSetting)
			.then((res) => {
				setGeneralSettingData(res.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		getGeneralSettingData()
	}, [])


	useEffect(() => {
		window.addEventListener('scroll', checkScrollTop);
		return () => window.removeEventListener('scroll', checkScrollTop);
	}, []);

	const checkScrollTop = () => {
		if (window.pageYOffset > 200) {
			setShowScroll(true);
		} else if (window.pageYOffset <= 200) {
			setShowScroll(false);
		}
	};

	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		setShowScroll(false);
	};
	const footerMenu = [
		{
			link: '/',
			title: 'About Us',
		},
		{
			link: '/',
			title: 'Support',
		},
		{
			link: '/',
			title: 'Contact Us',
		},
		{
			link: '/',
			title: 'Blog',
		},
		{
			link: '/',
			title: 'Features Update',
		},
		{
			link: '/',
			title: 'Food Delivery Software',
		},
		{
			link: '/',
			title: 'zip24.com',
		},
		{
			link: '/',
			title: 'storfox.com',
		},
	];

	return (
		<div>
			<div className="footer-section">
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							{/* <div className="footer-logo">Logo</div> */}
							<div className="footer-logo">
								<img
									src={ generalSettingData?.logo}
									style={{
										height: "100px",
										width: "300px"
									}}
							/>
							</div>
							<div className="footer-social">
								<a href="mailto:example@gmail.com" className="">
									<FontAwesomeIcon className="footer-social-mail" icon={faEnvelope} />
									{generalSettingData?.email}
								</a>
							</div>

							<div className="footer-social-icon">
								<a href="" className="icon">
									<FontAwesomeIcon icon={faFacebook} />
								</a>
								<a href="" className="icon">
									<FontAwesomeIcon icon={faInstagram} />
								</a>
								<a href="" className="icon">
									<FontAwesomeIcon icon={faTwitter} />
								</a>
								<a href="" className="icon">
									<FontAwesomeIcon icon={faLinkedinIn} />
								</a>
							</div>
						</div>
						<div className="col-lg-7">
							<h5>usefull link</h5>
							<div className="footer-usefull-links">
								<ul>
									{footerMenu.map((item, index) => (
										<li key={index}>
											{/* <a href="/">{item.title}</a> */}
											<Link href="/">{item.title}</Link>
										</li>
									))}
									<li>
										{generalSettingData?.phone}
									</li>
									<li>
										{generalSettingData?.address}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-section-end">
				<div className="container">
					<div className="d-flex align-items-center justify-content-between">
						<div> &copy; 2021 All Right Reserved</div>
						<div>
							<a href="">Terms And Conditions</a>
						</div>
					</div>
				</div>
			</div>

			<button
				type="button"
				className={`scroll-to-top position-fixed d-flex align-items-center justify-content-center  ${showScroll ? 'active' : ''}`}
				onClick={scrollTop}
			>
				<FontAwesomeIcon icon={faArrowAltCircleUp} />
			</button>
		</div>
	);
};

export default Footer;
