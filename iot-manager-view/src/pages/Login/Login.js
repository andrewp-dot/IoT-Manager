import React from 'react';
import LoginForm from '../../components/LoginForm';
import cls from '../styles/formPage.module.css';

const LoginPage = () => {
	return (
		<div className={cls['form-container']}>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
