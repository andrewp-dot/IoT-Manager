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

        $systems = [];
        foreach($fetchedSystems as $system)
        {
            $systems[] = [
                "id" => $system['id'],
                "sysname" => $system['name'],
                "desc" => $system['description'],
                "owner" => $system['owner'],
            ];
        }
        return $systems;
    }
}