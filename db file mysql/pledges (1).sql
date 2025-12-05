-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 05, 2025 at 06:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diabetes_pledge`
--

-- --------------------------------------------------------

--
-- Table structure for table `pledges`
--

CREATE TABLE `pledges` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `pledge` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pledges`
--

INSERT INTO `pledges` (`id`, `name`, `designation`, `pledge`, `photo`, `created_at`) VALUES
(1, 'r', 'r', 'I pledge to maintain a healthy weight', '1763040566_6915dd36b2e9f.jpg', '2025-11-13 13:29:26'),
(2, 'rr', 'rr', 'I pledge to maintain a healthy weight', '1763040603_6915dd5b4797c.jpg', '2025-11-13 13:30:03'),
(3, 'rr', 'rrr', 'I pledge to maintain a healthy weight', '1763040713_6915ddc9d239b.jpg', '2025-11-13 13:31:53'),
(4, 'rrr', 'rrrr', 'I pledge to avoid smoking tobacco', '1763040807_6915de2708684.jpg', '2025-11-13 13:33:27'),
(5, 'rrr', 'rrrrrrq', 'I pledge to maintain a healthy weight', '1763041298_6915e012e5adb.jpg', '2025-11-13 13:41:38'),
(6, 'a', 'aa', 'I pledge to maintain a healthy weight', '1763041364_6915e0540e167.jpg', '2025-11-13 13:42:44'),
(7, 'my', 'hello developer', 'I pledge to maintain a healthy weight', '1763050437_691603c56afff.jpg', '2025-11-13 16:13:57'),
(8, 'tayyab', 'TA aptech', 'I pledge to maintain a healthy weight', '1763050897_6916059165afd.jpg', '2025-11-13 16:21:37'),
(9, 'palestine flag', 'palestine', 'I pledge to maintain a healthy weight', '1763051849_6916094998e3a.jpg', '2025-11-13 16:37:29'),
(10, 'aptech', 'logo', 'I pledge to maintain a healthy weight', '1763051903_6916097f9b1a0.jpg', '2025-11-13 16:38:23'),
(11, 'Abdul Rehman', 'full stack developer', 'I pledge to keep myself calm and avoid stress', '1763052287_69160aff0ddbe.jpg', '2025-11-13 16:44:47'),
(12, 'abdul rehman', 'full stack developer', 'I pledge to keep myself calm and avoid stress', '1763052392_69160b681f220.jpg', '2025-11-13 16:46:32'),
(13, 'tayya', 'kkk', 'I pledge to keep myself calm and avoid stress', '1763052563_69160c13e3ca9.jpg', '2025-11-13 16:49:23'),
(14, 'hhhh', 'hhhhhhhhhh', 'I pledge to keep myself calm and avoid stress', '1763052616_69160c4893687.jpg', '2025-11-13 16:50:16'),
(15, 'aaaa', 'aaaaaaaa', 'I pledge to keep myself calm and avoid stress', '1763052652_69160c6c9138f.jpg', '2025-11-13 16:50:52'),
(16, 'rehman', 'taaaa', 'I pledge to keep myself calm and avoid stress', '1763052972_69160dace4fca.jpg', '2025-11-13 16:56:12'),
(17, 'aaaaa', 'aaaaaaaaaa', 'I pledge to keep myself calm and avoid stress', '1763053857_69161121b9fa4.jpg', '2025-11-13 17:10:57'),
(18, 'rr', 'rr', 'I pledge to maintain a healthy weight', '1763059967_691628ff70747.jpg', '2025-11-13 18:52:47'),
(19, 'abdul rehman gujjar', 'Developer', 'I pledge to maintain a healthy weight', '1764957251_69331c432e82e.jpg', '2025-12-05 17:54:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pledges`
--
ALTER TABLE `pledges`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pledges`
--
ALTER TABLE `pledges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
