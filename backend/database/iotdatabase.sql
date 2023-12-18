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

DROP TABLE IF EXISTS `devices`;
DROP TABLE IF EXISTS `kpis`;
DROP TABLE IF EXISTS `parameters`;
DROP TABLE IF EXISTS `systems`;
DROP TABLE IF EXISTS `rooms`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `usersys`;

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
  `roomid` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `systemid` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY(`roomid`),
  CONSTRAINT `roomsys` FOREIGN KEY (`systemid`) REFERENCES `systems` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `devices`
--
CREATE TABLE `devices` (
  `devid` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `status` ENUM('on', 'off', 'err') DEFAULT 'on' NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `roomid` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY(`devid`),
  CONSTRAINT `roomid` FOREIGN KEY (`roomid`) REFERENCES `rooms` (`roomid`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `parameters`
--
CREATE TABLE `parameters` (
  `paramid` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` NUM('state', 'function', 'setting') DEFAULT 'state' NOT NULL,
  `minVal` INT,
  `maxVal` INT,
  `devid` varchar(255) NOT NULL,
  PRIMARY KEY(`paramid` , `devid`),
  CONSTRAINT `devid` FOREIGN KEY (`devid`) REFERENCES `devices` (`devid`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- -- Mock data dumps
-- -- --------------------------------------------------------
INSERT INTO `users` (`login`, `email`, `password`, `role`) VALUES
('Ando', 'ando.prvy@gmail.com', 'aaa', 'admin'),
('Bro', 'br.no@yahoo.com', 'aaa', 'user'),
('Cyrci', 'cyrilsta29@gmail.com', 'aaa', 'user'),
('Dav', 'dav.sokol@gmail.com', 'aaa', 'broker');
-- -- -- --------------------------------------------------------
INSERT INTO `systems` ( `name`, `description`,`owner`) VALUES
('system1', 'First system', 'Ando'),
('system2', NULL, 'Bro');
-- -- --------------------------------------------------------
INSERT INTO `usersys` (`userid`, `systemid`) VALUES
('Ando', 2),
('Bro' , 1);
-- -- --------------------------------------------------------
-- INSERT INTO `device` (`id`, `alias`, `status`, `type`, `description`) VALUES
-- ('device1', 'smth1', 'on','air-conditioner', NULL),
-- ('device2', 'smth2', 'off', 'thermometer', NULL),
-- ('device3', 'smth3', 'on','CCTV', 'security devices in house'),
-- ('device4', 'smth4', 'on','thermostat','Thermostat in the first floor');
-- -- --------------------------------------------------------
