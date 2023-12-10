import React from 'react';
import { UserContextConsumer } from '../context/UserContext';

const Home = () => {
	return (
		<p>
			Home <br />
			<UserContextConsumer>
				{(ctx) => (
					<p>
						Logged as:
						{ctx.user.login} <br />
						In role: {ctx.user.role}
					</p>
				)}
			</UserContextConsumer>
		</p>
	);
};

export default Home;
