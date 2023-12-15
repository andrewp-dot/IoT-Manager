<?php

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
            $this->userSystems($requestedData['login']);
        } else if ($requestedData['request'] === 'createSystem') {
            $this->createSystem($requestedData['login'], $requestedData['name'], NULL);
        } else if ($requestedData['request'] === 'changeSystemName') {
            $this->changeSystemName($requestedData['login'], $requestedData['sysid'], $requestedData['newName']);
        }
    }

    private function userSystems($login)
    {
        $systems = $this->systemsModel->getSystemsByUser($login);
        echo json_encode($systems);
    }

    private function createSystem($owner, $name, $desc)
    {
        $this->systemsModel->createSystem([
            "login" => $owner,
            "name" => $name,
            "description" => $desc,
        ]);
        $this->userSystems($owner);
    }

    private function changeSystemName($login, $sysid, $newName)
    {
        $this->systemsModel->changeSystemName($login, $sysid, $newName);
    }
}
