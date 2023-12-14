<?php

include_once 'controller/LoginController.php';
// include_once 'controller/RegisterController.php';
include_once 'controller/SystemsController.php';
class Router
{
    public function getController($uri) //: BaseController
    {
        switch ($uri) {
            case "/":
                return null;
            case "/login":
                return new LoginController();
            case "/register":
                return null;
            case "/systems":
                    return new SystemsController();
            default:
                return null;
        }
        return null;
    }
}
