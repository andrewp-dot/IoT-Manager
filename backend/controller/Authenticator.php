<?php

require(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

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
                echo json_encode(["success" => 200]);
                exit;
            } else {
                echo json_encode(["fail" => 403]);
                exit;
            }
        }
        echo json_encode(["fail" => 403]);
        exit;
    }

    public function logout($login)
    {
        // set cookie with expiration of 0
    }
}
