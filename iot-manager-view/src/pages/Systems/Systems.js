import React, { useContext, useEffect, useState } from 'react';
import BasicPage from '../BasicPage';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import config from '../../config.json';
import Card from '../../UI/Card';
import cls from './styles/systems.module.css';

/**
 * Maybe create protected component
 * @returns
 */
const SystemsPage = () => {
	const userCtx = useContext(UserContext);
	const [loading, setLoading] = useState(false);
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
				body: JSON.stringify(userCtx.user),
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

		// setLoading(false);
	};

	useEffect(() => {
		getUserSystems();
	}, []);

	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	const testArr = [
		'Test',
		'Latka',
		'Tutu',
		'Sesky',
		'Danko',
		'Hehe',
		'Kundo',
		'Zeman',
		'Mliekaren senica',
		'Piča vody',
	];

	var content;

	if (loading) {
		content = 'Loading...';
	} else {
		// content = testArr.map((item) => {
		// 	return (
		// 		<Card width='200px'>
		// 			<p style={{ height: '200px', color: 'var(--color-dark-grey)' }}>
		// 				{item}
		// 			</p>
		// 		</Card>
		// 	);
		// });
		if (userSystems.length > 0) {
			content = userSystems.map((sys) => {
				return (
					<Card key={sys.id}>
						<p style={{ color: 'var(--color-dark-grey)' }}>{sys.sysname}</p>
					</Card>
				);
			});
		} else {
			content = <p>No systems has been added yet.</p>;
		}
		// setLoading(true);
	}

	return (
		<BasicPage>
			<div className={cls['systems']}>{content}</div>
		</BasicPage>
	);
};

export default SystemsPage;
