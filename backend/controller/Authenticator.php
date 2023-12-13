<?php

include_once(__DIR__ . DS . '..' . DS . 'error.php');
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'UserModel.php');
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

defined('LOGIN_EXPIRATION') ? null : define('LOGIN_EXPIRATION',600);
class Authenticator extends BaseController
{
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
            ApiError::reportError(403, "notSet");
        }
        
        // fix login to prevent sql injection
        $user = $this->userModel->getUser($login);

        if ($user) {
            $userPwd = $user['password'];
            if ($userPwd === $pwd) {
                // set cookie for 10 min
                setcookie('user_token', $user['login'], time() + LOGIN_EXPIRATION, '/');
                echo json_encode(["login" => $user['login'], "role" => $user['role']]);
                exit;
            } else {
                ApiError::reportError(401, "Password is invalid.");
                exit;
            }
        }
        ApiError::reportError(401, "User unknown.");
        exit;
    }

    public function logout($login)
    {
        $user = $this->userModel->getUser($login);
        setcookie('user_token', $user['login'], time() - LOGIN_EXPIRATION, '/');
    }
}
