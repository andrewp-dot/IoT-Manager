<?php

include 'controller/LoginController.php';
class Router
{
    public function __construct()
    {
        // handle uri in here
        // verify if needed
    }

    public function getController($uri) //: BaseController
    {
        switch ($uri) {
            case "/":
                return null;
            case "/login":
                return new LoginController();
            case "/register":
                return null;
            default:
                return "Not found";
        }
        return null;
    }
}
