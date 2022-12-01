CREATE DATABASE  IF NOT EXISTS `atividade_04` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `atividade_04`;
-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: atividade_04
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu2

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `cpf` char(14) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `sobrenome` varchar(255) NOT NULL,
  `nascimento` date NOT NULL,
  `id_endereco` int DEFAULT NULL,
  PRIMARY KEY (`cpf`),
  KEY `id_endereco` (`id_endereco`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_endereco`) REFERENCES `endereco` (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES ('000.000.000-00','Gabriel','Rocha','2004-07-13',1),('000.000.000-01','Lucas','Henrique','2003-01-16',2),('000.000.000-02','Manuelma','Morescki','2005-09-22',3),('000.000.000-03','Luciana','Forster','1970-03-07',4),('000.000.000-04','Israel','Rocha','1966-11-27',5);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `cep` char(9) NOT NULL,
  `rua` varchar(255) NOT NULL,
  `numero` int NOT NULL,
  `complemento` varchar(255) NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `estado` char(2) NOT NULL,
  `id_endereco` int NOT NULL,
  PRIMARY KEY (`id_endereco`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES ('89254274','Rua Liberato Volpi',64,'Casa','Rau','Jaraguá do Sul','SC',1),('89256213','Rua Bernardo Dornbusch',55,'Casa','Vila Lalau','Jaraguá do Sul','SC',2),('89256213','Rua Bernardo Dornbusch',53,'Casa','Vila Lalau','Jaraguá do Sul','SC',3),('89190000','Angelbert Muller',207,'Casa','Universitário','Taió','SC',4),('89190000','Angelbert Muller',207,'Casa','Universitario','Taió','SC',5);
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_hora` datetime NOT NULL,
  `valor_total` decimal(13,2) NOT NULL,
  `retirada_entrega` enum('retirada','entrega') NOT NULL,
  `id_cliente` char(14) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2022-11-19 22:03:22',51.00,'entrega','000.000.000-00'),(2,'2022-11-19 23:55:22',69.00,'retirada','000.000.000-01'),(3,'2022-11-20 01:04:22',44.00,'entrega','000.000.000-02'),(4,'2022-11-20 01:04:35',61.00,'retirada','000.000.000-03');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza`
--

DROP TABLE IF EXISTS `pizza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tamanho` char(1) NOT NULL,
  `sabor1` int DEFAULT NULL,
  `sabor2` int DEFAULT NULL,
  `sabor3` int DEFAULT NULL,
  `sabor4` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `sabor1` (`sabor1`),
  KEY `sabor2` (`sabor2`),
  KEY `sabor3` (`sabor3`),
  KEY `sabor4` (`sabor4`),
  CONSTRAINT `pizza_ibfk_1` FOREIGN KEY (`sabor1`) REFERENCES `sabores` (`id`),
  CONSTRAINT `pizza_ibfk_2` FOREIGN KEY (`sabor2`) REFERENCES `sabores` (`id`),
  CONSTRAINT `pizza_ibfk_3` FOREIGN KEY (`sabor3`) REFERENCES `sabores` (`id`),
  CONSTRAINT `pizza_ibfk_4` FOREIGN KEY (`sabor4`) REFERENCES `sabores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza`
--

LOCK TABLES `pizza` WRITE;
/*!40000 ALTER TABLE `pizza` DISABLE KEYS */;
INSERT INTO `pizza` VALUES (1,'G',3,4,4,NULL),(2,'F',5,1,4,5),(3,'G',3,5,2,NULL),(4,'F',1,3,4,5);
/*!40000 ALTER TABLE `pizza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pizza_pedido`
--

DROP TABLE IF EXISTS `pizza_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pizza_pedido` (
  `id` bigint NOT NULL,
  `id_pizza` int DEFAULT NULL,
  `id_pedido` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pizza` (`id_pizza`),
  KEY `id_pedido` (`id_pedido`),
  CONSTRAINT `pizza_pedido_ibfk_1` FOREIGN KEY (`id_pizza`) REFERENCES `pizza` (`id`),
  CONSTRAINT `pizza_pedido_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pizza_pedido`
--

LOCK TABLES `pizza_pedido` WRITE;
/*!40000 ALTER TABLE `pizza_pedido` DISABLE KEYS */;
INSERT INTO `pizza_pedido` VALUES (1720560956127,1,1),(1829753454673,2,2),(4474501198199,4,4),(42948762293175,3,3);
/*!40000 ALTER TABLE `pizza_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto`
--

DROP TABLE IF EXISTS `produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `quantidade` int NOT NULL,
  `valor` decimal(13,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1669124077 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto`
--

LOCK TABLES `produto` WRITE;
/*!40000 ALTER TABLE `produto` DISABLE KEYS */;
INSERT INTO `produto` VALUES (2,'Guaraná','bebida',30,4.00),(166912413,'Coca-cola','bebida',50,6.00);
/*!40000 ALTER TABLE `produto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `produto_pedido`
--

DROP TABLE IF EXISTS `produto_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `produto_pedido` (
  `id` bigint NOT NULL,
  `id_pedido` int DEFAULT NULL,
  `id_produto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pedido` (`id_pedido`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `produto_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id`),
  CONSTRAINT `produto_pedido_ibfk_2` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produto_pedido`
--

LOCK TABLES `produto_pedido` WRITE;
/*!40000 ALTER TABLE `produto_pedido` DISABLE KEYS */;
INSERT INTO `produto_pedido` VALUES (1741060578690,2,2),(2719864322397,4,2),(3821585564591,1,2);
/*!40000 ALTER TABLE `produto_pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sabores`
--

DROP TABLE IF EXISTS `sabores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sabores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(13,2) DEFAULT (12.5),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sabores`
--

LOCK TABLES `sabores` WRITE;
/*!40000 ALTER TABLE `sabores` DISABLE KEYS */;
INSERT INTO `sabores` VALUES (1,'Portuguesa',15.00),(2,'Americana',12.00),(3,'Calabresa',12.00),(4,'Strogonoff de carne',15.00),(5,'Strogonoff de frango',15.00);
/*!40000 ALTER TABLE `sabores` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-22 10:36:51
