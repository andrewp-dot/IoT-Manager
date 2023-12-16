<?php

include_once 'BaseController.php';
include_once 'Authenticator.php';
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'UserModel.php');

class RegisterController implements BaseController
{

    private $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }

    public function processRequest($requestedData)
    {
        if ($requestedData['request'] === 'register') {
            $this->registerUser($requestedData);
        } else {
            ApiError::reportError(400, 'Unhandled type of request.');
        }
    }

    private function registerUser($registerData)
    {
        // if not set all required properties, return error
        if (
            !isset($registerData['login'])
            || !isset($registerData['email'])
            || !isset($registerData['password'])
        ) {
            ApiError::reportError(400, "Bad request.");
            return;
        }

        // get user, if not null, return error
        $userExist = $this->userModel->getUser($registerData['login']);

        if ($userExist) {
            ApiError::reportError(400, "User with the login already exists.");
            return;
        } else {
            $this->userModel->createUser($registerData);

            // login user
            $auth = new Authenticator($this->userModel);
            $auth->login($registerData['login'], $registerData['password']);
        }
    }
}
