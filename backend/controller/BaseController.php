<?php

include_once(__DIR__ . DS . '..' . DS . 'error.php');
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

interface BaseController
{
    // protected $userModel;
    // protected $systemsModel;
    // protected $deviceModel;

    // public function __construct($userModel, $systemsModel, $deviceModel)
    // public function __construct($userModel)
    // {
    //     $this->userModel = $userModel;
    //     // $this->systemsModel = ;
    //     // $this->deviceModel = ;
    // }
    public function processRequest($requestedData, $method);
}
