import React, { useContext, useEffect } from 'react';
import GuestNavbar from './GuestNavbar';
import UserContext from '../../context/UserContext';
import cls from './styles/navbar.module.css';
import LoggedUserNavbar from './LoggedUserNavbar';

/**
 * TODO:
 * 1) setup correct paths and nested routes etc
 *  eg. http://localhost/user/systems/:room/:device ...
 * 2) conditional navbar
 */

const NavBar = () => {
	const user = useContext(UserContext);

	return (
		<header className={cls['navbar']}>
			{user.user.role === 'guest' ? (
				<GuestNavbar />
			) : (
				<LoggedUserNavbar user={user.user} />
			)}
		</header>
	);
};

export default NavBar;
