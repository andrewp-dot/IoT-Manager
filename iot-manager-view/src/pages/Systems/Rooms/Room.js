import React from 'react';
import Card from '../../../UI/Card';
import Checkbox from '../../../UI/Checkbox';
import cls from './styles/rooms.module.css';

const Room = () => {
	const toogleValueChangeHandler = (val) => {
		console.log(val);
	};
	return (
		<Card>
			<div className={cls['room']}>
				<h2>Room name</h2>
				<div className={cls['devices-preview-container']}>
					<div className={cls['devices-preview']}>
						<div className={cls['device-preview']}>
							Device1
							<Checkbox
								id='1'
								value={true}
								onValueChange={toogleValueChangeHandler}
							/>
						</div>
						<div className={cls['device-preview']}>
							Device2
							<Checkbox
								id='2'
								value={false}
								onValueChange={toogleValueChangeHandler}
							/>
						</div>
						<div className={cls['device-preview']}>
							Device3
							<Checkbox
								id='3'
								value={true}
								onValueChange={toogleValueChangeHandler}
							/>
						</div>
						<div className={cls['device-preview']}>
							Device3
							<Checkbox
								id='4'
								value={true}
								onValueChange={toogleValueChangeHandler}
							/>
						</div>
						<div className={cls['device-preview']}>
							Device3
							<Checkbox
								id='3'
								value={true}
								onValueChange={toogleValueChangeHandler}
							/>
						</div>
						<div className={cls['device-preview']}>
							Device3
							<Checkbox
								id='3'
								value={true}
								onValueChange={toogleValueChangeHandler}
							/>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default Room;
