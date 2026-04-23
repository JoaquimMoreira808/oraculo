/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.5.29-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: tsinvent
-- ------------------------------------------------------
-- Server version	10.5.29-MariaDB-0+deb11u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `arquivo`
--

DROP TABLE IF EXISTS `arquivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `arquivo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `arquivo` varchar(512) DEFAULT NULL,
  `nomearquivo` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `arquivo_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=138 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `arquivo_archive`
--

DROP TABLE IF EXISTS `arquivo_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `arquivo_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `arquivo` varchar(512) DEFAULT NULL,
  `nomearquivo` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `arquivo_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `arquivo` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_archive_ibfk_2` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `arquivo_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_cas`
--

DROP TABLE IF EXISTS `auth_cas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_cas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `service` varchar(512) DEFAULT NULL,
  `ticket` varchar(512) DEFAULT NULL,
  `renew` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id__idx` (`user_id`),
  CONSTRAINT `auth_cas_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_event`
--

DROP TABLE IF EXISTS `auth_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time_stamp` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `client_ip` varchar(512) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `origin` varchar(512) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id__idx` (`user_id`),
  CONSTRAINT `auth_event_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7115 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(512) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_membership`
--

DROP TABLE IF EXISTS `auth_membership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_membership` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `group_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id__idx` (`user_id`),
  KEY `group_id__idx` (`group_id`),
  CONSTRAINT `auth_membership_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `auth_membership_ibfk_2` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) DEFAULT NULL,
  `name` varchar(512) DEFAULT NULL,
  `table_name` varchar(512) DEFAULT NULL,
  `record_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id__idx` (`group_id`),
  CONSTRAINT `auth_permission_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(128) DEFAULT NULL,
  `last_name` varchar(128) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `registration_key` varchar(512) DEFAULT NULL,
  `reset_password_key` varchar(512) DEFAULT NULL,
  `registration_id` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `chatbot`
--

DROP TABLE IF EXISTS `chatbot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `chatbot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `servidor` varchar(512) DEFAULT NULL,
  `login` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `responsavel` varchar(512) DEFAULT NULL,
  `contato` varchar(512) DEFAULT NULL,
  `bot_whatsapp` char(1) DEFAULT NULL,
  `bot_facebook` char(1) DEFAULT NULL,
  `bot_instagram` char(1) DEFAULT NULL,
  `bot_email` char(1) DEFAULT NULL,
  `bot_website` char(1) DEFAULT NULL,
  `bot_telegram` char(1) DEFAULT NULL,
  `obs` longtext DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `qt_licenca` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_id__idx` (`empresa_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `chatbot_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chatbot_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chatbot_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contato`
--

