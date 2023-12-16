<?php

include_once(__DIR__ . DS . '..' . DS . 'error.php');
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'UserModel.php');
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

defined('LOGIN_EXPIRATION') ? null : define('LOGIN_EXPIRATION', 600);
class Authenticator
{
    private $userModel;

    public function __construct($userModel)
    {
        $this->userModel = $userModel;
    }
    /**
     * Verifies the user based on session ID in cookie
     */
    public function authenticate()
    {
        // send error 404
    }

    public function login($login, $pwd)
    {
        if (!isset($login) || !isset($pwd)) {
            ApiError::reportError(403, "Required values are not set.");
        }

        // fix login to prevent sql injection
        $user = $this->userModel->getUser($login);

        if ($this->userModel->validateUserByPassword($login, $pwd)) {
            setcookie('user_token', $user['login'], 0, '/');
            echo json_encode(["login" => $user['login'], "role" => $user['role']]);
        }
        exit;
    }

    public function logout($login)
    {
        $user = $this->userModel->getUser($login);
        setcookie('user_token', $user['login'], time() - LOGIN_EXPIRATION, '/');
    }
}
