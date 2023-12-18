CREATE USER 'iot-manager'@'localhost' IDENTIFIED BY 'pwd';

GRANT ALL PRIVILEGES ON iotdatabase.* TO 'iot-manager'@'localhost';

FLUSH PRIVILEGES;

CREATE DATABASE iotdatabase;
