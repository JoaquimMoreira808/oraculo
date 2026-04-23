# Deploy — Omni-Data em Produção

## Pré-requisitos no servidor

- Docker >= 24
- Docker Compose >= 2.20
- Git
- Porta 3000 liberada no firewall (ou 80/443 se usar proxy reverso)

```bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y docker.io docker-compose-v2 git
sudo usermod -aG docker $USER
newgrp docker
```

---

## 1. Clonar o repositório

```bash
git clone <url-do-repositorio> omni-data
cd omni-data
```

---

## 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
nano .env
```

Preencha **todos** os campos. Para gerar os segredos:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Exemplo de `.env` preenchido:

```env
DB_HOST=db
DB_NAME=invent
DB_USER=invent_user
DB_PASSWORD=SenhaForte123!
DB_ROOT_PASSWORD=RootSenhaForte456!

PORT=3000
NODE_ENV=production
PUBLIC_BACKEND_URL=https://seu-dominio.com

JWT_SECRET=a1b2c3...valor_gerado_acima
INTERNAL_API_KEY=d4e5f6...outro_valor_gerado
```

---

## 3. Subir os containers

```bash
docker compose up -d --build
```

Aguarde o banco inicializar (pode levar 30–60s na primeira vez). Acompanhe:

```bash
docker compose logs -f
```

Quando aparecer `✅ Database connected`, a aplicação está pronta.

---

## 4. Criar o usuário admin

Após o primeiro deploy, crie o usuário administrador:

```bash
docker compose exec db mysql -u root -p${DB_ROOT_PASSWORD} invent -e "
INSERT INTO usuario (nome, email, senha_hash, is_active)
VALUES ('Admin', 'admin@suaempresa.com', '\$(node -e \"const b=require('bcryptjs');console.log(b.hashSync('SuaSenha',12))\")', 'T');
"
```

Ou de forma mais simples, rode localmente e insira o hash gerado:

```bash
# Gerar hash da senha
node -e "const b=require('bcryptjs'); console.log(b.hashSync('SuaSenha', 12))"

# Inserir no banco via container
docker compose exec db mysql -u invent_user -p invent
```

```sql
INSERT INTO usuario (nome, email, senha_hash, is_active)
VALUES ('Admin', 'admin@suaempresa.com', '<hash_gerado>', 'T');
```

---

## 5. Verificar saúde da aplicação

```bash
curl http://localhost:3000/health
# {"status":"OK","timestamp":"..."}
```

---

## Comandos úteis

| Comando | Descrição |
|---|---|
| `docker compose up -d --build` | Build e sobe os containers |
| `docker compose down` | Para os containers (mantém dados) |
| `docker compose down -v` | Para e **apaga** todos os volumes |
| `docker compose logs -f app` | Logs da aplicação em tempo real |
| `docker compose logs -f db` | Logs do banco em tempo real |
| `docker compose restart app` | Reinicia só a aplicação |
| `docker compose exec db mysql -u root -p invent` | Acessa o MySQL |

---

## Atualizar para nova versão

```bash
git pull
docker compose up -d --build
```

---

## Proxy reverso com Nginx (recomendado)

Para expor na porta 80/443 com HTTPS:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name seu-dominio.com;

    ssl_certificate     /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Certificado gratuito com Certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

---

## Estrutura dos containers

```
omni-data-app   → Node.js (Express + Astro SSR) — porta 3000
omni-data-db    → MySQL 8.0 — porta 3306 (interno)
```

Volumes persistentes:
- `mysql_data` — dados do banco
- `uploads_data` — arquivos enviados

---

## Segurança em produção

- [ ] `.env` nunca commitado no repositório
- [ ] `JWT_SECRET` e `INTERNAL_API_KEY` com valores únicos e longos
- [ ] Porta 3306 **não** exposta publicamente (remova o `ports` do db no compose se não precisar de acesso externo)
- [ ] HTTPS configurado via proxy reverso
- [ ] `PUBLIC_BACKEND_URL` apontando para o domínio real
