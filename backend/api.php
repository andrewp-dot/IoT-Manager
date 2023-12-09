<?php

session_start();

require_once 'initialize.php';
include 'config.php';
include CONTROLLERS_PATH . 'Authenticator.php';


$auth = new Authenticator();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $auth->login($requestData['login'], $requestData['password']);
}

// $auth->login('Bro', 'aassaa');
// $auth->logout();
