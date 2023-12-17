<?php

include_once 'BaseController.php';
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'DeviceModel.php');

class DeviceController implements BaseController
{
    private $deviceModel;
    public function __construct()
    {
        $this->deviceModel = new DeviceModel();
    }

    public function processRequest($requestedData)
    {
        if ($requestedData['request'] === 'setDeviceStatus') {
            $this->setDeviceStatus($requestedData['devid'], $requestedData['status']);
        } else if ($requestedData['request'] === 'getRoomDevices') {
            $roomDevices = $this->getRoomDevices($requestedData['roomid']);
            echo json_encode($roomDevices);
        } else if ($requestedData['request'] === 'getRoom') {
            $room = $this->getRoom($requestedData['roomid']);
            echo json_encode($room);
        } else if ($requestedData['request'] === 'moveDeviceToRoom') {
            $this->moveDeviceToRoom($requestedData['devid'], $requestedData['nextRoom']);
            ApiError::reportMessage('Device moved succesfuly');
        } else if ($requestedData['request'] === 'addDevice') {
            $this->addDevice($requestedData['alias'], $requestedData['type'], $requestedData['description'], $requestedData['roomid']);
            ApiError::reportMessage('Device added succesfuly');
        } else if ($requestedData['request'] === 'deleteDevice') {
            $this->deleteDevice($requestedData['devid']);
            ApiError::reportMessage('Device has been deleted succesfuly');
        } else {
            ApiError::reportError(400, 'Unhandled type of request.');
        }
    }

    private function setDeviceStatus($devid, $status)
    {
        $device = $this->deviceModel->getSingleDevice($devid);

        if ($device) {
            $this->deviceModel->setDeviceStatus($devid, $status);
            ApiError::reportMessage("$devid : $status");
        } else {
            ApiError::reportMessage("Device not found.");
        }
    }

    private function getRoomDevices($roomid)
    {
        $fetchedDevices = $this->deviceModel->getRoomDevices($roomid);
        $devices = [];
        foreach ($fetchedDevices as $device) {
            $devices[] = [
                "id" => $device['devid'],
                "alias" => $device['alias'],
                "status" => $device['status'],
                "type" => $device['type'],
                "description" => $device['description'],
            ];
        }
        return $devices;
    }

    private function getRoom($roomid)
    {
        $fetchedRoom = $this->deviceModel->getSingleRoom($roomid);
        $devices = $this->getRoomDevices($roomid);
        $room = [
            "id" => $fetchedRoom['roomid'],
            "name" => $fetchedRoom['name'],
            "devices" => $devices,
        ];

        return $room;
    }

    private function moveDeviceToRoom($deviceID, $nextRoom)
    {
        $this->deviceModel->moveDeviceToRoom($deviceID, $nextRoom);
    }

    private function addDevice($deviceAlias, $deviceType, $deviceDescription, $roomid)
    {
        $this->deviceModel->addDevice($deviceAlias, $deviceType, $deviceDescription, $roomid);
    }

    private function deleteDevice($deviceID)
    {
        $this->deviceModel->deleteDevice($deviceID);
    }
}
