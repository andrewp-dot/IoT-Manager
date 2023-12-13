<?php

include_once 'BaseController.php';
include_once 'Authenticator.php';

class LoginController extends BaseController
{
    public function processRequest($requestedData)
    {
        $authenticator = new Authenticator($this->userModel);
        $authenticator->login($requestedData['login'], $requestedData['password']);
    }
}
