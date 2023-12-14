<?php

include_once(__DIR__ . DS . '..' . DS . 'error.php');
include_once(__DIR__ . DS . '..' . DS . 'model' . DS . 'IotDatabase.php');

interface BaseController
{
    public function processRequest($requestedData);
}
