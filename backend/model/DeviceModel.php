<?php

include_once('IotDatabase.php');
class DeviceModel extends IotDatabase
{
    public function getSingleDevice($devid)
    {
        $getDeviceQuery = "SELECT * from devices WHERE devid = ?";
        $getDeviceStmt = $this->db->prepare($getDeviceQuery);
        $getDeviceStmt->execute([$devid]);
        return $getDeviceStmt->fetch();
    }

    public function setDeviceStatus($devid, $status)
    {
        $this->db->beginTransaction();

        $updateStatusQuery = "UPDATE devices SET status = :status WHERE devid = :devid";
        $updateStatusStmt = $this->db->prepare($updateStatusQuery);
        $updateStatusStmt->bindParam(':devid', $devid, PDO::PARAM_INT);
        $updateStatusStmt->bindParam(':status', $status, PDO::PARAM_STR);
        $updateStatusStmt->execute();

        $this->db->commit();
    }

    public function getRoomDevices($roomid)
    {
        $roomDevicesQuery = "SELECT * FROM devices NATURAL JOIN rooms WHERE roomid = :roomid";
        $roomDevicesStmt = $this->db->prepare($roomDevicesQuery);
        $roomDevicesStmt->bindParam(':roomid', $roomid, PDO::PARAM_INT);
        $roomDevicesStmt->execute();
        return $roomDevicesStmt->fetchAll();
    }
    public function getSingleRoom($roomid)
    {
        $getRoomQuery = "SELECT * FROM rooms WHERE roomid = ?";
        $getRoomStmt = $this->db->prepare($getRoomQuery);
        $getRoomStmt->execute([$roomid]);

        $gotRoom = $getRoomStmt->fetch();
        return $gotRoom;
    }

    public function moveDeviceToRoom($deviceID, $nextRoom)
    {
        $this->db->beginTransaction();

        $moveDeviceQuery = "UPDATE devices SET roomid = :roomid WHERE devid = :devid";

        $moveDeviceStmt = $this->db->prepare($moveDeviceQuery);
        $moveDeviceStmt->bindParam(':devid', $deviceID, PDO::PARAM_INT);
        $moveDeviceStmt->bindParam(':roomid', $nextRoom, PDO::PARAM_INT);
        $moveDeviceStmt->execute();

        $this->db->commit();
    }

    public function addDevice($deviceAlias, $deviceType, $deviceDescription, $roomid)
    {
        $this->db->beginTransaction();

        $addDeviceQuery = "INSERT INTO devices (`alias`,`type`,`description`,`roomid`) VALUES  (:alias , :type , :description , :roomid) ";

        $addDeviceStmt = $this->db->prepare($addDeviceQuery);
        $addDeviceStmt->bindParam(':alias', $deviceAlias, PDO::PARAM_STR);
        $addDeviceStmt->bindParam(':type', $deviceType, PDO::PARAM_STR);
        $addDeviceStmt->bindParam(':description', $deviceDescription, PDO::PARAM_STR);
        $addDeviceStmt->bindParam(':roomid', $roomid, PDO::PARAM_INT);
        $addDeviceStmt->execute();

        $this->db->commit();
    }

    public function deleteDevice($deviceID)
    {
        $this->db->beginTransaction();
        $deleteQuery = "DELETE FROM devices WHERE devid = ?";
        $deleteQueryStmt = $this->db->prepare($deleteQuery);
        $deleteQueryStmt->execute([$deviceID]);

        $this->db->commit();
    }
}
