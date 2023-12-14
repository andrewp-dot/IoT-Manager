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
        foreach ($fetchedSystems as $system) {
            $systems[] = [
                "id" => $system['id'],
                "sysname" => $system['name'],
                "desc" => $system['description'],
                "owner" => $system['owner'],
            ];
        }
        return $systems;
    }

    public function createSystem($systemData)
    {
        // insert system into systems
        $createSystem = "INSERT INTO systems (`name`,`description`,`owner`) VALUES (:name, :description, :owner)";
        $createSystemStmt = $this->db->prepare($createSystem);
        $createSystemStmt->bindParam(':name', $systemData['name'], PDO::PARAM_STR);
        $createSystemStmt->bindParam(':description', $systemData['description'], PDO::PARAM_STR);
        $createSystemStmt->bindParam(':owner', $systemData['login'], PDO::PARAM_STR);
        $createSystemStmt->execute();

        // get last generated id
        $createdSystemId = $this->db->lastInsertId();

        // give access to owner
        $accessSystem = "INSERT INTO usersys (`userid`,`systemid`) VALUES (:userid, :systemid)";
        $accessSystemStmt = $this->db->prepare($accessSystem);
        $accessSystemStmt->bindParam(':userid', $systemData['login'], PDO::PARAM_STR);
        $accessSystemStmt->bindParam(':systemid', $createdSystemId, PDO::PARAM_STR);

        // commit changes
        $this->db->commit();
    }
}
