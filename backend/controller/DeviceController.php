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
}
