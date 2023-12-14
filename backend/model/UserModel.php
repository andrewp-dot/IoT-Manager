<?php

include_once('IotDatabase.php');

class UserModel extends IotDatabase
{
    public function getUser($login)
    {
        $loginQuery = "SELECT * FROM users WHERE BINARY login = ?";
        $stmt = $this->db->prepare($loginQuery);
        $stmt->execute([$login]);
        return $stmt->fetch();
    }

    public function createUser($registerData)
    {
        $this->db->beginTransaction();
        $registerQuery = "INSERT INTO users (`login`,`email`,`password`,`role`) VALUES (:login, :email, :password, :role)";

        $registerStmt = $this->db->prepare($registerQuery);
        $registerStmt->bindParam(':login', $registerData['login'], PDO::PARAM_STR);
        $registerStmt->bindParam(':email', $registerData['email'], PDO::PARAM_STR);
        $registerStmt->bindParam(':password', $registerData['password'], PDO::PARAM_STR);

        $userRole = 'user';
        $registerStmt->bindParam(':role', $userRole, PDO::PARAM_STR);
        $registerStmt->execute();
        $this->db->commit();
    }
}
