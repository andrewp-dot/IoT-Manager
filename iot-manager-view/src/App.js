import React from 'react';
import LoginForm from './components/LoginForm';
import {
	UserContextConsumer,
	UserContextProvider,
} from './context/UserContext';
import './App.css';

function App() {
	return (
		<UserContextProvider>
			<div className='App'>
				<LoginForm />
				{/* <UserContextConsumer>
					{(ctx) => (
						<button type='button' onClick={() => console.log(ctx.token)}>
							{ctx.token ? 'Display token' : 'Any token to display'}
						</button>
					)}
				</UserContextConsumer> */}
			</div>
		</UserContextProvider>
	);
}

export default App;
