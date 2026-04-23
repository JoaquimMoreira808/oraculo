CREATE DATABASE IF NOT EXISTS `omni-data`;
USE `omni-data`;

SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `empresa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `razao` varchar(512) DEFAULT NULL,
  `endereco` varchar(512) DEFAULT NULL,
  `cidade` varchar(512) DEFAULT NULL,
  `telefone` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `cnpj` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `maquina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empresa_id` int DEFAULT NULL,
  `operacao` longtext,
  `nome` varchar(512) DEFAULT NULL,
  `localidade` varchar(512) DEFAULT NULL,
  `ipvpn` varchar(512) DEFAULT NULL,
  `versao` varchar(512) DEFAULT NULL,
  `hardware` varchar(512) DEFAULT NULL,
  `obs` longtext,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `maquina_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `contato` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empresa_id` int DEFAULT NULL,
  `nome` varchar(512) DEFAULT NULL,
  `departamento` varchar(512) DEFAULT NULL,
  `telefone` varchar(512) DEFAULT NULL,
  `telefone2` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `contato_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `chatbot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `empresa_id` int DEFAULT NULL,
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
  `obs` longtext,
  `qt_licenca` varchar(512) DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `chatbot_ibfk_1` FOREIGN KEY (`empresa_id`) REFERENCES `empresa` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `equipamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(512) DEFAULT NULL,
  `tipo` longtext,
  `ip` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `equipamento_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `rede` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ip` varchar(512) DEFAULT NULL,
  `placa` varchar(512) DEFAULT NULL,
  `tipo` varchar(512) DEFAULT NULL,
  `maquina_id` int DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `rede_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `linha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(512) DEFAULT NULL,
  `tipo` longtext,
  `operadora` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `linha_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `senha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `servico` varchar(512) DEFAULT NULL,
  `usuario` varchar(512) DEFAULT NULL,
  `senha` varchar(512) DEFAULT NULL,
  `maquina_id` int DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `senha_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `troncoe1` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ddd` varchar(512) DEFAULT NULL,
  `prefixo` varchar(512) DEFAULT NULL,
  `numero_ini` varchar(512) DEFAULT NULL,
  `numero_fin` varchar(512) DEFAULT NULL,
  `equipamento` longtext,
  `placalink` varchar(512) DEFAULT NULL,
  `operadora` varchar(512) DEFAULT NULL,
  `obs` longtext,
  `maquina_id` int DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `troncoe1_ibfk_1` FOREIGN KEY (`maquina_id`) REFERENCES `maquina` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `numerobot` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` longtext,
  `numero` varchar(512) DEFAULT NULL,
  `chatbot_id` int DEFAULT NULL,
  `is_active` char(1) DEFAULT NULL,
  `created_on` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `numerobot_ibfk_1` FOREIGN KEY (`chatbot_id`) REFERENCES `chatbot` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `revenda_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(255) NOT NULL,
  `cnpj` varchar(50) DEFAULT NULL,
  `nome_fantasia` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `perfil_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `revendacloud_id` int NOT NULL DEFAULT '1',
  `nome` varchar(50) NOT NULL,
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `perfil_cloud_ibfk_1` FOREIGN KEY (`revendacloud_id`) REFERENCES `revenda_cloud` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `contato_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `revendacloud_id` int NOT NULL,
  `perfil_id` int NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` text NOT NULL,
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `contato_cloud_ibfk_1` FOREIGN KEY (`revendacloud_id`) REFERENCES `revenda_cloud` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_cloud_ibfk_2` FOREIGN KEY (`perfil_id`) REFERENCES `perfil_cloud` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `organizacao_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `revenda_id` int NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `cnpj` varchar(50) DEFAULT NULL,
  `nome_fantasia` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `cep` varchar(20) DEFAULT NULL,
  `cidade` varchar(255) DEFAULT '',
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `organizacao_cloud_ibfk_1` FOREIGN KEY (`revenda_id`) REFERENCES `revenda_cloud` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `senha_hash` varchar(255) NOT NULL,
  `is_active` char(1) NOT NULL DEFAULT 'T',
  `ultimo_login` datetime DEFAULT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
