-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Creato il: Gen 24, 2024 alle 10:41
-- Versione del server: 8.0.31
-- Versione PHP: 8.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Memory`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `Partite`
--

CREATE TABLE `Partite` (
  `id` int NOT NULL,
  `username_id` int NOT NULL,
  `vittoria` int DEFAULT '0',
  `sconfitta` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Partite`
--

INSERT INTO `Partite` (`id`, `username_id`, `vittoria`, `sconfitta`) VALUES
(3, 52, 1, 1),
(4, 53, 0, 4),
(5, 54, 0, 0),
(6, 55, 0, 1),
(7, 56, 0, 0),
(8, 57, 0, 0),
(9, 58, 0, 0),
(10, 59, 0, 0),
(11, 60, 0, 0),
(12, 61, 1, 0),
(13, 62, 2, 1),
(14, 63, 1, 2),
(15, 64, 0, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `Username`
--

CREATE TABLE `Username` (
  `id` int NOT NULL,
  `user` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dump dei dati per la tabella `Username`
--

INSERT INTO `Username` (`id`, `user`) VALUES
(60, 'ace'),
(63, 'ale'),
(54, 'ciccio'),
(58, 'Domenico'),
(57, 'giovanni'),
(59, 'luffy'),
(56, 'mamma'),
(55, 'papa'),
(61, 'peppa pig'),
(52, 'piero'),
(62, 'sili'),
(53, 'silvia'),
(64, 'vitto');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `Partite`
--
ALTER TABLE `Partite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username_id` (`username_id`);

--
-- Indici per le tabelle `Username`
--
ALTER TABLE `Username`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user` (`user`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `Partite`
--
ALTER TABLE `Partite`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT per la tabella `Username`
--
ALTER TABLE `Username`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `Partite`
--
ALTER TABLE `Partite`
  ADD CONSTRAINT `Partite_ibfk_1` FOREIGN KEY (`username_id`) REFERENCES `Username` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
