import React from 'react';
import cls from './styles/errorPage.module.css';

const ErrorPage = () => {
	return (
		<div className={cls['error-page']}>
			<h1>Error 404</h1>
			<p>Requested page not found.</p>
		</div>
	);
};

export default ErrorPage;
