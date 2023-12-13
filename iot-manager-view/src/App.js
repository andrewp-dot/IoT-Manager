import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContextProvider } from './context/UserContext';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import RegisterPage from './pages/Register/Register';
import ProfilePage from './pages/Profile/ProfilePage';
import SystemsPage from './pages/Systems/Systems';
import './App.css';

function App() {
	return (
		<UserContextProvider>
			<BrowserRouter>
				<div className='App'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/systems' element={<SystemsPage />} />
						<Route path='*' element={<ErrorPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserContextProvider>
	);
}

export default App;
