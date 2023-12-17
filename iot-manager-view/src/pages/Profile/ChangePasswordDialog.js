/**
 * @author xponec01
 * @brief Concrete dialog with change password form.
 */

import React from 'react';
import Dialog from '../../modals/Dialog';
import Card from '../../UI/Card';

/**
 * @param onClose parent component function for closing dialog
 * @returns ChangePasswordDialog component
 */
const ChangePasswordDialog = ({ onClose }) => {
	return (
		<Dialog onClose={onClose}>
			<Card width='200px' height='200px'>
				Change password
			</Card>
		</Dialog>
	);
};

export default ChangePasswordDialog;
