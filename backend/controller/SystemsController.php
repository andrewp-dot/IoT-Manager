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
        $systems = $this->systemsModel->getSystemsByUser($requestedData['login']);
        echo json_encode($systems);
        return;
    }
}
