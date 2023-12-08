import React, { useState } from 'react';
import cls from './styles/loginFormStyles.module.css';
import Card from '../UI/Card';

const LOGIN_DEFAULT = {
	login: '',
	password: '',
};

const LoginForm = () => {
	const [loginFormData, setLoginFormData] = useState(LOGIN_DEFAULT);

	const loginHandler = (e) => {
		setLoginFormData({ ...loginFormData, login: e.target.value });
	};

	const passwordHandler = (e) => {
		setLoginFormData({ ...loginFormData, password: e.target.value });
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		// check data if they are not empty
		// send data
		// recieve data
		// display data if ok or not
		// if ok continue as logged user
		console.log(loginFormData);
		// reset valuse
		setLoginFormData(LOGIN_DEFAULT);
	};

	return (
		<Card width='400px'>
			<form className={cls['login-form']} onSubmit={onSubmitHandler}>
				<div className={cls['form-section']}>
					<label htmlFor='login'>Login</label>
					<input
						type='text'
						name='login'
						id='login'
						placeholder='Login'
						value={loginFormData.login}
						onChange={loginHandler}
					/>
				</div>
				<div className={cls['form-section']}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
						value={loginFormData.password}
						onChange={passwordHandler}
					/>
				</div>
				<div className={cls['controls']}>
					<input type='submit' value='Send' />
				</div>
			</form>
		</Card>
	);
};

export default LoginForm;
