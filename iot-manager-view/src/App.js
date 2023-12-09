import React from 'react';
import LoginForm from './components/LoginForm';
import { UserContextProvider } from './context/UserContext';
import './App.css';

function App() {
	return (
		<UserContextProvider>
			<div className='App'>
				<LoginForm />
			</div>
		</UserContextProvider>
	);
}

export default App;
