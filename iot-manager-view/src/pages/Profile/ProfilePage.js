import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import BasicPage from '../BasicPage';
import LogoutButton from '../../UI/LogoutButton';
import { useNavigate, Navigate } from 'react-router-dom';

const ProfilePage = () => {
	const userCtx = useContext(UserContext);
	const navigate = useNavigate();
	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	return (
		<BasicPage>
			<LogoutButton
				onClick={() => {
					userCtx.logout();
					navigate('/');
				}}
			>
				Logout
			</LogoutButton>
		</BasicPage>
	);
};

export default ProfilePage;
