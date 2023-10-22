import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { appName, baseUrl } from '../../../config/config';
import { blurDataURL } from '../../../constants/image';
import { accessToken, refreshToken } from '../../../constants/storage';
import CustomImage from '../image/CustomImage';
import { logout, setUser } from '../../../redux/slices/auth';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { faAngleDown, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";

const Header = () => {
	let [menuopen, setMenuopen] = useState(false);
	const dispatch = useDispatch();

	const menu = [
		{
			link: '/',
			title: 'features',
		},
		{
			link: '/price',
			title: 'price',
		},

		// {
		// 	link: '/organization',
		// 	title: 'Create Organization',
		// },
	];
	const router = useRouter();
	const { user: loggedInUserInfo } = useSelector((state) => state.auth);

	// useEffect(() => {
	// 	if (typeof window !== 'undefined') {
	// 		if (localStorage.getItem('userInfo')) {
	// 			let user = JSON.parse(localStorage.getItem('userInfo'));
	// 			dispatch(setUser(user));
	// 		} else {
	// 			router.push('/');
	// 		}
	// 	}
	// }, []);

	console.log('loggedInUserInfo', loggedInUserInfo && loggedInUserInfo);

	const handleLogout = useCallback(() => {
		dispatch(logout());
		router.push('/login');
	}, [dispatch]);

	return <>
        <div className="nav">
            <div className="container">
                <div className="nav-container mobile-nav-container">
                    <div className="nav-logos">
                        <Link href="/" passHref>
                            <div className="nav-logo">
                                <Image
                                    src={'/images/updatetechlogo.png'}
                                    alt="Picture"
                                    fill
                                    sizes="100vw"
                                    style={{
                                        objectFit: "contain"
                                    }} />
                            </div>
                        </Link>
                        <div className="hambarger-menu" onClick={() => setMenuopen(!menuopen)}>
                            {menuopen ? <FontAwesomeIcon icon={faClose} /> : <FontAwesomeIcon icon={faBars} />}
                        </div>
                    </div>

                    <div className={`${menuopen ? 'nav-wrapper nav-wrapper-show mobile-nav-wrapper' : 'nav-wrapper'}`}>
                        <div className="nav-menus mobile-nav-menus">
                            <ul>
                                {menu?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link}>
                                            {item.title} {item?.subMenu ? <FontAwesomeIcon className="nav-menu-icon" icon={faAngleDown} /> : ' '}
                                        </Link>

                                        {item.subMenu?.length > 0 && (
                                            <ul className="sub-menu">
                                                {item?.subMenu?.map((itemSubmenu, submenuIndex) => (
                                                    <li key={submenuIndex}>
                                                        <a href={itemSubmenu.link}>{itemSubmenu.title}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="nav-button">
                            <Link href="/login">Login</Link>
                            <Link href="/signup">Registration</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default Header;
