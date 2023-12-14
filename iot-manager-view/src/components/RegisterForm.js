import React, { useReducer, useState, useContext } from 'react';
import UserContext from '../context/UserContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { useNavigate } from 'react-router-dom';
import config from '../config.json';
import cls from './styles/loginFormStyles.module.css';
import { act } from 'react-dom/test-utils';

const REGISTER_INITIAL_STATE = {
	login: '',
	email: '',
	password: '',
	repeatPassword: '',
};

const reducer = (state, action) => {
	if (action.type === 'login') {
		return {
			...state,
			login: action.value,
		};
	} else if (action.type === 'email') {
		return {
			...state,
			email: action.value,
		};
	} else if (action.type === 'pwd') {
		return {
			...state,
			password: action.value,
		};
	} else if (action.type === 'repeatPwd') {
		return {
			...state,
			repeatPassword: action.value,
		};
	} else if (action.type === 'reset') {
		return REGISTER_INITIAL_STATE;
	}
};

const RegisterForm = () => {
	const user = useContext(UserContext);
	const [registerFormData, dispatchRegisterForm] = useReducer(
		reducer,
		REGISTER_INITIAL_STATE
	);
	const [error, setError] = useState({ err: false, msg: '' });
	const navigate = useNavigate();

	const sendFormData = async () => {
		try {
			const response = await fetch(config.api.register.url, {
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
				body: JSON.stringify({ ...registerFormData, request: 'register' }),
			});
			// get response and set data
			if (response.ok) {
				const userData = await response.json();
				user.login(userData.login, userData.role);
				dispatchRegisterForm({ type: 'reset', value: '' });
				setError({ err: false, msg: '' });
				navigate('/systems');
			} else {
				const errorMessage = await response.json();
				setError({ err: true, msg: errorMessage.message });
			}
		} catch (e) {
			// handle error
			console.log(e);
		}
	};

	const errorStyle = (inputValue) => {
		const isError = error.err && inputValue.trim() === '';
		return isError ? cls['invalid'] : '';
	};

	const pwdAndRepeatPwdIsMatched = () => {
		return registerFormData.password === registerFormData.repeatPassword;
	};

	const registerDataIsValid = () => {
		if (
			registerFormData.login === '' ||
			registerFormData.email === '' ||
			registerFormData.password === '' ||
			registerFormData.repeatPassword === ''
		) {
			setError({
				err: true,
				msg: 'Please fill all required fields.',
			});
			return false;
		} else if (!pwdAndRepeatPwdIsMatched()) {
			setError({
				err: true,
				msg: 'Password and repeat password does not match.',
			});
			return false;
		}
		return true;
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(registerFormData);

		// validate if all required data are in here
		if (!registerDataIsValid()) {
			return;
		}
		sendFormData();
	};

	const repeatPassowrdErrorStyle = () => {
		if (!pwdAndRepeatPwdIsMatched()) {
			return cls['invalid'];
		}
		return errorStyle(registerFormData.repeatPassword);
	};

	return (
		<>
			<Card width='max(20%,300px)'>
				<form className={cls['login-form']} onSubmit={onSubmitHandler}>
					<div className={cls['form-section']}>
						<label htmlFor='login'>Login</label>
						<input
							type='text'
							name='login'
							id='login'
							placeholder='Login'
							value={registerFormData.login}
							className={errorStyle(registerFormData.login)}
							onChange={(e) =>
								dispatchRegisterForm({ type: 'login', value: e.target.value })
							}
						/>
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='example@mail.com'
							className={errorStyle(registerFormData.email)}
							value={registerFormData.email}
							onChange={(e) =>
								dispatchRegisterForm({ type: 'email', value: e.target.value })
							}
						/>
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Password'
							className={errorStyle(registerFormData.password)}
							value={registerFormData.password}
							onChange={(e) =>
								dispatchRegisterForm({ type: 'pwd', value: e.target.value })
							}
						/>
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='repeatPassowrd'>Repeat password</label>
						<input
							type='password'
							name='repeatPassowrd'
							id='repeatPassowrd'
							placeholder='Repeat password'
							className={repeatPassowrdErrorStyle()}
							value={registerFormData.repeatPassword}
							onChange={(e) =>
								dispatchRegisterForm({
									type: 'repeatPwd',
									value: e.target.value,
								})
							}
						/>
					</div>
					<div className={cls['form-error']}>{error.msg}</div>
					<div className={cls['controls']}>
						{/* maybe display block and ask user if he already has account */}
						<Button
							type='button'
							onClick={() => {
								navigate('/login');
							}}
							inverseStyle={true}
						>
							Sign in
						</Button>
						<Button type='submit'>Register</Button>
					</div>
				</form>
			</Card>
		</>
	);
};

export default RegisterForm;
