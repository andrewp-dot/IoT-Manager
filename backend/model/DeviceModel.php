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

    public function addDevice($deviceAlias, $deviceType, $roomid)
    {
        $this->db->beginTransaction();

        $addDeviceQuery = "INSERT INTO devices (`alias`,`type`,`description`,`roomid`) VALUES  (:alias , :type , :description , :roomid) ";

        $addDeviceStmt = $this->db->prepare($addDeviceQuery);
        $addDeviceStmt->bindParam(':alias', $deviceAlias, PDO::PARAM_STR);
        $addDeviceStmt->bindParam(':type', $deviceType, PDO::PARAM_STR);
        $addDeviceStmt->bindParam(':description', $description, PDO::PARAM_STR);
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

    public function changeParamValue($paramid, $value)
    {
        $this->db->beginTransaction();

        $changeParamValueQuery = "UPDATE parameters SET value = :value WHERE paramid = :paramid";
        $changeParamValueStmt = $this->db->prepare($changeParamValueQuery);
        $changeParamValueStmt->bindParam(':paramid', $paramid, PDO::PARAM_STR);
        $changeParamValueStmt->bindParam(':value', $value, PDO::PARAM_STR);
        $changeParamValueStmt->execute();

        $this->db->commit();
    }

    public function addParam($devid, $name, $value, $type, $minVal, $maxVal)
    {
        $this->db->beginTransaction();

        $addParamQuery = "INSERT INTO parameters (`name`, `value`, `type`, `minVal`, `maxVal`, `devid`) VALUES
        (:name , :value , :type , :minVal , :maxVal , :devid )";
        $addParamStmt = $this->db->prepare($addParamQuery);
        $addParamStmt->bindParam(":name", $name, PDO::PARAM_STR);
        $addParamStmt->bindParam(":value", $value, PDO::PARAM_STR);
        $addParamStmt->bindParam(":type", $type, PDO::PARAM_STR);
        $addParamStmt->bindParam(":minVal", $minVal, PDO::PARAM_INT);
        $addParamStmt->bindParam(":maxVal", $maxVal, PDO::PARAM_INT);
        $addParamStmt->bindParam(":devid", $devid, PDO::PARAM_STR);
        $addParamStmt->execute();

        $this->db->commit();
    }

    public function getDeviceParameters($devid)
    {
        $getDeviceParamsQuery = "SELECT * FROM parameters JOIN devices ON parameters.devid = devices.devid WHERE devices.devid = ?";
        $getDeviceParamsStmt = $this->db->prepare($getDeviceParamsQuery);
        $getDeviceParamsStmt->execute([$devid]);
        return $getDeviceParamsStmt->fetchAll();
    }
}
