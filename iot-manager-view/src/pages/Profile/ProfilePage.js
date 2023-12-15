import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import BasicPage from '../BasicPage';
import LogoutButton from '../../UI/LogoutButton';
import { useNavigate, Navigate } from 'react-router-dom';
import cls from './styles/profile.module.css';
import Button from '../../UI/Button';
import ProtectedPage from '../ProtectedPage';

const ProfilePage = () => {
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();

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
