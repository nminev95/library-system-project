-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.5.5-10.5.5-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `mydb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mydb`;

--
-- Table structure for table `ban_status`
--

DROP TABLE IF EXISTS `ban_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ban_status` (
  `idban_status` int(11) NOT NULL AUTO_INCREMENT,
  `isBanned` tinyint(4) NOT NULL DEFAULT 0,
  `description` varchar(45) NOT NULL,
  `expirationDate` date NOT NULL,
  PRIMARY KEY (`idban_status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ban_status`
--

LOCK TABLES `ban_status` WRITE;
/*!40000 ALTER TABLE `ban_status` DISABLE KEYS */;
INSERT INTO `ban_status` VALUES (3,1,'Spreading malware.','2020-12-12');
/*!40000 ALTER TABLE `ban_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `author` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `borrowedStatus_Id` int(11) NOT NULL,
  `borrower_Id` int(11) DEFAULT NULL,
  PRIMARY KEY (`book_Id`),
  KEY `fk_books_borrowed_status1_idx` (`borrowedStatus_Id`),
  KEY `fk_books_users1_idx` (`borrower_Id`),
  CONSTRAINT `fk_books_borrowed_status1` FOREIGN KEY (`borrowedStatus_Id`) REFERENCES `status` (`status_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_users1` FOREIGN KEY (`borrower_Id`) REFERENCES `users` (`user_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'HELLO','Pesho','Peshos Book',2,NULL),(2,'BYE','Gosho','GoshosBook',1,NULL),(3,'asdasd','asdasd','dasdasd',1,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_has_user_history`
--

DROP TABLE IF EXISTS `books_has_user_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books_has_user_history` (
  `books_book_Id` int(11) NOT NULL,
  `user_history_user_Id` int(11) NOT NULL,
  `user_history_users_user_Id` int(11) NOT NULL,
  PRIMARY KEY (`books_book_Id`,`user_history_user_Id`,`user_history_users_user_Id`),
  KEY `fk_books_has_user_history_books1_idx` (`books_book_Id`),
  CONSTRAINT `fk_books_has_user_history_books1` FOREIGN KEY (`books_book_Id`) REFERENCES `books` (`book_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_has_user_history`
--

LOCK TABLES `books_has_user_history` WRITE;
/*!40000 ALTER TABLE `books_has_user_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `books_has_user_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_Id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(45) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `book_Id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  PRIMARY KEY (`review_Id`),
  KEY `fk_reviews_books1_idx` (`book_Id`),
  KEY `fk_reviews_users1_idx` (`user_Id`),
  CONSTRAINT `fk_reviews_books1` FOREIGN KEY (`book_Id`) REFERENCES `books` (`book_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_users1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`user_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'Stupid book',0,1,0),(2,'Very nice book',0,1,0);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_of_user` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `status_Id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`status_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'borrowed'),(2,'unlisted'),(3,'free');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_Id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `banStatus_Id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `user_history` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_Id`),
  KEY `fk_users_ban_status_idx` (`banStatus_Id`),
  KEY `fk_users_roles1_idx` (`role_id`),
  CONSTRAINT `fk_users_ban_status` FOREIGN KEY (`banStatus_Id`) REFERENCES `ban_status` (`idban_status`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'niki','1234','niki_95@abv.bg',0,3,1,NULL),(2,'maria','9999','maria_96@abv.bg',0,3,2,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_has_books`
--

DROP TABLE IF EXISTS `users_has_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_has_books` (
  `users_user_Id` int(11) NOT NULL,
  `books_book_Id` int(11) NOT NULL,
  PRIMARY KEY (`users_user_Id`,`books_book_Id`),
  KEY `fk_users_has_books_books1_idx` (`books_book_Id`),
  KEY `fk_users_has_books_users1_idx` (`users_user_Id`),
  CONSTRAINT `fk_users_has_books_books1` FOREIGN KEY (`books_book_Id`) REFERENCES `books` (`book_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_books_users1` FOREIGN KEY (`users_user_Id`) REFERENCES `users` (`user_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_has_books`
--

LOCK TABLES `users_has_books` WRITE;
/*!40000 ALTER TABLE `users_has_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_has_books` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-01 18:24:30
