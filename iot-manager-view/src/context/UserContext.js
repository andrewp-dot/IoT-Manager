import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

export const DEFAULT_USER = {
	login: localStorage.getItem('iotManagerUser') || '',
	role: localStorage.getItem('iotManagerUserRole') || 'guest',
};

const DEFAULT_USER_CONTEXT = {
	token: '',
	user: DEFAULT_USER,
	premissions: [],
	login: () => {},
	logout: () => {},
};

const UserContext = createContext(DEFAULT_USER_CONTEXT);

export const UserContextProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['user_token']);

	const [user, setUser] = useState(DEFAULT_USER);

	useEffect(() => {
		if (!cookies.user_token) {
			localStorage.removeItem('iotManagerUser');
			localStorage.removeItem('iotManagerUserRole');
		}
	}, [cookies.user_token]);

	const login = (userLogin, userRole) => {
		setUser({ login: userLogin, role: userRole });
		localStorage.setItem('iotManagerUser', userLogin);
		localStorage.setItem('iotManagerUserRole', userRole);
	};

	const logout = () => {
		setUser({ login: '', role: 'guest' });
		localStorage.removeItem('iotManagerUser');
		localStorage.removeItem('iotManagerUserRole');
		removeCookie('user_token');
	};

	return (
		<UserContext.Provider
			value={{ user, token: cookies.user_token, login, logout }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const UserContextConsumer = ({ children }) => {
	return <UserContext.Consumer>{children}</UserContext.Consumer>;
};

export default UserContext;
