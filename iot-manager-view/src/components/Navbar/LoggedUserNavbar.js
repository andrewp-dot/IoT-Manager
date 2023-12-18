import React from 'react';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
import { NavLink, useLocation } from 'react-router-dom';
import cls from './styles/userNavbar.module.css';

const LoggedUserNavbar = ({ user }) => {
	const location = useLocation();
	return (
		<div className={cls['user-navbar']}>
			<nav className={cls['user-nav']}>
				{location.pathname !== '/' && <GoBackButton />}
				<NavLink
					to='/'
					className={({ isActive }) => (isActive ? cls['active'] : '')}
				>
					Home
				</NavLink>
				<NavLink
					to='/systems'
					className={({ isActive }) => (isActive ? cls['active'] : '')}
				>
					My systems
				</NavLink>
				<NavLink
					to='/profile'
					className={({ isActive }) => (isActive ? cls['active'] : '')}
				>
					Profile
				</NavLink>
			</nav>
			<div className={cls['login-info']}>You are logged as {user.login}</div>
		</div>
	);
};

export default LoggedUserNavbar;
