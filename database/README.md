# Database

Esta pasta contém arquivos relacionados ao banco de dados:

## Arquivos

- `init.sql` - Script de inicialização para Docker
- `templates/` - Templates CSV para importação
- `*_test.csv` - Dados de teste

## Estrutura

Para criar backup do banco atual:
```bash
mysqldump -u root -p invent > database/backup.sql
```

Para restaurar:
```bash
mysql -u root -p invent < database/backup.sql
```