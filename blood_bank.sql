-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: blood_bank
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `blood_group` varchar(3) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) NOT NULL,
  `state` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'saya','$2a$10$3rMQZJ.VVCzhrF8o6xr/hep/bdScKaENRN57mnsn.NK8Nz35zldyi','Sayali Navale','O+','Female','2003-12-16','sayalinavale16@gmail.com','8767439345','Gujarat','Ahmedabad'),(15,'Sanji','$2a$10$1yNTDIRVcKeKEGWURnwWoORyrbpVrT5lQMWSY7D4Xbe0UsuJte2hK','Sanjivani Barve','A+','Female','2005-01-17','sanjivanibarve17@gmail.com','8329846305','Uttar Pradesh','Varanasi'),(16,'Tanggi','$2a$10$nBEq0QhPJfUtS7tVq23YhOPh2Z8QEjf9miMVbpzgbQF8OVew66Un2','Shloka Nanna','A+','Female','2004-04-09','Shlokananna@gmail.com','7667108489','Kerala','Idukki'),(17,'Yashu','$2a$10$Nu1w2heG8qY20QCWJnkMk.dKytpMGgCZJT8.QR/ee6PtDH6eo98JO','Yash Savdekar','B+','Male','2004-10-18','yashsavdekar32@gmail.com','9309909827','Gujarat','Vadodara'),(18,'Dadu','$2a$10$u6fT.RyeO7hAIBjShJln4eEP5Sj4kgbBkUNr/DuEUVaUkClxFIDfS','Gunjan Rane','B+','Male','2003-12-02','gunjanrane02@gmail.com','9322174635','Gujarat','Anand'),(20,'Dextar','$2a$10$H50nCUKUwQFitxw5aYE93OlCN.hqjqeGsCSXkb/JiFCWvsSfjxzQ2','Om Kale','A+','Male','2004-10-01','okale8950@gmail.com','9322856705','Rajasthan','Ajmer'),(21,'Poonam','$2a$10$hFmRbGWenMEjY2zyJYhAz.853Ntz/QL.xZl/UC6do4G9jpxDfsFzS','Poonam Mali','O+','Female','2004-04-06','poonammali06@gmail.com','8261955688','Punjab','Amritsar'),(22,'Maau','$2a$10$eVn6JD5xrcuHncUx7CaOwuKL6gDUBaroSN2KU3jNbpw8J5LFVzPKO','Aarya Kulkarni','O+','Female','2004-04-02','aaryakulkarni244@gmail.com','9699988736','Punjab','Jalandhar'),(23,'Lalit','$2a$10$QdEpv.l.rOZstMQI0Zw5Euv9PiKo8F.rdbQolmv9B/8pw8uVue6ua','Lalit Mahajan','B+','Male','2004-08-08','lalitmahajan700@gmail.com','8010105873','Madhya Pradesh','Bhopal'),(24,'mbkirange','$2a$10$QEPhXLbHhHx2SSxO1Vl9f.6U081NKNFxb1LDRqQSAdTjaZHQpv8IG','Munali Kirange','B+','Female','1997-09-01','munalikirang@gmail.com','9307153044','Maharashtra','Pune'),(25,'silentcrafter','$2a$10$KYOaehqJICwOApZvwApoVuapwVGe7MiiWTJQs/30g7kvFG7.Z7PXu','Nikhil Solanke','B+','Male','2004-02-24','nikhilsolanke5@gmail.com','9423557838','Maharashtra','Pune'),(26,'harshit','$2a$10$tMhMlYunSMIZ3IhzmeODheZDThBWD9Mm/SP1a34Y6BKn2C9fI3/Nu','Harshit','A-','Male','2004-10-10','harshit@gmail.com','7896541235','Arunachal Pradesh','Changlang'),(27,'Rucha','$2a$10$ztXIkrODJFe5etYuSNf03uXI/B.f0LRyV6TAlWrQCqy/FThmAsnF6','Rucha Salunke','O+','Female','2004-04-24','ruchasalunke244@gmail.com','9688899736','Maharashtra','Nashik');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-14 19:42:01
