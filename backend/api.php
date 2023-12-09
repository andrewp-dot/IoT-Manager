<?php

session_start();

include 'config.php';
include CONTROLLERS_PATH . 'Authenticator.php';

/* headers in here */
header('Access-Control-Allow-Origin: ' . ACCESS_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Request-Method: POST');
header('Content-Type: application/json');

$auth = new Authenticator();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $auth->login($requestData['login'], $requestData['password']);
}

// $auth->login('Bro', 'aassaa');
// $auth->logout();
