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
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `usersys`;

-- --------------------------------------------------------
--
-- Table structure for table `users`
--
CREATE TABLE `users` (
  `login` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` ENUM('admin', 'registered user', 'broker') DEFAULT 'registered user' NOT NULL,
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
  `userid` varchar(255) NOT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT `systemuser` FOREIGN KEY (`userid`) REFERENCES `users` (`login`)
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
  `isMaintainer` int(1) UNSIGNED NOT NULL,
  PRIMARY KEY(`userid`, `systemid`),
  CONSTRAINT `ususer` FOREIGN KEY (`userid`) REFERENCES `users` (`login`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `ussystem` FOREIGN KEY (`systemid`) REFERENCES `systems` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


-- --------------------------------------------------------
--
-- Table structure for table `devices`
--
CREATE TABLE `devices` (
  `id` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `userid` varchar(255) NOT NULL,
  `systemid` int(10) UNSIGNED DEFAULT NULL,
  PRIMARY KEY(`id`),
  CONSTRAINT `deviceuser` FOREIGN KEY (`userid`) REFERENCES `users` (`login`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `devicesystem` FOREIGN KEY (`systemid`) REFERENCES `systems` (`id`)
    ON DELETE SET NULL
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
  PRIMARY KEY(`id` , `deviceid`),
  CONSTRAINT `paramdevice` FOREIGN KEY (`deviceid`) REFERENCES `devices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------
--
-- Table structure for table `kpis`
--
CREATE TABLE `kpis` (
  `id` int(10) UNSIGNED AUTO_INCREMENT NOT NULL,
  `max` float DEFAULT NULL,
  `min` float DEFAULT NULL,
  `equals` int(10) DEFAULT NULL,
  `nequals` int(10) DEFAULT NULL,
  `paramid` int(10) UNSIGNED NOT NULL,
  `devid` varchar(255) NOT NULL,
  PRIMARY KEY(`id`, `paramid`, `devid`),
  CONSTRAINT `devid_fk` FOREIGN KEY (`devid`) REFERENCES `devices` (`id`),
  CONSTRAINT `kpiparam` FOREIGN KEY (`paramid`) REFERENCES `parameters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Mock data dumps
-- --------------------------------------------------------
INSERT INTO `users` (`login`, `name`, `surname`, `password`, `status`) VALUES
('Ando', 'Andrej', 'Prvý', 'aaa', 'admin'),
('Bro', 'Braňo', 'Novotný', 'aaa', 'registered user'),
('Cyrci', 'Cyril', 'Starší', 'aaa', 'registered user'),
('Dav', 'David', 'Sokol', 'aaa', 'broker');
-- --------------------------------------------------------
INSERT INTO `systems` (`id`, `name`, `description`, `userid`) VALUES
(1, 'system1', 'nothing to say', 'Ando'),
(2, 'system2', NULL, 'Bro');
-- --------------------------------------------------------
INSERT INTO `usersys` (`userid`, `systemid`, `isMaintainer`) VALUES
('Ando', 2, 0);
-- --------------------------------------------------------
INSERT INTO `devices` (`id`, `type`, `alias`, `description`, `userid`, `systemid`) VALUES
('device1', 'smth1', 'd1', 'super device', 'Ando', 1),
('device2', 'smth2', 'd2', NULL, 'Bro', 2),
('device3', 'smth3', NULL, 'good device', 'Bro', 2),
('device4', 'smth4', NULL, NULL, 'Bro', NULL);
-- --------------------------------------------------------
INSERT INTO `parameters` (`name`, `value`, `deviceid`) VALUES
( 'Temperature', 24.3, 'device1'),
( 'Humidity', 54.1, 'device1'),
( 'Pressure', 99.54, 'device1'),
( 'Voltage', 1.48, 'device2'),
( 'Battery Level', 87.6, 'device2');

-- --------------------------------------------------------
INSERT INTO `kpis` (`id`, `max`, `min`, `equals`, `nequals`, `paramid`,  `devid`) VALUES
(1, 0, 100, NULL, NULL, 1, 'device1'),
(2, NULL, NULL, NULL, 0, 2, 'device2'),
(3, NULL, NULL, NULL, 10, 2, 'device1');