import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import BasicPage from '../BasicPage';
import UserContext from '../../context/UserContext';
import SystemCard from './SystemCard';
import AddSystemCard from './AddSystemCard';
import cls from './styles/systems.module.css';
import config from '../../config.json';
import ProtectedPage from '../ProtectedPage';

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
				...config.fetchOptions,
				body: JSON.stringify({ ...userCtx.user, request: 'getUserSystem' }),
			});
			// get response and set data
			if (response.ok) {
				const systems = await response.json();
				setUserSystems(systems);
				// console.log(systems);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}
		// setTimeout(() => setLoading(false), 3000);
		setLoading(false);
	};

	const createSystemRequest = async (systemName) => {
		try {
			const response = await fetch(config.api.systems.url, {
				...config.fetchOptions,
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

	var content;
	if (loading) {
		content = 'Loading...';
	} else {
		if (userSystems.length > 0) {
			content = userSystems.map((sys) => {
				return <SystemCard key={sys.id} system={sys} />;
			});
			content.push(
				<AddSystemCard key='create' createSystem={createSystemRequest} />
			);
		}
	}

	return (
		<ProtectedPage>
			<div className={cls['systems']}>{content}</div>
		</ProtectedPage>
	);
};

export default SystemsPage;
