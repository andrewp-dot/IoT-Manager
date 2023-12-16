import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import config from '../../config.json';
import LogoutButton from '../../UI/LogoutButton';
import Button from '../../UI/Button';
import ProtectedPage from '../ProtectedPage';
import QuestionDialog from '../../modals/QuestionDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import cls from './styles/profile.module.css';

const ProfilePage = () => {
	const [openDialog, setOpenDialog] = useState('');
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();

	const openDeleteAccDialog = () => {
		setOpenDialog('deleteAcc');
	};

	const openChangePasswordDialog = () => {
		setOpenDialog('changePassword');
	};

	const closeDialog = () => {
		setOpenDialog('');
	};

	const deleteAccountRequest = async () => {
		try {
			const response = await fetch(config.api.profile.url, {
				...config.fetchOptions,
				body: JSON.stringify({ ...userCtx.user, request: 'deleteAccount' }),
			});

			if (response.ok) {
				const message = response.json();
				console.log(message);
			} else {
				const errorMessage = response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<ProtectedPage>
				<div className={cls['profile']}>
					<div className={cls['user-info']}>
						<div>Email: example.user@gmail.com</div>
						<div>Role: user</div>
					</div>
					<div className={cls['account-options']}>
						<Button inverseStyle={true} onClick={openChangePasswordDialog}>
							Change password
						</Button>
						<LogoutButton
							onClick={() => {
								// userCtx.logout();
								// navigate('/');
								openDeleteAccDialog();
							}}
						>
							Delete account
						</LogoutButton>
						<LogoutButton
							onClick={() => {
								userCtx.logout();
								navigate('/');
							}}
						>
							Logout
						</LogoutButton>
					</div>
				</div>
			</ProtectedPage>
			{openDialog === 'changePassword' && (
				<ChangePasswordDialog onClose={closeDialog} />
			)}
			{openDialog === 'deleteAcc' && (
				<QuestionDialog
					question={'Are you sure you want to delete account?'}
					onClose={closeDialog}
					onYes={() => {
						console.log('Yes');
					}}
					onNo={() => {
						console.log('No');
					}}
				/>
			)}
		</>
	);
};

export default ProfilePage;
