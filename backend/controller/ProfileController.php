<?php


include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'UserModel.php');

class ProfileController implements BaseController
{
    private $userModel;

    public function __construct()
    {
        $this->userModel = new UserModel();
    }
    public function processRequest($requestedData)
    {
        if ($requestedData['request'] === 'deleteAccount') {
            $this->deleteAccount($requestedData['login'], $requestedData['password']);
        } else if ($requestedData['request'] === 'changeUserPassword') {
            $this->changeUserPassword($requestedData['login'], $requestedData['password'], $requestedData['newPassword']);
        }
    }

    private function deleteAccount($login, $password)
    {
        $this->userModel->deleteUser($login, $password);
    }

    private function changeUserPassword($login, $password, $newPassword)
    {
        $this->userModel->changeUserPassword($login, $password, $newPassword);
    }
}
