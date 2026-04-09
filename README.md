# Invent - Sistema de Inventário

Sistema híbrido com Astro (frontend) + Express (API) em container único.

## 🚀 Início Rápido

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Iniciar desenvolvimento
./dev.sh
# ou
npm run dev
```

### Produção com Docker
```bash
# Subir aplicação completa
npm run docker:up

# Ver logs
npm run docker:logs

# Parar aplicação
npm run docker:down
```

## 📁 Estrutura Otimizada

```
/
├── src/                    # Frontend Astro
│   ├── api/               # Centralizador de APIs
│   ├── components/        # Componentes Astro
│   ├── layouts/          # Layouts
│   ├── pages/            # Páginas
│   └── lib/              # Utilitários
├── backend/              # Lógica de negócio
│   ├── routes/           # Rotas da API
│   ├── services/         # Serviços
│   ├── middleware/       # Middlewares
│   └── db/              # Conexão DB
├── database/             # Scripts SQL
├── public/              # Arquivos estáticos
├── uploads/             # Uploads (Docker volume)
├── docker-compose.yml   # Orquestração
├── Dockerfile          # Container único
└── server.js           # Servidor híbrido
```

## 🔧 Comandos Disponíveis

- `npm run dev` - Desenvolvimento
- `npm run build` - Build produção
- `npm start` - Iniciar produção
- `npm run docker:build` - Build Docker
- `npm run docker:up` - Subir containers
- `npm run docker:down` - Parar containers

## 🐳 Docker

O projeto roda em **container único** com:
- Astro build servido estaticamente
- Express API na mesma porta
- MySQL em container separado
- Volume persistente para uploads

## 📊 Melhorias Aplicadas

✅ **Container único** - Elimina processos órfãos  
✅ **Estrutura consolidada** - APIs centralizadas  
✅ **Dependências unificadas** - Um package.json  
✅ **Configuração simplificada** - Variáveis otimizadas  
✅ **Docker-ready** - Pronto para produção  
✅ **Scripts otimizados** - Comandos simplificados