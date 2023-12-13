import React, { useState, useContext } from 'react';
import cls from './styles/loginFormStyles.module.css';
import Card from '../UI/Card';
import config from '../config.json';
import UserContext from '../context/UserContext';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const LOGIN_DEFAULT = {
	login: '',
	password: '',
};

const LoginForm = () => {
	const user = useContext(UserContext);
	const [loginFormData, setLoginFormData] = useState(LOGIN_DEFAULT);
	const [error, setError] = useState({ err: false, msg: '' });
	const navigate = useNavigate();

	const loginHandler = (e) => {
		setLoginFormData({ ...loginFormData, login: e.target.value });
	};

	const passwordHandler = (e) => {
		setLoginFormData({ ...loginFormData, password: e.target.value });
	};

	const sendFormData = async () => {
		try {
			const response = await fetch(config.api.login.url, {
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
				navigate('/systems');
				setError({ err: false, msg: '' });
			} else {
				const errorMessage = await response.json();
				setError({ err: true, msg: errorMessage.message });
			}
		} catch (e) {
			// handle error
			console.log(e);
		}
	};

	const loginDataIsValid = () => {
		if (loginFormData.login === '' && loginFormData.password === '') {
			setError({ err: true, msg: 'Missing login and password.' });
			return false;
		}
		if (loginFormData.login === '') {
			setError({ err: true, msg: 'Missing login.' });
			return false;
		}
		if (loginFormData.password === '') {
			setError({ err: true, msg: 'Missing password.' });
			return false;
		}
		return true;
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (!loginDataIsValid()) {
			console.log('here');
			return;
		}
		sendFormData();
		setLoginFormData(LOGIN_DEFAULT);
	};

	return (
		<>
			<Card width='20%'>
				<form className={cls['login-form']} onSubmit={onSubmitHandler}>
					<div className={cls['form-section']}>
						<label htmlFor='login'>Login</label>
						<input
							type='text'
							name='login'
							id='login'
							placeholder='Login'
							className={
								error.err && loginFormData.login.trim() === ''
									? cls['invalid']
									: ''
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
								error.err && loginFormData.password.trim() === ''
									? cls['invalid']
									: ''
							}
							value={loginFormData.password}
							onChange={passwordHandler}
						/>
					</div>
					<div className={cls['form-error']}>{error.msg}</div>
					<div className={cls['controls']}>
						<Button
							type='button'
							onClick={() => {
								navigate('/register');
							}}
							inverseStyle={true}
						>
							Create Account
						</Button>
						<Button type='submit'>Login</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default LoginForm;
