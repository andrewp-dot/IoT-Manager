<?php

session_start();

require_once 'initialize.php';
include_once 'config.php';
include_once 'router.php';
include_once 'error.php';
include_once CONTROLLERS_PATH . 'Authenticator.php';

$router = new Router();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);
    $controller = $router->getController($_SERVER['REQUEST_URI']);
    if ($controller) {
        $controller->processRequest($requestData);
    } else {
        ApiError::reportError(404, 'Page not found.');
    }
}
