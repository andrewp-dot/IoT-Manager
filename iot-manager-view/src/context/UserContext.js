import React, { createContext, useState } from 'react';
import { useCookies } from 'react-cookie';

export const DEFAULT_USER = {
	login: localStorage.getItem('user') || '',
	role: localStorage.getItem('role') || 'guest',
	// premissions: [],
};

const DEFAULT_USER_CONTEXT = {
	user: DEFAULT_USER,
	token: '',
	setUserValue: () => {},
};

const UserContext = createContext(DEFAULT_USER_CONTEXT);

export const UserContextProvider = ({ children }) => {
	const [cookies, setCookie, removeCookie] = useCookies(['user_token']);

	const [user, setUser] = useState(DEFAULT_USER);
	return (
		<UserContext.Provider value={{ user, token: cookies.user_token, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserContextConsumer = ({ children }) => {
	return <UserContext.Consumer>{children}</UserContext.Consumer>;
};

export default UserContext;
