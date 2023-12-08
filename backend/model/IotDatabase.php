<?php

defined('DB_HOST') ? null : define('DB_HOST', 'localhost');
defined('DB_NAME') ? null : define('DB_NAME', 'iotdatabase');
defined('DB_USER') ? null : define('DB_USER', 'iot-manager');
defined('DB_PWD') ? null : define('DB_PWD', 'pwd');
defined('DB_OPTIONS') ? null : define('DB_OPTIONS', null);

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'config.php';
class IotDatabase
{
    protected $db;

    public function __construct()
    {
        try {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
            $this->db = new PDO($dsn, 'iot-manager', 'pwd');
        } catch (PDOException $e) {
            echo "Could not connect to db; Error: " . $e->getMessage();
        }
    }
}
