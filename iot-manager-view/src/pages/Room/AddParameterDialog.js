/**
 * @author xponec01
 * @brief Opens dialog with form to add parameter do device
 */

import React, { useState } from 'react';
import Dialog from '../../../modals/Dialog';
import cls from './styles/addParamDialog.module.css';
import Card from '../../UI/Card';

const INITIAL_PARAM = {
	name: '',
	type: '',
};

const AddParamDialog = ({ onClose }) => {
	const [addParamFormData, setAddParamFormData] = useState();

	return (
		<Dialog onClose={onClose}>
			<Card>
				<form className={cls['form']}>
					<div className={cls['form-section']}>
						<label htmlFor='name'>Parameter name:</label>
						<input type='text' />
					</div>
					<div className={cls['form-section']}>
						<label htmlFor='name'>Parameter name:</label>
						<input type='text' />
					</div>
				</form>
			</Card>
		</Dialog>
	);
};

export default AddParamDialog;
