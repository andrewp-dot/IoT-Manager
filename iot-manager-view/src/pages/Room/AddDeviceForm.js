import React, { useState } from 'react';
import config from '../../config.json';
import cls from './styles/addDeviceForm.module.css';
import Button from '../../UI/Button';

const INITIAL_FORM_DATA = {
	alias: '',
	type: '',
};

const AddDeviceForm = ({ roomID, onClose, onRoomAdd }) => {
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);
	const [error, setError] = useState(false);

	const aliasInputHandler = (e) => {
		setFormData({ ...formData, alias: e.target.value });
	};

	const typeInputHandler = (e) => {
		setFormData({ ...formData, type: e.target.value });
	};

	const addDeviceRequest = async () => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					roomid: roomID,
					...formData,
					request: 'addDevice',
				}),
			});

			if (response.ok) {
				onRoomAdd();
			}
			const message = response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (formData.alias.trim() === '' || formData.type.trim() === '') {
			setError(true);
			return;
		}
		setError(false);
		addDeviceRequest();
		onClose();
	};

	return (
		<form className={cls['form']} onSubmit={onSubmitHandler}>
			<div className={cls['form-field']}>
				<label htmlFor='alias'>Alias</label>
				<input
					className={
						error && formData.alias.trim() === '' ? cls['invalid'] : ''
					}
					id='alias'
					name='alias'
					type='text'
					placeholder='Alias'
					value={formData.alias}
					onChange={aliasInputHandler}
				/>
			</div>
			<div className={cls['form-field']}>
				<label htmlFor='type'>Type</label>
				<input
					className={error && formData.type.trim() === '' ? cls['invalid'] : ''}
					id='type'
					name='type'
					type='text'
					placeholder='Type'
					value={formData.type}
					onChange={typeInputHandler}
				/>
			</div>
			<div className={cls['controls']}>
				<Button inverseStyle={true} type='click' onClick={onClose}>
					Cancel
				</Button>
				<Button type='submit'>Add</Button>
			</div>
		</form>
	);
};

export default AddDeviceForm;
