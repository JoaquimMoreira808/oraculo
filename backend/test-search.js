const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testSearch() {
  try {
    console.log('Testando busca por Alpha...');
    
    // Teste simples
    const [results] = await pool.query(
      "SELECT 'empresa' as table_name, 'nome' as field_name, nome as value, id as empresa_id FROM empresa WHERE nome LIKE ? AND is_active = 'T'",
      ['%Alpha%']
    );
    
    console.log('Resultados encontrados:', results);
    
    if (results.length > 0) {
      console.log('✅ Dados encontrados no banco!');
    } else {
      console.log('❌ Nenhum dado encontrado');
    }
    
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await pool.end();
  }
}

testSearch();