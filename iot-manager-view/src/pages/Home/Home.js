import React from 'react';
import BasicPage from '../BasicPage';

const Home = () => {
	return (
		<BasicPage>
			<div
				style={{
					marginTop: '40vh',
					fontSize: '4rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				Welcome to the world of IOT
			</div>
		</BasicPage>
	);
};

export default Home;
