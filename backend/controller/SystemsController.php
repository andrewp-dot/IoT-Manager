<?php

include_once 'BaseController.php';
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'SystemsModel.php');

class SystemsController implements BaseController
{
    private $systemsModel;

    public function __construct()
    {
        $this->systemsModel = new SystemsModel();
    }

    public function processRequest($requestedData)
    {
        if ($requestedData['request'] === 'getUserSystem') {
            $userSystems = $this->userSystems($requestedData['login']);
            echo json_encode($userSystems);
        } else if ($requestedData['request'] === 'createSystem') {
            $newUserSystems = $this->createSystem($requestedData['login'], $requestedData['name'], NULL);
            echo json_encode($newUserSystems);
        } else if ($requestedData['request'] === 'changeSystemName') {
            $this->changeSystemName($requestedData['login'], $requestedData['sysid'], $requestedData['newName']);
        } else if ($requestedData['request'] === 'getSingleUserSystem') {
            $userSys = $this->getSingleUserSystem($requestedData['login'], $requestedData['id']);
            echo json_encode($userSys);
        } else if ($requestedData['request'] === 'getSystemRooms') {
            $sysRooms = $this->getSystemRooms($requestedData['sysid']);
            echo json_encode($sysRooms);
        } else if ($requestedData['request'] === 'createRoom') {
            $roomsWithNew = $this->createRoom($requestedData['sysid'], $requestedData['roomName']);
            echo json_encode($roomsWithNew);
        } else if ($requestedData['request'] === 'deleteSystem') {
            $this->deleteSystem($requestedData['sysid']);
            ApiError::reportMessage('System has been deleted succesfuly');
        } else if ($requestedData['request'] === 'editSystem') {
            $this->editSystem($requestedData['sysid'], $requestedData['name'], $requestedData['description']);
            ApiError::reportMessage('Data has been changed succefuly');
        } else {
            ApiError::reportError(400, 'Unhandled type of request.');
        }
    }

    private function userSystems($login)
    {
        $fetchedSystems = $this->systemsModel->getSystemsByUser($login);

        $systems = [];
        foreach ($fetchedSystems as $system) {
            $systems[] = [
                "id" => $system['id'],
                "sysname" => $system['name'],
                "description" => $system['description'],
                "owner" => $system['owner'],
            ];
        }

        return $systems;
    }

    private function createSystem($owner, $name, $desc)
    {
        $this->systemsModel->createSystem([
            "login" => $owner,
            "name" => $name,
            "description" => $desc,
        ]);
        return $this->userSystems($owner);
    }

    private function changeSystemName($login, $sysid, $newName)
    {
        $this->systemsModel->changeSystemName($login, $sysid, $newName);
    }

    private function getSingleUserSystem($login, $sysid)
    {
        $fetchedSystem = $this->systemsModel->getUserSystem($login, $sysid);
        $userSys = [
            "id" => $fetchedSystem['id'],
            "name" => $fetchedSystem['name'],
            "description" => $fetchedSystem['description'],
            "owner" => $fetchedSystem['owner'],
        ];
        return $userSys;
    }

    private function getSystemRooms($sysid)
    {
        $fetchedRooms = $this->systemsModel->getSystemRooms($sysid);

        $deviceModel = new DeviceModel();
        $rooms = [];
        foreach ($fetchedRooms as $room) {

            $fetchedRoomDevices = $deviceModel->getRoomDevices($room['roomid']);

            // get devices for each room
            $roomDevices = [];
            foreach ($fetchedRoomDevices as $device) {
                $roomDevices[] = [
                    "id" => $device['devid'],
                    "alias" => $device['alias'],
                    "status" => $device['status'],
                    "type" => $device['type'],
                    "description" => $device['description'],
                ];
            }

            $rooms[] = [
                "id" => $room['roomid'],
                "name" => $room['name'],
                "devices" => $roomDevices,
            ];
        }

        return $rooms;
    }

    private function createRoom($sysid, $roomName)
    {
        $this->systemsModel->createRoomInSystem($sysid, $roomName);
        return $this->getSystemRooms($sysid);
    }

    private function deleteSystem($sysid)
    {
        $this->systemsModel->deleteSystem($sysid);
    }

    private function editSystem($sysid, $name, $description)
    {
        if (trim($name) === '') {
            $name = 'Unnamed';
        }
        $this->systemsModel->editSystem($sysid, $name, $description);
    }
}
