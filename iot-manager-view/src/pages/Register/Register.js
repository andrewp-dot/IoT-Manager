import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import cls from '../styles/formPage.module.css';

const RegisterPage = () => {
	return (
		<div className={cls['form-container']}>
			<RegisterForm />
		</div>
	);
};

export default RegisterPage;
