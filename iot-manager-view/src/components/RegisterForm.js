import React, { useReducer, useState } from 'react';
import Button from '../UI/Button';
import Card from '../UI/Card';
import { useNavigate } from 'react-router-dom';
import cls from './styles/loginFormStyles.module.css';

const RegisterForm = () => {
	// const user = useContext(UserContext);
	const [error, setError] = useState(false);
	const navigate = useNavigate();

	// const loginHandler = (e) => {
	// 	setLoginFormData({ ...loginFormData, login: e.target.value });
	// };

	// const passwordHandler = (e) => {
	// 	setLoginFormData({ ...loginFormData, password: e.target.value });
	// };

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
							// value={}
							// onChange={}
						/>
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='name'>Name</label>
						<input
							type='text'
							name='name'
							id='name'
							placeholder='Name'
							// className={}
							// value={}
							// onChange={}
						/>
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='surname'>Surname</label>
						<input
							type='text'
							name='surname'
							id='surname'
							placeholder='Surname'
							// className={}
							// value={}
							// onChange={}
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
							// value={}
							// onChange={}
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
							// value={}
							// onChange={}
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
