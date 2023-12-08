<?php

require(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

class Authenticator extends IotDatabase
{
    public function authenticate($login, $pwd)
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
            // var_dump($user);
            exit;
        }

        // send error 404
    }
}
