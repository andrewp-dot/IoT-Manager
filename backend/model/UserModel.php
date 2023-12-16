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

    public function validateUserByPassword($login, $password): bool
    {
        $user = $this->getUser($login);
        if ($user) {
            $userPwd = $user['password'];
            if ($userPwd === $password) {
                return true;
            } else {
                ApiError::reportError(401, "Invalid Password");
                return false;
            }
        }
        ApiError::reportError(401, "Unknown user.");
        return false;
    }

    public function deleteUser($login, $password)
    {
        if ($this->validateUserByPassword($login, $password)) {
            $this->db->beginTransaction();
            $deleteUserQuery = "DELETE FROM users WHERE login = :login";
            $deleteUserStmt = $this->db->prepare($deleteUserQuery);
            $deleteUserStmt->execute([$login]);
            $this->db->commit();
        }
    }

    public function changeUserPassword($login, $password, $newPassword)
    {
        if ($this->validateUserByPassword($login, $password)) {
            $this->db->beginTransaction();
            $changeUserPwd = "UPDATE users SET 'password' = :newPassword WHERE login = :login";
            $changeUserPwdStmt = $this->db->prepare($changeUserPwd);
            $changeUserPwdStmt->bindParam(':login', $login, PDO::PARAM_STR);
            $changeUserPwdStmt->bindParam(':newPassword', $newPassword, PDO::PARAM_STR);
            $changeUserPwdStmt->execute();
            $this->db->commit();
        }
    }
}
