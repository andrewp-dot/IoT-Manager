USE `iotdatabase`;

-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `iotdatabase`
--

DROP TABLE IF EXISTS `device`;
DROP TABLE IF EXISTS `kpis`;
DROP TABLE IF EXISTS `parameters`;
DROP TABLE IF EXISTS `systems`;
DROP TABLE IF EXISTS `rooms`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `usersys`;

-- TODO: modes 

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `login` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` ENUM('admin', 'user', 'broker') DEFAULT 'user' NOT NULL,
  PRIMARY KEY(`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `systems`
--
CREATE TABLE `systems` (
  `id` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `owner` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT `owner` FOREIGN KEY (`owner`) REFERENCES `users` (`login`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `usersys`
--
CREATE TABLE `usersys` (
  `userid` varchar(255) NOT NULL,
  `systemid` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY(`userid`, `systemid`),
  CONSTRAINT `ususer` FOREIGN KEY (`userid`) REFERENCES `users` (`login`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ussystem` FOREIGN KEY (`systemid`) REFERENCES `systems` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------
--
-- Table structure for table `rooms`
--
CREATE TABLE `rooms` (
  `id` varchar(255) NOT NULL,
  `systemid` int(10) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY(`id`)
--   CONSTRAINT `deviceuser` FOREIGN KEY (`userid`) REFERENCES `users` (`login`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
  CONSTRAINT `devicesystem` FOREIGN KEY (`systemid`) REFERENCES `systems` (`id`)
    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `device`
--
CREATE TABLE `device` (
  `id` varchar(255) NOT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `status` ENUM('on', 'off', 'err') DEFAULT 'on' NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
--   `userid` varchar(255) NOT NULL,
--   `systemid` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY(`id`)
--   CONSTRAINT `deviceuser` FOREIGN KEY (`userid`) REFERENCES `users` (`login`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE,
--   CONSTRAINT `devicesystem` FOREIGN KEY (`systemid`) REFERENCES `systems` (`id`)
--     ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `parameters`
--
CREATE TABLE `parameters` (
  `id` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` float DEFAULT NULL,
  `deviceid` varchar(255) NOT NULL,
  PRIMARY KEY(`id` , `deviceid`)
--   CONSTRAINT `paramdevice` FOREIGN KEY (`deviceid`) REFERENCES `devices` (`id`)
--     ON DELETE CASCADE
--     ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `kpis`
--
-- CREATE TABLE `kpis` (
--   `id` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
--   `max` float DEFAULT NULL,
--   `min` float DEFAULT NULL,
--   `equals` int(10) DEFAULT NULL,
--   `nequals` int(10) DEFAULT NULL,
--   `paramid` int(10) UNSIGNED NOT NULL,
--   `devid` varchar(255) NOT NULL,
--   PRIMARY KEY(`id`, `paramid`, `devid`),
--   CONSTRAINT `devid_fk` FOREIGN KEY (`devid`) REFERENCES `devices` (`id`),
--   CONSTRAINT `kpiparam` FOREIGN KEY (`paramid`) REFERENCES `parameters` (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -- Mock data dumps
-- -- --------------------------------------------------------
INSERT INTO `users` (`login`, `email`, `password`, `role`) VALUES
('Ando', 'ando.prvy@gmail.com', 'aaa', 'admin'),
('Bro', 'br.no@yahoo.com', 'aaa', 'user'),
('Cyrci', 'cyrilsta29@gmail.com', 'aaa', 'user'),
('Dav', 'dav.sokol@gmail.com', 'aaa', 'broker');
-- -- -- --------------------------------------------------------
-- INSERT INTO `systems` ( `name`, `description`,`owner`) VALUES
-- ('system1', 'First system', 'Ando'),
-- ('system2', NULL, 'Bro');
-- -- --------------------------------------------------------
INSERT INTO `usersys` (`userid`, `systemid`) VALUES
('Ando', 2);
-- -- --------------------------------------------------------
INSERT INTO `device` (`id`, `alias`, `status`, `type`, `description`) VALUES
('device1', 'smth1', 'on','air-conditioner', NULL),
('device2', 'smth2', 'off', 'thermometer', NULL),
('device3', 'smth3', 'on','CCTV', 'security devices in house'),
('device4', 'smth4', 'on','thermostat','Thermostat in the first floor');
-- -- --------------------------------------------------------