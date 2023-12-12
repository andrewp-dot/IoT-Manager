import React from 'react';
import { NavLink } from 'react-router-dom';
import cls from './styles/guestNavbar.module.css';

const GuestNavbar = () => {
	return (
		<div className={cls['guest-navbar']}>
			<nav className={cls['guest-nav']}>
				<NavLink
					to='/login'
					className={({ isActive }) => (isActive ? cls['active'] : '')}
				>
					Login
				</NavLink>
				<NavLink
					to='/register'
					className={({ isActive }) => (isActive ? cls['active'] : '')}
				>
					Register
				</NavLink>
			</nav>
		</div>
	);
};

export default GuestNavbar;
