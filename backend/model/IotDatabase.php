<?php
require_once "../config.php";


class IotDatabase {
    protected $db;

    public function __construct()
    {
        $this->db = new PDO(DB,DB_USER,DB_PWD,DB_OPTIONS);
    }
}