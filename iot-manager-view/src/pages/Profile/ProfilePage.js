import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import config from '../../config.json';
import LogoutButton from '../../UI/LogoutButton';
import Button from '../../UI/Button';
import ProtectedPage from '../ProtectedPage';
import cls from './styles/profile.module.css';

const ProfilePage = () => {
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();

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
		<ProtectedPage>
			<div className={cls['profile']}>
				<div className={cls['user-info']}>
					<div>Email: example.user@gmail.com</div>
					<div>Role: user</div>
				</div>
				<div className={cls['account-options']}>
					<Button
						inverseStyle={true}
						onClick={() => {
							console.log('Change Password');
						}}
					>
						Change password
					</Button>
					<LogoutButton
						onClick={() => {
							userCtx.logout();
							navigate('/');
							console.log('Delete account');
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
	);
};

export default ProfilePage;
