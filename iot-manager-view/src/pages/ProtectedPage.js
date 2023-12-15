import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import BasicPage from './BasicPage';
import { Navigate } from 'react-router-dom';

const ProtectedPage = ({ children }) => {
	const userCtx = useContext(UserContext);
	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	return <BasicPage>{children}</BasicPage>;
};

export default ProtectedPage;
