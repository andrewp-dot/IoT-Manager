<?php

include 'config.php';
/* headers in here */
header('Access-Control-Allow-Origin: ' . ACCESS_ORIGIN);
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Request-Method: POST');
header('Content-Type: application/json');
