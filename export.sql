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
  `isBanned` tinyint(4) NOT NULL DEFAULT 1,
  `description` varchar(45) NOT NULL,
  `expirationDate` date NOT NULL,
  `user_Id` int(11) NOT NULL,
  PRIMARY KEY (`idban_status`),
  KEY `fk_ban_status_users1_idx` (`user_Id`),
  CONSTRAINT `fk_ban_status_users1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`user_Id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ban_status`
--

LOCK TABLES `ban_status` WRITE;
/*!40000 ALTER TABLE `ban_status` DISABLE KEYS */;
INSERT INTO `ban_status` VALUES (19,1,'mqqqdddddddddddddddddddddddddddddddddddqariq','1995-12-22',8);
/*!40000 ALTER TABLE `ban_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_ratings`
--

DROP TABLE IF EXISTS `book_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_ratings` (
  `rating_Id` int(11) NOT NULL AUTO_INCREMENT,
  `rating_value` int(11) NOT NULL,
  PRIMARY KEY (`rating_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_ratings`
--

LOCK TABLES `book_ratings` WRITE;
/*!40000 ALTER TABLE `book_ratings` DISABLE KEYS */;
INSERT INTO `book_ratings` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `book_ratings` ENABLE KEYS */;
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
  `borrower_Id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`book_Id`),
  KEY `fk_books_borrowed_status1_idx` (`borrowedStatus_Id`),
  CONSTRAINT `fk_books_borrowed_status1` FOREIGN KEY (`borrowedStatus_Id`) REFERENCES `status` (`status_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (4,'HELLO','Pesho','Peshos book.',6,'0'),(5,'Gosho Goshov','maikatiIIII','A book about maikati.',6,'0'),(8,'updateeeee','Hehehehe','hahahaha',5,'0'),(10,'book test2','admina','hahahaha',4,'9'),(11,'book test552','admina','hahahaha',4,'8'),(12,'asdsadas','hahahaha','neeeeee',6,'0'),(13,'ddddddd','ddddddda','ddddddddddddddddddddddddddd',6,'0'),(14,'na','azzzz','lud summm',6,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books_has_book_ratings`
--

DROP TABLE IF EXISTS `books_has_book_ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books_has_book_ratings` (
  `book_to_be_rated_Id` int(11) NOT NULL,
  `rating_Id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  KEY `fk_books_has_book_ratings_book_ratings1_idx` (`rating_Id`),
  KEY `fk_books_has_book_ratings_books1_idx` (`book_to_be_rated_Id`),
  CONSTRAINT `fk_books_has_book_ratings_book_ratings1` FOREIGN KEY (`rating_Id`) REFERENCES `book_ratings` (`rating_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_has_book_ratings_books1` FOREIGN KEY (`book_to_be_rated_Id`) REFERENCES `books` (`book_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books_has_book_ratings`
--

LOCK TABLES `books_has_book_ratings` WRITE;
/*!40000 ALTER TABLE `books_has_book_ratings` DISABLE KEYS */;
INSERT INTO `books_has_book_ratings` VALUES (4,5,0),(4,1,0),(4,3,0),(4,1,0),(12,5,0),(12,5,0),(10,5,10),(4,5,10),(11,4,10);
/*!40000 ALTER TABLE `books_has_book_ratings` ENABLE KEYS */;
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
  CONSTRAINT `fk_reviews_users1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`user_Id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (3,'Very nice book.',0,4,8),(4,'Stupid book.',0,4,8);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews_have_votes`
--

DROP TABLE IF EXISTS `reviews_have_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews_have_votes` (
  `review_Id` int(11) NOT NULL,
  `vote_Id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  KEY `fk_reviews_votes_has_reviews_reviews1_idx` (`review_Id`),
  KEY `fk_reviews_votes_has_reviews_reviews_votes1_idx` (`vote_Id`),
  CONSTRAINT `fk_reviews_votes_has_reviews_reviews1` FOREIGN KEY (`review_Id`) REFERENCES `reviews` (`review_Id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_votes_has_reviews_reviews_votes1` FOREIGN KEY (`vote_Id`) REFERENCES `reviews_votes` (`vote_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews_have_votes`
--

LOCK TABLES `reviews_have_votes` WRITE;
/*!40000 ALTER TABLE `reviews_have_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews_have_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews_votes`
--

DROP TABLE IF EXISTS `reviews_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews_votes` (
  `vote_Id` int(11) NOT NULL AUTO_INCREMENT,
  `type_of_vote` varchar(45) NOT NULL,
  PRIMARY KEY (`vote_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews_votes`
--

LOCK TABLES `reviews_votes` WRITE;
/*!40000 ALTER TABLE `reviews_votes` DISABLE KEYS */;
INSERT INTO `reviews_votes` VALUES (1,'Like'),(2,'Dislike');
/*!40000 ALTER TABLE `reviews_votes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (3,'user'),(4,'admin');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (4,'Borrowed'),(5,'Unlisted'),(6,'Free');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_levels`
--

DROP TABLE IF EXISTS `user_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_levels` (
  `user_level_Id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`user_level_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_levels`
--

LOCK TABLES `user_levels` WRITE;
/*!40000 ALTER TABLE `user_levels` DISABLE KEYS */;
INSERT INTO `user_levels` VALUES (1,'Newbie'),(2,'Basic'),(3,'Member'),(4,'Regular'),(5,'Bookworm');
/*!40000 ALTER TABLE `user_levels` ENABLE KEYS */;
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
  `password` varchar(256) NOT NULL,
  `email` varchar(45) NOT NULL,
  `isDeleted` tinyint(4) NOT NULL DEFAULT 0,
  `role_id` int(11) NOT NULL DEFAULT 1,
  `user_points` int(11) NOT NULL DEFAULT 0,
  `user_level` int(11) NOT NULL DEFAULT 1,
  `register_date` date DEFAULT NULL,
  PRIMARY KEY (`user_Id`),
  KEY `fk_users_roles1_idx` (`role_id`),
  KEY `fk_users_user_levels1_idx` (`user_level`),
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_user_levels1` FOREIGN KEY (`user_level`) REFERENCES `user_levels` (`user_level_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'nikiiiii','$2b$10$sYpROqQtJgYshtOrH0ybDOF/qSYpG1Jat96Kf/JLUkIVhkbREJR7C','niki123@gmail.com',0,3,915,1,NULL),(9,'mariq','$2b$10$a9s.n0Nn.8BqImlTFc8PLuI1HSW7AnEXuF7YKCN78DatmMGOJCxXC','mariq123@gmail.com',0,4,925,2,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_history`
--

DROP TABLE IF EXISTS `users_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_history` (
  `user_Id` int(11) NOT NULL,
  `book_Id` int(11) NOT NULL,
  KEY `fk_users_has_books_books1_idx` (`book_Id`),
  KEY `fk_users_has_books_users1_idx` (`user_Id`),
  CONSTRAINT `fk_users_has_books_books1` FOREIGN KEY (`book_Id`) REFERENCES `books` (`book_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_books_users1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`user_Id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_history`
--

LOCK TABLES `users_history` WRITE;
/*!40000 ALTER TABLE `users_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-07 23:55:23
