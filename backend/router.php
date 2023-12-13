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

        // create objects for controller
        $userModel = new UserModel();
        switch ($uri) {
            case "/":
                return null;
            case "/login":
                return new LoginController($userModel);
            case "/register":
                return null;
            default:
                return "Not found";
        }
        return null;
    }
}
