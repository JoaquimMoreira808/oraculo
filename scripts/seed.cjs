require('dotenv').config();
const mysql = require('mysql2/promise');

const empresas = [
  { nome: 'Tech Solutions', razao: 'Tech Solutions LTDA', cnpj: '11.111.111/0001-11', cidade: 'São Paulo', telefone: '(11) 1111-1111', email: 'contato@techsolutions.com' },
  { nome: 'Digital Corp', razao: 'Digital Corporation LTDA', cnpj: '22.222.222/0001-22', cidade: 'Rio de Janeiro', telefone: '(21) 2222-2222', email: 'info@digitalcorp.com' },
  { nome: 'Inovação Plus', razao: 'Inovação Plus ME', cnpj: '33.333.333/0001-33', cidade: 'Belo Horizonte', telefone: '(31) 3333-3333', email: 'contato@inovacaoplus.com' },
  { nome: 'Smart Business', razao: 'Smart Business EIRELI', cnpj: '44.444.444/0001-44', cidade: 'Porto Alegre', telefone: '(51) 4444-4444', email: 'vendas@smartbusiness.com' },
  { nome: 'Future Tech', razao: 'Future Technology S.A.', cnpj: '55.555.555/0001-55', cidade: 'Curitiba', telefone: '(41) 5555-5555', email: 'contato@futuretech.com' },
];

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME,
  });

  try {
    console.log(`Conectado ao banco: ${process.env.DB_NAME}`);
    console.log('Inserindo empresas de exemplo...');

    for (const empresa of empresas) {
      await connection.execute(
        'INSERT INTO empresa (nome, razao, cnpj, cidade, telefone, email, is_active, created_on, modified_on) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [empresa.nome, empresa.razao, empresa.cnpj, empresa.cidade, empresa.telefone, empresa.email, 'T']
      );
    }

    console.log(`✅ ${empresas.length} empresas inseridas com sucesso!`);
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await connection.end();
  }
}

seed();
