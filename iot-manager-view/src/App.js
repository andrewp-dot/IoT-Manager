import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import { UserContextProvider } from './context/UserContext';
import './App.css';
import Home from './pages/Home/Home';

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<div className='App'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<LoginForm />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
