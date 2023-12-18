/**
 * @author xponec01
 * @brief Component that returns profile page of the user
 */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import config from '../../config.json';
import RemoveButton from '../../UI/RemoveButton';
import ProtectedPage from '../ProtectedPage';
import QuestionDialog from '../../modals/QuestionDialog';
import ChangePasswordDialog from './ChangePasswordDialog';
import cls from './styles/profile.module.css';

const ProfilePage = () => {
	const [openDialog, setOpenDialog] = useState('');
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();

	// const openDeleteAccDialog = () => {
	// 	setOpenDialog('deleteAcc');
	// };

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
				userCtx.logout();
				navigate('/');
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
						<div>Role: {userCtx.user.role}</div>
					</div>
					<div className={cls['account-options']}>
						{/* <RemoveButton
							onClick={() => {
								openDeleteAccDialog();
							}}
						>
							Delete account
						</RemoveButton> */}
						<RemoveButton
							onClick={() => {
								userCtx.logout();
								navigate('/');
							}}
						>
							Logout
						</RemoveButton>
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
						deleteAccountRequest();
					}}
					onNo={closeDialog}
				/>
			)}
		</>
	);
};

export default ProfilePage;
