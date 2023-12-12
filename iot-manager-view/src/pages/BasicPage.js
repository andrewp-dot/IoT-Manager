import React from 'react';
import NavBar from '../components/Navbar/Navbar';
import cls from './styles/basicPage.module.css';

const BasicPage = ({ children }) => {
	return (
		<>
			<NavBar />
			<main className={cls['main-content']}>{children}</main>
		</>
	);
};

export default BasicPage;
