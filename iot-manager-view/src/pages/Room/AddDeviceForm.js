import React, { useState } from 'react';
import config from '../../config.json';
import cls from './styles/addDeviceForm.module.css';

const INITIAL_FORM_DATA = {
	alias: '',
	type: '',
	description: '',
};

const AddDeviceForm = ({ roomID }) => {
	const [formData, setFormData] = useState(INITIAL_FORM_DATA);

	const aliasInputHandler = (e) => {
		setFormData({ ...formData, alias: e.target.value });
	};

	const typeInputHandler = (e) => {
		setFormData({ ...formData, type: e.target.value });
	};

	const descriptionInputHandler = (e) => {
		setFormData({ ...formData, description: e.target.value });
	};

	const addDeviceRequest = async () => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					roomid: roomID,
					...formData,
				}),
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<form>
			<div className={cls['form-field']}>
				<label htmlFor='alias'>Alias</label>
				<input
					id='alias'
					name='alias'
					type='text'
					placeholder='alias'
					value={formData.alias}
					onChange={aliasInputHandler}
				/>
			</div>
			<div className={cls['form-field']}>
				<label htmlFor='type'>Type</label>
				<input
					id='type'
					name='type'
					type='text'
					placeholder='type'
					value={formData.type}
					onChange={typeInputHandler}
				/>
			</div>
			<div className={cls['form-field']}>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					type='text'
					placeholder='description'
					value={formData.description}
					onChange={descriptionInputHandler}
				/>
			</div>
			<div className={cls['controls']}></div>
		</form>
	);
};

export default AddDeviceForm;
