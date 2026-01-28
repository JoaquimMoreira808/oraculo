#!/bin/bash

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ASCII Art
echo -e "${GREEN}"
cat << "EOF"
⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⢠⡆⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⣷⣄⠀⠀⠀⠀⣾⣷⠀⠀⠀⠀⣠⣾⠃⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢿⠿⠃⠀⠀⠀⠉⠉⠁⠀⠀⠐⠿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣶⣶⣶⣤⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣤⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⣶⣿⣿⡿⣿⣿⣿⡿⠋⠉⠀⠀⠉⠙⢿⣿⣿⡿⣿⣿⣷⣦⡀⠀⠀⠀
⠀⢀⣼⣿⣿⠟⠁⢠⣿⣿⠏⠀⠀⢠⣤⣤⡀⠀⠀⢻⣿⣿⡀⠙⢿⣿⣿⣦⠀⠀
⣰⣿⣿⡟⠁⠀⠀⢸⣿⣿⠀⠀⠀⢿⣿⣿⡟⠀⠀⠈⣿⣿⡇⠀⠀⠙⣿⣿⣷⡄
⠈⠻⣿⣿⣦⣄⠀⠸⣿⣿⣆⠀⠀⠀⠉⠉⠀⠀⠀⣸⣿⣿⠃⢀⣤⣾⣿⣿⠟⠁
⠀⠀⠈⠻⣿⣿⣿⣶⣿⣿⣿⣦⣄⠀⠀⠀⢀⣠⣾⣿⣿⣿⣾⣿⣿⡿⠋⠁⠀⠀
⠀⠀⠀⠀⠀⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠛⠿⠿⠿⠿⠿⠿⠛⠋⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢰⣷⡦⠀⠀⠀⢀⣀⣀⠀⠀⠀⢴⣾⡇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣸⠟⠁⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠙⢷⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠻⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀
EOF
echo -e "${NC}"

echo -e "${YELLOW}🚀 Iniciando setup do projeto invent...${NC}"

# Função para verificar se node_modules existe
check_dependencies() {
    local dir=$1
    if [ -d "$dir/node_modules" ] && [ -f "$dir/package-lock.json" ]; then
        return 0
    else
        return 1
    fi
}

# Função para instalar dependências
install_deps() {
    local dir=$1
    local name=$2
    
    echo -e "${YELLOW}📦 Instalando dependências do $name...${NC}"
    cd "$dir"
    
    if npm install; then
        echo -e "${GREEN}✅ Dependências do $name instaladas com sucesso!${NC}"
        cd ..
        return 0
    else
        echo -e "${RED}❌ Erro ao instalar dependências do $name${NC}"
        cd ..
        return 1
    fi
}

# Verificar se as pastas existem
if [ ! -d "backend" ]; then
    echo -e "${RED}❌ Pasta backend não encontrada!${NC}"
    exit 1
fi

# Verificar e instalar dependências do frontend (raiz do projeto)
echo -e "${YELLOW}🔍 Verificando dependências do frontend...${NC}"
if ! check_dependencies "."; then
    install_deps "." "frontend" || exit 1
else
    echo -e "${GREEN}✅ Dependências do frontend já instaladas!${NC}"
fi

# Verificar e instalar dependências do backend
echo -e "${YELLOW}🔍 Verificando dependências do backend...${NC}"
if ! check_dependencies "backend"; then
    install_deps "backend" "backend" || exit 1
else
    echo -e "${GREEN}✅ Dependências do backend já instaladas!${NC}"
fi

# Verificar novamente após instalação
echo -e "${YELLOW}🔄 Verificação final das dependências...${NC}"
if ! check_dependencies "." || ! check_dependencies "backend"; then
    echo -e "${RED}❌ Erro: Dependências não foram instaladas corretamente${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Todas as dependências estão prontas!${NC}"
echo -e "${YELLOW}🚀 Iniciando aplicações...${NC}"

# Função para matar processos ao sair
cleanup() {
    echo -e "\n${YELLOW}🛑 Parando aplicações...${NC}"
    
    # Matar processo do backend e seus filhos
    if [ ! -z "$BACKEND_PID" ]; then
        kill -TERM $BACKEND_PID 2>/dev/null
        kill -TERM -$BACKEND_PID 2>/dev/null
        echo -e "${RED}❌ Backend parado${NC}"
    fi
    
    # Matar processo do frontend e seus filhos
    if [ ! -z "$FRONTEND_PID" ]; then
        kill -TERM $FRONTEND_PID 2>/dev/null
        kill -TERM -$FRONTEND_PID 2>/dev/null
        echo -e "${RED}❌ Frontend parado${NC}"
    fi
    
    # Aguardar um pouco e forçar se necessário
    sleep 2
    
    if [ ! -z "$BACKEND_PID" ]; then
        kill -KILL $BACKEND_PID 2>/dev/null
        kill -KILL -$BACKEND_PID 2>/dev/null
    fi
    
    if [ ! -z "$FRONTEND_PID" ]; then
        kill -KILL $FRONTEND_PID 2>/dev/null
        kill -KILL -$FRONTEND_PID 2>/dev/null
    fi
    
    echo -e "${GREEN}✅ Todas as aplicações foram encerradas${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Iniciar backend
echo -e "${YELLOW}🔧 Iniciando backend...${NC}"
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Aguardar um pouco para o backend iniciar
sleep 3

# Iniciar frontend com --host para expor na rede
echo -e "${YELLOW}🎨 Iniciando frontend...${NC}"
npm run dev -- --host &
FRONTEND_PID=$!

echo -e "${GREEN}🎉 Aplicações iniciadas com sucesso!${NC}"
echo -e "${GREEN}📱 Frontend: http://localhost:4321${NC}"
echo -e "${GREEN}🌐 Frontend (rede): http://$(hostname -I | awk '{print $1}'):4321${NC}"
echo -e "${GREEN}🔧 Backend: http://localhost:3000${NC}"
echo -e "${YELLOW}💡 Pressione Ctrl+C para parar ambas as aplicações${NC}"

# Aguardar indefinidamente até Ctrl+C
while true; do
    sleep 1
done