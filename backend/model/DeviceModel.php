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
}
