<?php

include_once 'BaseController.php';
include_once 'Authenticator.php';

class LoginController implements BaseController
{
    public function processRequest($requestedData)
    {
        $auth = new Authenticator();
        $auth->login($requestedData['login'], $requestedData['password']);
    }
}
