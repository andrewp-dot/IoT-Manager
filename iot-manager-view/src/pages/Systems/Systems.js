import React, { useContext, useState } from 'react';
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
	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	const getUserSystems = async () => {
		setLoading(true);

		let systems = [];
		try {
			const response = await fetch(config.api.systems, {
				method: 'GET',
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
			});
			// get response and set data
			if (response.ok) {
				systems = await response.json();
				console.log(systems);
			} else {
				const errorMessage = await response.json();
				console.log(errorMessage);
			}
		} catch (e) {
			console.log(e);
		}

		setLoading(false);
		return systems || [];
	};

	const testArr = ['Test', 'Latka', 'Tutu', 'Sesky', 'Danko'];

	var content;

	if (loading) {
		content = 'Loading...';
	} else {
		content = testArr.map((item) => {
			return (
				<Card width='200px'>
					<p style={{ height: '200px', color: 'var(--color-dark-grey)' }}>
						{item}
					</p>
				</Card>
			);
		});
	}

	return (
		<BasicPage>
			<div className={cls['systems']}>{content}</div>
		</BasicPage>
	);
};

export default SystemsPage;
