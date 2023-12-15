import React, { useContext, useEffect, useState } from 'react';
import BasicPage from '../BasicPage';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import config from '../../config.json';
import Card from '../../UI/Card';
import cls from './styles/systems.module.css';
import SystemCard from './SystemCard';
import AddSystemCard from './AddSystemCard';

const FETCH_OPTIONS = {
	method: 'POST',
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'include',
	headers: {
		'Content-Type': 'application/json',
		// 'Content-Type': 'application/x-www-form-urlencoded',
	},
	redirect: 'follow', // manual, *follow, error
	referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when);
	withCredentials: true,
};

/**
 * Maybe create protected component
 * @returns
 */
const SystemsPage = () => {
	const userCtx = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	const [userSystems, setUserSystems] = useState([]);

	const getUserSystems = async () => {
		try {
			const response = await fetch(config.api.systems.url, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when);
				withCredentials: true,
				body: JSON.stringify({ ...userCtx.user, request: 'getUserSystem' }),
			});
			// get response and set data
			if (response.ok) {
				const systems = await response.json();
				setUserSystems(systems);
				console.log(systems);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
		setLoading(false);
	};

	const createSystemRequest = async (systemName) => {
		try {
			const response = await fetch(config.api.systems.url, {
				...FETCH_OPTIONS,
				body: JSON.stringify({
					...userCtx.user,
					name: systemName,
					request: 'createSystem',
				}),
			});
			// get response and set data
			if (response.ok) {
				const systems = await response.json();
				setUserSystems(systems);
				console.log(systems);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getUserSystems();
	}, []);

	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	var content;
	if (loading) {
		content = 'Loading...';
	} else {
		if (userSystems.length > 0) {
			content = userSystems.map((sys) => {
				return <SystemCard key={sys.id} system={sys} />;
			});
		}
	}

	return (
		<BasicPage>
			<div className={cls['systems']}>
				{content}
				<AddSystemCard createSystem={createSystemRequest} />
			</div>
		</BasicPage>
	);
};

export default SystemsPage;
