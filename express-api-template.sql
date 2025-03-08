-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Mar 08, 2025 at 11:08 AM
-- Server version: 8.0.41
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `express-api-template`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'programmer', '2025-03-03 07:48:06', NULL, NULL),
(2, 'admin', '2025-03-03 07:48:19', NULL, NULL),
(3, 'user', '2025-03-03 07:48:23', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userId` int NOT NULL,
  `userNo` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT 'UUID',
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `prefixId` int NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `roleId` int NOT NULL,
  `userImgProfile` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userId`, `userNo`, `username`, `email`, `prefixId`, `firstName`, `lastName`, `password`, `roleId`, `userImgProfile`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, '6af3359d-513e-436b-8c05-9169c9d97c3a', 'admin', 'admin@system.com', 0, 'admin', 'system', '$2b$12$EYlbfqhfo3XSyQp8XCNC4ee4Km8l/AkQ3GFY0yiJg5wNDloQVRxIm', 2, '/uploads/userImgProfile/3dc7b7db-a819-439c-b978-116ec94ae647-1.png', '2025-02-12 01:40:45', '2025-03-08 04:03:09', NULL),
(2, '6af3359d-513e-436b-8c05-9169c9d97c3b', 'nonpawiz', 'nonpawiz@system.com', 0, 'Nonpawit', 'Thonthong', '$2b$12$EYlbfqhfo3XSyQp8XCNC4ee4Km8l/AkQ3GFY0yiJg5wNDloQVRxIm', 1, '/uploads/userImgProfile/fa41053e-4694-4ab4-81b9-fa56bd97a2a4-2.png', '2025-02-12 02:31:39', '2025-03-08 10:58:48', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `userNo` (`userNo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
