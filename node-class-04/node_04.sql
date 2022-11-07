CREATE DATABASE  IF NOT EXISTS `node_04` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `node_04`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: node_04
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cadastro`
--

DROP TABLE IF EXISTS `cadastro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cadastro` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cpf` char(14) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cep` char(9) NOT NULL,
  `rua` varchar(255) NOT NULL,
  `numero` int DEFAULT NULL,
  `bairro` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `uf` char(2) NOT NULL,
  `complemento` varchar(255) NOT NULL,
  `telefone` varchar(14) NOT NULL,
  `celular` char(14) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cadastro`
--

LOCK TABLES `cadastro` WRITE;
/*!40000 ALTER TABLE `cadastro` DISABLE KEYS */;
INSERT INTO `cadastro` VALUES (1,'000.000.000-00','Gabriel Rocha','rocha@gmail.com','89190-000','Angelbert Muller',207,'Universitario','Taió','SC','Casa','(47)3562-0904','(47)99124-8900'),(2,'000.000.000-01','Arthur Meier','thurzin@gmail.com','89254-274','Rua Liberato Volpi',64,'Rau','Jaraguá do Sul','SC','Casa','(47)3562-0902','(47)99124-8901'),(3,'000.000.000-02','Jorginho Melo','jorge@gmail.com','89254-272','Rua Maria Berti Moretti',20,'Rau','Jaraguá do Sul','SC','Apartamento 707, Bloco 2','(47)3562-0912','(47)99124-8912'),(4,'000.000.000-04','Roberta Giga','roberta@gmail.com','89254-285','Rua Emilia Ortiz',90,'Rau','Jaraguá do Sul','SC','Casa','(47)3562-0915','(47)99124-8930'),(5,'000.000.000-05','Amanda Nunes','amanda@gmail.com','89254-290','Rua Anton Frerichs',99,'Rau','Jaraguá do Sul','SC','Casa','(47)3562-0916','(47)99124-8900'),(6,'000.000.000-06','Fernanda Vizin','fernanda@gmail.com','89254-285','Rua Emilia Ortiz',87,'Rau','Jaraguá do Sul','SC','Casa','(47)3562-0890','(47)99124-8912'),(7,'000.000.000-07','Manuela More','manu@gmail.com','89254-284','Rua Bruno Mahnke',80,'Rau','Jaraguá do Sul','SC','Casa','(47)3562-0890','(47)99124-8800'),(8,'000.000.000-08','Eduardo Bizzi','eduardo@gmail.com','89253-332','Rua Guilherme Hass',455,'Jaraguá Esquerdo','Jaraguá do Sul','SC','Casa','(47)3562-1000','(47)99124-2000'),(10,'000.000.000-09','Victor Tavares','victor@gmail.com','89260-285','Rua 1136',80,'Barra do Rio Cerro','Jaraguá do Sul','SC','Casa','(47)3562-1230','(47)99124-8812'),(11,'000.000.000-10','Julia Sonh','julia@gmail.com','89260-275','Rua Claudio Borba',49,'Barra do Rio Cerro','Jaraguá do Sul','SC','Casa','(47)3562-1480','(47)99124-8954'),(12,'000.000.000-11','Isa Dora','isa@gmail.com','89285-275','Rodovia dos Móveis - SC 418',99,'Mato Preto','São Bento do Sul','SC','Casa','(47)3562-0939','(47)99124-8923');
/*!40000 ALTER TABLE `cadastro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-07  8:05:24
