<?php

require_once 'initialize.php';

class ApiError
{
    public static function reportError($errCode, $message)
    {
        http_response_code($errCode);
        echo json_encode(["errorCode" => 401, "message" => $message]);
    }
}
