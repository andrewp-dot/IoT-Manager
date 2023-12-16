<?php

require_once 'initialize.php';

class ApiError
{
    public static function reportError($errCode, $message)
    {
        http_response_code($errCode);
        echo json_encode(["errorCode" => $errCode, "message" => $message]);
    }

    public static function reportMessage($message)
    {
        echo json_encode(["errorCode" => 200, "message" => $message]);
    }
}
