/**
 * @author xponec01
 * @brief Opens dialog with form to add parameter do device
 */

import React, { useState } from 'react';
import Dialog from '../../modals/Dialog';
import cls from './styles/addParameterDialog.module.css';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import config from '../../config.json';

const INITIAL_PARAM = {
	name: '',
	type: 'state',
	minVal: 0,
	maxVal: 0,
};

const AddParamDialog = ({ devid, onClose, onAddParam }) => {
	const [addParamFormData, setAddParamFormData] = useState(INITIAL_PARAM);

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (
			addParamFormData.name.trim() === '' ||
			addParamFormData.type.trim() === '' ||
			(addParamFormData.minVal >= addParamFormData.maxVal &&
				addParamFormData.type === 'setting')
		) {
			return;
		}

		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({
					devid: devid,
					...addParamFormData,
					request: 'addParam',
				}),
			});

			if (response.ok) {
				onAddParam();
			}
			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
		onClose();
	};

	const changeTypeHandler = (e) => {
		setAddParamFormData({ ...addParamFormData, type: e.target.value });
	};

	const changeNameHandler = (e) => {
		setAddParamFormData({ ...addParamFormData, name: e.target.value });
	};

	const changeMinValHandler = (e) => {
		setAddParamFormData({ ...addParamFormData, minVal: e.target.value });
	};
	const changeMaxValHandler = (e) => {
		setAddParamFormData({ ...addParamFormData, maxVal: e.target.value });
	};

	return (
		<Dialog onClose={onClose}>
			<Card>
				<form className={cls['form']} onSubmit={onSubmitHandler}>
					<div className={cls['form-section']}>
						<label htmlFor='name'>Parameter name:</label>
						<input
							name='name'
							id='name'
							type='text'
							value={addParamFormData.name}
							onChange={changeNameHandler}
						/>
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='type'>Parameter type:</label>
						<select
							name='type'
							id='type'
							defaultValue={'state'}
							onChange={changeTypeHandler}
						>
							<option value='state'>State</option>
							<option value='function'>Function</option>
							<option value='setting'>Setting</option>
						</select>
					</div>
					{addParamFormData.type === 'setting' && (
						<>
							<div className={cls['form-section']}>
								<label htmlFor='minVal'>Maximum value</label>
								<input
									name='minVal'
									id='minVal'
									type='number'
									value={addParamFormData.minVal}
									placeholder='Maximum value'
									onChange={changeMinValHandler}
								/>
							</div>
							<div className={cls['form-section']}>
								<label htmlFor='maxVal'>Maximum value</label>
								<input
									name='maxVal'
									id='maxVal'
									type='number'
									value={addParamFormData.maxVal}
									placeholder='Maximum value'
									onChange={changeMaxValHandler}
								/>
							</div>
						</>
					)}
					<div className={cls['controls']}>
						<Button type='click' inverseStyle={true} onClick={onClose}>
							Cancel
						</Button>
						<Button type={'click'} onClick={onSubmitHandler}>
							Add
						</Button>
					</div>
				</form>
			</Card>
		</Dialog>
	);
};

export default AddParamDialog;
