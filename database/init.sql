-- Inicialização do banco de dados para Docker
CREATE DATABASE IF NOT EXISTS invent;
USE invent;

-- Aqui você pode adicionar suas tabelas e dados iniciais
-- Por exemplo:
-- CREATE TABLE IF NOT EXISTS empresas (...);
-- INSERT INTO empresas VALUES (...);

-- Para migrar dados existentes, execute:
-- mysqldump -u root -p invent > database/backup.sql
-- E substitua este arquivo pelo backup