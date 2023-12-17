/**
 * @author xponec01
 * @brief Form for user manipulation in system
 */

import React, { useState } from 'react';
import Card from '../../../UI/Card';
import cls from '../styles/systemDetail.module.css';
import Button from '../../../UI/Button';

const SystemUserHandleForm = ({ action, onClose, userHandler }) => {
	const [login, setUserLogin] = useState('');
	const label = action === 'add' ? 'Add' : 'Remove';

	const loginHandler = (e) => {
		setUserLogin(e.target.value);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (login.trim() === '') {
			return;
		}
		userHandler(login);
		onClose();
	};

	return (
		<Card>
			<form className={cls['user-manipulation-form']}>
				<label htmlFor='user'>{label} user</label>
				<input
					type='text'
					placeholder='login'
					value={login}
					onChange={loginHandler}
				/>
				<div className={'user-manipulation-form-controls'}>
					<Button inverseStyle={true} onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onSubmitHandler}>{label}</Button>
				</div>
			</form>
		</Card>
	);
};

export default SystemUserHandleForm;
