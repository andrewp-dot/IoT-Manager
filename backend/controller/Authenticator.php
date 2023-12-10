<?php

require_once(__DIR__ . DS . '..' . DS . 'error.php');
require_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

class Authenticator extends IotDatabase
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
            echo json_encode(["notSet" => 403]);
        }
        $loginQuery = "SELECT * FROM users WHERE login = ?";
        $stmt = $this->db->prepare($loginQuery);
        $stmt->execute([$login]);
        $user = $stmt->fetch();

        if ($user) {
            $userPwd = $user['password'];
            if ($userPwd === $pwd) {
                // set cookie
                setcookie('user_token', $user['login'], time() + 60, '/');
                echo json_encode(["login" => $user['login'], "role" => $user['status']]);
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
        // set cookie with expiration of 0
    }
}
