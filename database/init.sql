-- Inicialização do banco de dados
CREATE DATABASE IF NOT EXISTS invent;
USE invent;

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS empresas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(18),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de equipamentos
CREATE TABLE IF NOT EXISTS equipamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  tipo VARCHAR(100),
  empresa_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (empresa_id) REFERENCES empresas(id)
);

-- Inserir dados iniciais
INSERT IGNORE INTO empresas (id, nome, cnpj) VALUES 
(1, 'Empresa Teste', '00.000.000/0001-00');