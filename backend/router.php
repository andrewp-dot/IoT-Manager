<?php

include_once 'controller/LoginController.php';
include_once 'controller/RegisterController.php';
include_once 'controller/SystemsController.php';

// $systemControllerRegex = "/^\/systems(\/?)(\d)*(\/?)(\d)*$/";
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
            default:
                return null;
        }
        return null;
    }
}
