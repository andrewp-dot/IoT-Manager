import React, { useContext } from 'react';
import BasicPage from '../BasicPage';
import { Navigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Card from '../../UI/Card';
import cls from './styles/systems.module.css';

/**
 * Maybe create protected component
 * @returns
 */
const SystemsPage = () => {
	const userCtx = useContext(UserContext);
	if (userCtx.user.role.trim() === 'guest') {
		return <Navigate to='/pageNotFound' />;
	}

	const testArr = ['Test', 'Latka', 'Tutu', 'Sesky', 'Danko'];
	return (
		<BasicPage>
			<div className={cls['systems']}>
				{testArr.map((item) => {
					return (
						<Card width='200px'>
							<p style={{ height: '200px' }}>{item}</p>
						</Card>
					);
				})}
			</div>
		</BasicPage>
	);
};

export default SystemsPage;
