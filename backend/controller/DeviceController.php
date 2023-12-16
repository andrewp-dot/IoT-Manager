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
            $this->getRoomDevices($requestedData['roomid']);
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
        $devices = $this->deviceModel->getRoomDevices($roomid);
        echo json_encode($devices);
    }
}
