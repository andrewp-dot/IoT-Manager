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
            $this->addDevice($requestedData['alias'], $requestedData['type'], $requestedData['roomid']);
            ApiError::reportMessage('Device added succesfuly');
        } else if ($requestedData['request'] === 'deleteDevice') {
            $this->deleteDevice($requestedData['devid']);
            ApiError::reportMessage('Device has been deleted succesfuly');

            /* parameter actions */
        } else if ($requestedData['request'] === 'changeParamValue') {
            $this->changeParameterValue($requestedData);
            ApiError::reportMessage('Param change was succesful');
        } else if ($requestedData['request'] === 'addParam') {
            $this->addParameterToDevice($requestedData);
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
                "parameters" => $this->getDeviceParameters($device['devid']),
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

    private function addDevice($deviceAlias, $deviceType, $roomid)
    {
        $this->deviceModel->addDevice($deviceAlias, $deviceType, $roomid);
    }

    private function deleteDevice($deviceID)
    {
        $this->deviceModel->deleteDevice($deviceID);
    }

    private function genereteValue($min, $max)
    {

        return strval(rand($min, $max));
    }

    private function addParameterToDevice($paramData)
    {
        $value = '';
        // if parameter is stateful, generate random number from 0 35
        if (trim($paramData['type']) === 'state') {
            $value = $this->genereteValue(0, 35);
            // if parameter is type setting generate value from minVal to maxVal
            if (isset($paramData['minVal']) && isset($paramData['maxVal'])) {
                $value = $this->genereteValue($paramData['minVal'], $paramData['maxVal']);
            } else {
                ApiError::reportError(400, 'Missing min or max value');
                return;
            }
        } else if (trim($paramData['type']) === 'setting') {
            // if parameter is function set the function to off
        } else if (trim($paramData['type']) === 'function') {
            $value = 'off';
        } else {
            ApiError::reportError(400, 'Unsupported type of parameter.');
            return;
        }

        $this->deviceModel->addParam($paramData['devid'], $paramData['name'], $value, $paramData['type'], $paramData['minVal'], $paramData['maxVal']);
    }

    private function getDeviceParameters($devid)
    {
        $fetchedParams = $this->deviceModel->getDeviceParameters($devid);

        $params = [];
        foreach ($fetchedParams as $param) {
            $params[] = [
                "paramid" => $param['paramid'],
                "name" => $param['name'],
                "value" => $param['value'],
                "type" => $param['type'],
                "minVal" => $param['minVal'],
                "maxVal" => $param['maxVal'],
            ];
        }

        return $params;
    }

    private function changeParameterValue($paramData)
    {
        if (!isset($paramData['value'])) {
            ApiError::reportError(400, 'Missing value.');
        }

        switch ($paramData['type']) {
            case 'function':
                $this->deviceModel->changeParamValue($paramData['paramid'], $paramData['value']);
                break;
            case 'setting':
                $this->deviceModel->changeParamValue($paramData['paramid'], strval($paramData['value']));
                break;
            default:
                ApiError::reportError(400, 'Unsuported parameter type to change.');
                return;
        }
    }
}
