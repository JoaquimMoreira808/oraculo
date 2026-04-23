FROM node:18-alpine

WORKDIR /app

# Instala dependências (todas, incluindo dev para o build)
COPY package*.json ./
RUN npm ci

# Copia o código e faz o build do Astro
COPY . .
RUN npm run build

# Remove devDependencies após o build
RUN npm prune --production

RUN mkdir -p uploads

EXPOSE 3000

CMD ["node", "server.js"]