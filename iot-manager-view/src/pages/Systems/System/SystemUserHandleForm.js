/**
 * @author xponec01
 * @brief Form for user manipulation in system
 */

import React, { useState } from 'react';
import Card from '../../../UI/Card';
import cls from '../styles/systemDetail.module.css';

const SystemUserHandleForm = ({ action, onClose, userHandler }) => {
	const [login, setUserLogin] = useState('');
	const label = action === 'add' ? 'Add user' : 'Remove user';

	const loginHandler = (e) => {
		setUserLogin(e.target.value);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (login.trim() === '') {
			return;
		}
		userHandler();
	};

	return (
		<Card>
			<form
				className={cls['user-manipulation-form']}
				onSubmit={onSubmitHandler}
			>
				<label htmlFor='user'>{label}</label>
				<input type='text' value={login} onChange={loginHandler} />
			</form>
		</Card>
	);
};
