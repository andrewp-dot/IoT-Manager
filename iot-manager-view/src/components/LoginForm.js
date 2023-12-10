import React, { useState, useContext } from 'react';
import cls from './styles/loginFormStyles.module.css';
import Card from '../UI/Card';
import config from '../config.json';
import UserContext, { UserContextConsumer } from '../context/UserContext';

const LOGIN_DEFAULT = {
	login: '',
	password: '',
};

const LoginForm = () => {
	const { user, setUser } = useContext(UserContext);
	const [loginFormData, setLoginFormData] = useState(LOGIN_DEFAULT);
	const [error, setError] = useState(false);

	const loginHandler = (e) => {
		setLoginFormData({ ...loginFormData, login: e.target.value });
	};

	const passwordHandler = (e) => {
		setLoginFormData({ ...loginFormData, password: e.target.value });
	};

	const sendFormData = async () => {
		const response = await fetch(config.backend.url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'include', // include, *same-origin, omit
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
			const jsonData = await response.json();
			// function for this
			localStorage.setItem('iotManagerUser', jsonData.login);
			localStorage.setItem('iotManagerUserRole', jsonData.role);
			setUser({ ...user, login: jsonData.login, role: jsonData.role });
			setError(false);
		} else {
			const errorMessage = await response.json();
			console.log(errorMessage.message);
		}
	};

	const logout = () => {
		// send data for logout
		setUser({ ...user, login: '', role: 'guest' });
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
						<button type='button' onClick={logout}>
							Logout
						</button>
					</div>
				</form>
			</Card>
			<UserContextConsumer>
				{(ctx) => (
					<p>
						User: {ctx.user.login}, Role {ctx.user.role}
					</p>
				)}
			</UserContextConsumer>
		</>
	);
};

export default LoginForm;
