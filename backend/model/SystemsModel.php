<?php

class SystemsModel extends IotDatabase 
{
    public function getSystemsByUser($login)
    {
        $systemsQuery = "SELECT systems.*
        FROM systems
        JOIN usersys ON systems.id = usersys.systemid
        JOIN users ON users.login = usersys.userid
        WHERE users.login = ?";
        $systemStmt = $this->db->prepare($systemsQuery);
        $systemStmt->execute([$login]);
        $fetchedSystems = $systemStmt->fetchAll();

        // $systems = [];
        // foreach($fetchedSystems as $system)
        // {
        //     $systems[] = $system;
        // }
        return $fetchedSystems;
    }
}