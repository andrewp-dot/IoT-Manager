<?php

include_once 'BaseController.php';
include_once 'Authenticator.php';
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'UserModel.php');

class LoginController implements BaseController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }
    public function processRequest($requestedData)
    {
        if ($requestedData['request'] === 'login') {
            $authenticator = new Authenticator($this->userModel);
            $authenticator->login($requestedData['login'], $requestedData['password']);
        }
    }
}
