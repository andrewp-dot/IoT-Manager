import React from 'react';
import Dialog from '../../modals/Dialog';
import Card from '../../UI/Card';

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
