const mysql = require('mysql2/promise');

const empresas = [
  { nome: 'Tech Solutions', razao: 'Tech Solutions LTDA', cnpj: '11.111.111/0001-11', cidade: 'São Paulo', telefone: '(11) 1111-1111', email: 'contato@techsolutions.com' },
  { nome: 'Digital Corp', razao: 'Digital Corporation LTDA', cnpj: '22.222.222/0001-22', cidade: 'Rio de Janeiro', telefone: '(21) 2222-2222', email: 'info@digitalcorp.com' },
  { nome: 'Inovação Plus', razao: 'Inovação Plus ME', cnpj: '33.333.333/0001-33', cidade: 'Belo Horizonte', telefone: '(31) 3333-3333', email: 'contato@inovacaoplus.com' },
  { nome: 'Smart Business', razao: 'Smart Business EIRELI', cnpj: '44.444.444/0001-44', cidade: 'Porto Alegre', telefone: '(51) 4444-4444', email: 'vendas@smartbusiness.com' },
  { nome: 'Future Tech', razao: 'Future Technology S.A.', cnpj: '55.555.555/0001-55', cidade: 'Curitiba', telefone: '(41) 5555-5555', email: 'contato@futuretech.com' },
  { nome: 'Alpha Systems', razao: 'Alpha Systems LTDA', cnpj: '66.666.666/0001-66', cidade: 'Salvador', telefone: '(71) 6666-6666', email: 'info@alphasystems.com' },
  { nome: 'Beta Solutions', razao: 'Beta Solutions ME', cnpj: '77.777.777/0001-77', cidade: 'Fortaleza', telefone: '(85) 7777-7777', email: 'contato@betasolutions.com' },
  { nome: 'Gamma Corp', razao: 'Gamma Corporation LTDA', cnpj: '88.888.888/0001-88', cidade: 'Brasília', telefone: '(61) 8888-8888', email: 'vendas@gammacorp.com' },
  { nome: 'Delta Tech', razao: 'Delta Technology EIRELI', cnpj: '99.999.999/0001-99', cidade: 'Recife', telefone: '(81) 9999-9999', email: 'contato@deltatech.com' },
  { nome: 'Epsilon Digital', razao: 'Epsilon Digital S.A.', cnpj: '10.101.010/0001-10', cidade: 'Manaus', telefone: '(92) 1010-1010', email: 'info@epsilondigital.com' },
  { nome: 'Zeta Innovation', razao: 'Zeta Innovation LTDA', cnpj: '20.202.020/0001-20', cidade: 'Goiânia', telefone: '(62) 2020-2020', email: 'contato@zetainnovation.com' },
  { nome: 'Eta Systems', razao: 'Eta Systems ME', cnpj: '30.303.030/0001-30', cidade: 'Belém', telefone: '(91) 3030-3030', email: 'vendas@etasystems.com' },
  { nome: 'Theta Solutions', razao: 'Theta Solutions EIRELI', cnpj: '40.404.040/0001-40', cidade: 'Vitória', telefone: '(27) 4040-4040', email: 'contato@thetasolutions.com' },
  { nome: 'Iota Tech', razao: 'Iota Technology S.A.', cnpj: '50.505.050/0001-50', cidade: 'Florianópolis', telefone: '(48) 5050-5050', email: 'info@iotatech.com' },
  { nome: 'Kappa Digital', razao: 'Kappa Digital LTDA', cnpj: '60.606.060/0001-60', cidade: 'João Pessoa', telefone: '(83) 6060-6060', email: 'contato@kappadigital.com' },
  { nome: 'Lambda Corp', razao: 'Lambda Corporation ME', cnpj: '70.707.070/0001-70', cidade: 'Aracaju', telefone: '(79) 7070-7070', email: 'vendas@lambdacorp.com' },
  { nome: 'Mu Systems', razao: 'Mu Systems EIRELI', cnpj: '80.808.080/0001-80', cidade: 'Maceió', telefone: '(82) 8080-8080', email: 'contato@musystems.com' },
  { nome: 'Nu Solutions', razao: 'Nu Solutions S.A.', cnpj: '90.909.090/0001-90', cidade: 'Teresina', telefone: '(86) 9090-9090', email: 'info@nusolutions.com' },
  { nome: 'Xi Innovation', razao: 'Xi Innovation LTDA', cnpj: '11.121.212/0001-11', cidade: 'São Luís', telefone: '(98) 1212-1212', email: 'contato@xiinnovation.com' },
  { nome: 'Omicron Tech', razao: 'Omicron Technology ME', cnpj: '22.232.323/0001-22', cidade: 'Natal', telefone: '(84) 2323-2323', email: 'vendas@omicrontech.com' }
];

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'invent'
  });

  try {
    console.log('Inserindo 20 empresas...');
    
    for (const empresa of empresas) {
      await connection.execute(
        'INSERT INTO empresa (nome, razao, cnpj, cidade, telefone, email, is_active, created_on, modified_on) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
        [empresa.nome, empresa.razao, empresa.cnpj, empresa.cidade, empresa.telefone, empresa.email, 'T']
      );
    }
    
    console.log('✅ 20 empresas inseridas com sucesso!');
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await connection.end();
  }
}

seed();