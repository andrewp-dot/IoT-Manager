import React, { useReducer, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { useNavigate } from 'react-router-dom';
import cls from './styles/loginFormStyles.module.css';

const INITIAL_STATE = {
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
	}
};

const RegisterForm = () => {
	// const user = useContext(UserContext);
	const [registerFormData, dispatchRegisterForm] = useReducer(
		reducer,
		INITIAL_STATE
	);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	// const sendFormData = async () => {
	// 	try {
	// 		const response = await fetch(config.api.register.url, {
	// 			method: 'POST',
	// 			mode: 'cors',
	// 			cache: 'no-cache',
	// 			credentials: 'include',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				// 'Content-Type': 'application/x-www-form-urlencoded',
	// 			},
	// 			redirect: 'follow', // manual, *follow, error
	// 			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when);
	// 			withCredentials: true,
	// 			body: JSON.stringify(loginFormData),
	// 		});
	// 		// get response and set data
	// 		if (response.ok) {
	// 			const userData = await response.json();
	// 			user.login(userData.login, userData.role);
	// 			navigate('/systems');
	// 			setError(false);
	// 		} else {
	// 			const errorMessage = await response.json();
	// 			console.log(errorMessage.message);
	// 		}
	// 	} catch (e) {
	// 		// handle error
	// 		console.log(e);
	// 	}
	// };

	const onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(registerFormData);

		// validate if all required data are in here
		// if (loginFormData.login === '' || loginFormData.password === '') {
		// 	setError(true);
		// 	return;
		// }
		// sendFormData();
		// setLoginFormData(LOGIN_DEFAULT);
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
							// className={}
							value={registerFormData.login}
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
							// className={}
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
							// className={}
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
							// className={}
							value={registerFormData.repeatPassword}
							onChange={(e) =>
								dispatchRegisterForm({
									type: 'repeatPwd',
									value: e.target.value,
								})
							}
						/>
					</div>
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
