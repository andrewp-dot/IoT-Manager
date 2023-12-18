/**
 * @author xponec01
 * @brief homepage
 */

import React from 'react';
import BasicPage from '../BasicPage';

const Home = () => {
	return (
		<BasicPage>
			<div
				style={{
					width: '100vw',
					height: '90vh',
					fontSize: '4rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Welcome to IoT Manager
			</div>
		</BasicPage>
	);
};

export default Home;
