<?php

include 'config.php';
include CONTROLLERS_PATH . 'Authenticator.php';
header('Allow-access-origin:' . ACCESS_ORIGIN);


// call router 


$auth = new Authenticator();
$auth->authenticate('Bro', 'aaaa');


// echo "Under construct...";
// echo ACCESS_ORIGIN;
