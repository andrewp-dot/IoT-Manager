<?php

class SystemsModel extends IotDatabase
{

    /**
     * Retrieves all user's systems
     */
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

    /**
     * Creates user system 
     */
    public function createSystem($systemData)
    {
        $this->db->beginTransaction();
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
        $accessSystemStmt->execute();

        // commit changes
        $this->db->commit();
    }


    /**
     * Changes the target system name
     */
    public function changeSystemName($login, $sysid, $newName)
    {
        $this->db->beginTransaction();

        // check if user is the owner 

        // change name 
        $changeSystem = "UPDATE systems
        SET name = ':sysname'
        WHERE id = ':sysid';";
        $changeSystemStmt = $this->db->prepare($changeSystem);
        $changeSystemStmt->bindParam(':name', $newName, PDO::PARAM_STR);
        $changeSystemStmt->bindParam(':sysid', $sysid, PDO::PARAM_INT);

        $this->db->commit();
    }

    /**
     * Retrieves single system by user and system id
     */
    public function getUserSystem($login, $sysid)
    {
    }
}
