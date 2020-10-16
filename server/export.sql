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
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `book_Id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `author` varchar(45) NOT NULL,
  `description` varchar(300) NOT NULL,
  `genre` varchar(45) NOT NULL,
  `year` int(11) NOT NULL,
  `imageUrl` varchar(500) NOT NULL,
  `borrowedStatus_Id` int(11) NOT NULL DEFAULT 3,
  `borrower_Id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`book_Id`),
  KEY `fk_books_borrowed_status1_idx` (`borrowedStatus_Id`),
  CONSTRAINT `fk_books_borrowed_status1` FOREIGN KEY (`borrowedStatus_Id`) REFERENCES `status` (`status_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_Id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(45) NOT NULL,
  `book_Id` int(11) NOT NULL,
  `user_Id` int(11) NOT NULL,
  PRIMARY KEY (`review_Id`),
  KEY `fk_reviews_books1_idx` (`book_Id`),
  KEY `fk_reviews_users1_idx` (`user_Id`),
  CONSTRAINT `fk_reviews_books1` FOREIGN KEY (`book_Id`) REFERENCES `books` (`book_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reviews_users1` FOREIGN KEY (`user_Id`) REFERENCES `users` (`user_Id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
  `role_id` int(11) NOT NULL DEFAULT 1,
  `user_points` int(11) NOT NULL DEFAULT 0,
  `user_level` int(11) NOT NULL DEFAULT 1,
  `register_date` date NOT NULL,
  PRIMARY KEY (`user_Id`),
  KEY `fk_users_roles1_idx` (`role_id`),
  KEY `fk_users_user_levels1_idx` (`user_level`),
  CONSTRAINT `fk_users_roles1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_user_levels1` FOREIGN KEY (`user_level`) REFERENCES `user_levels` (`user_level_Id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-15 21:01:04
