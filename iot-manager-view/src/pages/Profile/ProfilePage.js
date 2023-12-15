import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import BasicPage from '../BasicPage';
import LogoutButton from '../../UI/LogoutButton';
import { useNavigate, Navigate } from 'react-router-dom';
import cls from './styles/profile.module.css';
import Button from '../../UI/Button';

const ProfilePage = () => {
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();
	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	return (
		<BasicPage>
			<div className={cls['profile']}>
				<div className={cls['user-info']}>
					<div>Email</div>
					<div>Role</div>
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
						}}
					>
						Logout
					</LogoutButton>
					<LogoutButton
						onClick={() => {
							console.log('Delete account');
						}}
					>
						Delete account
					</LogoutButton>
				</div>
			</div>
		</BasicPage>
	);
};

export default ProfilePage;
