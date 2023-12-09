import React, { useContext } from 'react';
import LoginForm from './components/LoginForm';
import UserContext, { UserContextProvider } from './context/UserContext';
import './App.css';

function App() {
	const userContext = useContext(UserContext);
	console.log(userContext);
	return (
		<UserContextProvider>
			<div className='App'>
				<LoginForm />
			</div>
		</UserContextProvider>
	);
}

export default App;
