<?php

include_once 'controller/LoginController.php';
include_once 'controller/RegisterController.php';
include_once 'controller/SystemsController.php';
include_once 'controller/DeviceController.php';
class Router
{
    public function getController($uri) //: BaseController
    {
        switch ($uri) {
            case "/login":
                return new LoginController();
            case "/register":
                return new RegisterController();
            case "/systems":
                return new SystemsController();
            case "/devices":
                return new DeviceController();
            default:
                return null;
        }
        return null;
    }
}
