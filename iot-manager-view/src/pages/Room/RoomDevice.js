/**
 * @author xponec01
 * @brief Component for display device on room page
 */

import React, { useContext, useState } from 'react';
import RemoveButton from '../../UI/RemoveButton';
import DeviceParams from './Parameters/DeviceParams';
import QuestionDialog from '../../modals/QuestionDialog';
import DeviceSwitch from '../../components/DeviceSwitch/DeviceSwitch';
import UserContext from '../../context/UserContext';
import config from '../../config.json';
import cls from './styles/roomPage.module.css';

/**
 * @param device device data to be desplayed
 * @param onDelete function that updates devices in room
 * @param onStatusChange function that udpate devices in case of status change
 * @returns
 */
const RoomDevice = ({ device, onDelete, onStatusChange }) => {
	const userCtx = useContext(UserContext);
	const [removeDialog, setRemoveDialog] = useState(false);

	const removeDevice = async () => {
		try {
			const response = await fetch(config.api.devices.url, {
				...config.fetchOptions,
				body: JSON.stringify({ devid: device.id, request: 'deleteDevice' }),
			});

			if (response.ok) {
				onDelete();
			}
			const message = await response.json();
			console.log(message);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<div className={cls['device']}>
				<div className={cls['device-header']}>
					<div className={cls['alias']}>{device.alias}</div>
					<div className={cls['status']}>
						<DeviceSwitch
							devid={device.id}
							initialState={device.status}
							onStatusChange={onStatusChange}
						/>
						{device.status}
					</div>
				</div>

				<DeviceParams params={device.params} />
				<div className={cls['controls']}>
					<div className={cls['remove-device']} onClick={onDelete}>
						<RemoveButton
							onClick={() => setRemoveDialog(true)}
							// disabled={userCtx.user.login !== systemOwner}
							disabled={false}
						>
							Remove
						</RemoveButton>
					</div>
				</div>
			</div>
			{removeDialog && (
				<QuestionDialog
					question={`Are you sure you want to delete ${device.alias}?`}
					onClose={() => setRemoveDialog(false)}
					onNo={() => setRemoveDialog(false)}
					onYes={removeDevice}
				/>
			)}
		</>
	);
};

export default RoomDevice;
