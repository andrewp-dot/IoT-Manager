<?php

include_once('IotDatabase.php');

class UserModel extends IotDatabase
{
    public function getUser($login)
    {
        $loginQuery = "SELECT * FROM users WHERE login = ?";
        $stmt = $this->db->prepare($loginQuery);
        $stmt->execute([$login]);
        return $stmt->fetch();
    }
}