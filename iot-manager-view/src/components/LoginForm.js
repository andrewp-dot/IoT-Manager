import React from 'react';
import cls from './styles/loginFormStyles.module.css';
import Card from '../UI/Card';

const LoginForm = () => {
	return (
		<Card width='400px'>
			<form className={cls['login-form']}>
				<div className={cls['form-section']}>
					<label htmlFor='login'>Login</label>
					<input type='text' name='login' id='login' placeholder='Login' />
				</div>
				<div className={cls['form-section']}>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						id='password'
						placeholder='Password'
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
