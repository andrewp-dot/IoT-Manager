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

// $requestData = json_decode(file_get_contents('php://input'), true);
// echo "Got data: ";
// echo file_get_contents('php://input');

echo json_encode(["success" => 200]);
// var_dump($requestData);
// $auth->login($requestData['login'], $requestData['password']);
// $auth->logout();