DROP TABLE IF EXISTS `contato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `nome` varchar(512) DEFAULT NULL,
  `departamento` varchar(512) DEFAULT NULL,
  `telefone` varchar(512) DEFAULT NULL,
  `telefone2` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_id__idx` (`empresa_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `contato_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=358 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contato_archive`
--

DROP TABLE IF EXISTS `contato_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contato_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `nome` varchar(512) DEFAULT NULL,
  `departamento` varchar(512) DEFAULT NULL,
  `telefone` varchar(512) DEFAULT NULL,
  `telefone2` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `empresa_id__idx` (`empresa_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `contato_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `contato` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_archive_ibfk_2` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `razao` varchar(512) DEFAULT NULL,
  `endereco` varchar(512) DEFAULT NULL,
  `cidade` varchar(512) DEFAULT NULL,
  `telefone` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `cnpj` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `empresa_archive`
--

DROP TABLE IF EXISTS `empresa_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresa_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `razao` varchar(512) DEFAULT NULL,
  `endereco` varchar(512) DEFAULT NULL,
  `cidade` varchar(512) DEFAULT NULL,
  `telefone` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `cnpj` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `empresa_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_archive_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `empresa_archive_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipamento`
--

DROP TABLE IF EXISTS `equipamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamento` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `tipo` longtext DEFAULT NULL,
  `ip` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `equipamento_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `equipamento_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `equipamento_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `equipamento_archive`
--

DROP TABLE IF EXISTS `equipamento_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipamento_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `tipo` longtext DEFAULT NULL,
  `ip` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `equipamento_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `equipamento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `equipamento_archive_ibfk_2` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `equipamento_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `equipamento_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `linha`
--

DROP TABLE IF EXISTS `linha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `linha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(512) DEFAULT NULL,
  `tipo` longtext DEFAULT NULL,
  `operadora` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `linha_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `linha_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `linha_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=804 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `linha_archive`
--

DROP TABLE IF EXISTS `linha_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `linha_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(512) DEFAULT NULL,
  `tipo` longtext DEFAULT NULL,
  `operadora` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `linha_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `linha` (`id`) ON DELETE CASCADE,
  CONSTRAINT `linha_archive_ibfk_2` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `linha_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `linha_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maquina`
--

DROP TABLE IF EXISTS `maquina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `maquina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `operacao` longtext DEFAULT NULL,
  `nome` varchar(512) DEFAULT NULL,
  `localidade` varchar(512) DEFAULT NULL,
  `ipvpn` varchar(512) DEFAULT NULL,
  `versao` varchar(512) DEFAULT NULL,
  `hardware` varchar(512) DEFAULT NULL,
  `obs` longtext DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empresa_id__idx` (`empresa_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `maquina_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maquina_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maquina_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=296 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `maquina_archive`
--

DROP TABLE IF EXISTS `maquina_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `maquina_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empresa_id` int(11) DEFAULT NULL,
  `operacao` longtext DEFAULT NULL,
  `nome` varchar(512) DEFAULT NULL,
  `localidade` varchar(512) DEFAULT NULL,
  `ipvpn` varchar(512) DEFAULT NULL,
  `versao` varchar(512) DEFAULT NULL,
  `hardware` varchar(512) DEFAULT NULL,
  `obs` longtext DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `empresa_id__idx` (`empresa_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `maquina_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maquina_archive_ibfk_2` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maquina_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maquina_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `numerobot`
--

DROP TABLE IF EXISTS `numerobot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `numerobot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` longtext DEFAULT NULL,
  `numero` varchar(512) DEFAULT NULL,
  `chatbot_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chatbot_id__idx` (`chatbot_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `numerobot_ibfk_1` FOREIGN KEY (`chatbot_id`) REFERENCES `chatbot` (`id`) ON DELETE CASCADE,
  CONSTRAINT `numerobot_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `numerobot_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rede`
--

DROP TABLE IF EXISTS `rede`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rede` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(512) DEFAULT NULL,
  `placa` varchar(512) DEFAULT NULL,
  `tipo` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `rede_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rede_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rede_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=677 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rede_archive`
--

DROP TABLE IF EXISTS `rede_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rede_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(512) DEFAULT NULL,
  `placa` varchar(512) DEFAULT NULL,
  `tipo` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `rede_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `rede` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rede_archive_ibfk_2` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rede_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rede_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `senha`
--

DROP TABLE IF EXISTS `senha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `senha` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `servico` varchar(512) DEFAULT NULL,
  `usuario` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `senha_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `senha_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `senha_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=736 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `senha_archive`
--

DROP TABLE IF EXISTS `senha_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `senha_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `servico` varchar(512) DEFAULT NULL,
  `usuario` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `senha_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `senha` (`id`) ON DELETE CASCADE,
  CONSTRAINT `senha_archive_ibfk_2` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `senha_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `senha_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `troncoe1`
--

DROP TABLE IF EXISTS `troncoe1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `troncoe1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ddd` varchar(512) DEFAULT NULL,
  `prefixo` varchar(512) DEFAULT NULL,
  `numero_ini` varchar(512) DEFAULT NULL,
  `numero_fin` varchar(512) DEFAULT NULL,
  `equipamento` longtext DEFAULT NULL,
  `placalink` varchar(512) DEFAULT NULL,
  `operadora` varchar(512) DEFAULT NULL,
  `obs` longtext DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `troncoe1_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `troncoe1_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `troncoe1_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `troncoe1_archive`
--

DROP TABLE IF EXISTS `troncoe1_archive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `troncoe1_archive` (
  `current_record` int(11) DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ddd` varchar(512) DEFAULT NULL,
  `prefixo` varchar(512) DEFAULT NULL,
  `numero_ini` varchar(512) DEFAULT NULL,
  `numero_fin` varchar(512) DEFAULT NULL,
  `equipamento` longtext DEFAULT NULL,
  `placalink` varchar(512) DEFAULT NULL,
  `operadora` varchar(512) DEFAULT NULL,
  `obs` longtext DEFAULT NULL,
  `maquina_id` int(11) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime /* mariadb-5.3 */ DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `current_record__idx` (`current_record`),
  KEY `maquina_id__idx` (`maquina_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `troncoe1_archive_ibfk_1` FOREIGN KEY (`current_record`) REFERENCES `troncoe1` (`id`) ON DELETE CASCADE,
  CONSTRAINT `troncoe1_archive_ibfk_2` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE,
  CONSTRAINT `troncoe1_archive_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `troncoe1_archive_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-27 11:21:16