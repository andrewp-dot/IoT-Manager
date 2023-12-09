import React, { createContext, useState } from 'react';

export const DEFAULT_USER = {
	login: localStorage.getItem('user') || '',
	role: localStorage.getItem('role') || 'guest',
	// premissions: [],
};

const DEFAULT_USER_CONTEXT = {
	user: DEFAULT_USER,
	setUserValue: () => {},
};

const UserContext = createContext(DEFAULT_USER_CONTEXT);

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(DEFAULT_USER);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserContextConsumer = ({ children }) => {
	return <UserContext.Consumer>{children}</UserContext.Consumer>;
};

export default UserContext;
