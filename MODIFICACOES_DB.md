# Modificações do Banco de Dados

## 2024-01-27 - Implementação das Tabelas Cloud

### Novas Tabelas Criadas:

#### 1. revenda_cloud
- **Propósito**: Gerenciar revendas na nuvem
- **Campos principais**: 
  - `id` (PK)
  - `razao_social`
  - `cnpj`
  - `nome_fantasia`
  - `telefone`
  - `email`

#### 2. perfil_cloud
- **Propósito**: Gerenciar perfis de usuários cloud
- **Campos principais**:
  - `id` (PK)
  - `revendacloud_id` (FK para revenda_cloud)
  - `nome`

#### 3. contato_cloud
- **Propósito**: Gerenciar contatos de usuários cloud
- **Campos principais**:
  - `id` (PK)
  - `revendacloud_id` (FK para revenda_cloud)
  - `perfil_id` (FK para perfil_cloud)
  - `nome`
  - `email`
  - `senha`

#### 4. organizacao_cloud
- **Propósito**: Gerenciar organizações cloud
- **Campos principais**:
  - `id` (PK)
  - `revenda_id` (FK para revenda_cloud)
  - `razao_social`
  - `cnpj`
  - `nome_fantasia`
  - `telefone`
  - `email`
  - `cep`
  - `cidade`

### Arquivos Criados:
- `/backend/migrations/001_create_cloud_tables.sql` - Script de migração
- `/backend/routes/revenda-cloud.js` - API para revendas cloud
- `/backend/routes/perfil-cloud.js` - API para perfis cloud
- `/backend/routes/contato-cloud.js` - API para contatos cloud
- `/backend/routes/organizacao-cloud.js` - API para organizações cloud

### Arquivos Modificados:
- `/backend/server.js` - Adicionadas rotas cloud
- `/backend/routes/related.js` - Suporte a relacionamentos cloud

### Relacionamentos:
- revenda_cloud (1:N) perfil_cloud
- revenda_cloud (1:N) contato_cloud
- revenda_cloud (1:N) organizacao_cloud
- perfil_cloud (1:N) contato_cloud

### Endpoints Disponíveis:
- `GET/POST/PUT/DELETE /api/revenda-cloud`
- `GET/POST/PUT/DELETE /api/perfil-cloud`
- `GET/POST/PUT/DELETE /api/contato-cloud`
- `GET/POST/PUT/DELETE /api/organizacao-cloud`

--------------------------------------------


-- Criação das tabelas cloud
-- Data: 2024-01-27

-- Tabela revenda_cloud
CREATE TABLE `revenda_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `razao_social` varchar(255) NOT NULL,
  `cnpj` varchar(50) DEFAULT NULL,
  `nome_fantasia` varchar(255) NOT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `revenda_cloud_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `revenda_cloud_ibfk_2` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabela perfil_cloud
CREATE TABLE `perfil_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `revendacloud_id` bigint NOT NULL DEFAULT '1',
  `nome` varchar(50) NOT NULL,
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `revendacloud_id__idx` (`revendacloud_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `perfil_cloud_ibfk_1` FOREIGN KEY (`revendacloud_id`) REFERENCES `revenda_cloud` (`id`) ON DELETE CASCADE,
  CONSTRAINT `perfil_cloud_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `perfil_cloud_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabela contato_cloud
CREATE TABLE `contato_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `revendacloud_id` int NOT NULL,
  `perfil_id` bigint NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` text NOT NULL,
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `revendacloud_id__idx` (`revendacloud_id`),
  KEY `perfil_id__idx` (`perfil_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `contato_cloud_ibfk_1` FOREIGN KEY (`revendacloud_id`) REFERENCES `revenda_cloud` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_cloud_ibfk_2` FOREIGN KEY (`perfil_id`) REFERENCES `perfil_cloud` (`id`) ON DELETE CASCADE,
  CONSTRAINT `contato_cloud_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `contato_cloud_ibfk_4` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabela organizacao_cloud
CREATE TABLE `organizacao_cloud` (
  `id` int NOT NULL AUTO_INCREMENT,
  `revenda_id` int NOT NULL,
  `razao_social` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cnpj` varchar(50) DEFAULT NULL,
  `nome_fantasia` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cep` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cidade` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `is_active` char(1) DEFAULT 'T',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` int(11) DEFAULT NULL,
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `revenda_id__idx` (`revenda_id`),
  KEY `created_by__idx` (`created_by`),
  KEY `modified_by__idx` (`modified_by`),
  CONSTRAINT `organizacao_cloud_ibfk_1` FOREIGN KEY (`revenda_id`) REFERENCES `revenda_cloud` (`id`) ON DELETE CASCADE,
  CONSTRAINT `organizacao_cloud_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL,
  CONSTRAINT `organizacao_cloud_ibfk_3` FOREIGN KEY (`modified_by`) REFERENCES `auth_user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;