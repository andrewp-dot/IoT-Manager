import React, { useContext, useEffect } from 'react';
import GuestNavbar from './GuestNavbar';
import UserContext from '../../context/UserContext';
import LoggedUserNavbar from './LoggedUserNavbar';
import cls from './styles/navbar.module.css';

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
