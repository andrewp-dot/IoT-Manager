import React, { useState, useContext } from 'react';
import cls from './styles/loginFormStyles.module.css';
import Card from '../UI/Card';
import config from '../config.json';
import UserContext from '../context/UserContext';
import Button from '../UI/Button';

const LOGIN_DEFAULT = {
	login: '',
	password: '',
};

const LoginForm = () => {
	const user = useContext(UserContext);
	const [loginFormData, setLoginFormData] = useState(LOGIN_DEFAULT);
	const [error, setError] = useState(false);

	const loginHandler = (e) => {
		setLoginFormData({ ...loginFormData, login: e.target.value });
	};

	const passwordHandler = (e) => {
		setLoginFormData({ ...loginFormData, password: e.target.value });
	};

	const sendFormData = async () => {
		try {
			const response = await fetch(config.backend.url + '/login', {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when);
				withCredentials: true,
				body: JSON.stringify(loginFormData),
			});
			// get response and set data
			if (response.ok) {
				const userData = await response.json();
				user.login(userData.login, userData.role);
				setError(false);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage.message);
			}
		} catch (e) {
			// handle error
			console.log(e);
		}
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		// validate if all required data are in here
		if (loginFormData.login === '' || loginFormData.password === '') {
			setError(true);
			return;
		}
		sendFormData();
		setLoginFormData(LOGIN_DEFAULT);
	};

	return (
		<>
			<Card width='400px'>
				<form className={cls['login-form']} onSubmit={onSubmitHandler}>
					<div className={cls['form-section']}>
						<label htmlFor='login'>Login</label>
						<input
							type='text'
							name='login'
							id='login'
							placeholder='Login'
							className={
								error && loginFormData.login.trim() === '' ? cls['invalid'] : ''
							}
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
							className={
								error && loginFormData.password.trim() === ''
									? cls['invalid']
									: ''
							}
							value={loginFormData.password}
							onChange={passwordHandler}
						/>
					</div>
					<div className={cls['controls']}>
						<Button
							type='button'
							onClick={() => {
								console.log('Register in here');
							}}
							inverseStyle={true}
						>
							Register
						</Button>
						<Button type='submit'>Send</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default LoginForm;
