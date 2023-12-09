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
        $loginQuery = "SELECT * FROM users WHERE login = ?";
        $stmt = $this->db->prepare($loginQuery);
        $stmt->execute([$login]);
        $user = $stmt->fetch();

        if ($user['password'] == $pwd) {
            echo 'Success: ' . 'User: ' . $login . ' Password: ' . $pwd;
            exit;
        } else {
            echo "Nothing happend";
            // send message about unsuccesful login
            exit;
        }
    }

    public function logout($login)
    {
        // set cookie with expiration of 0
    }
}
