#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento..."

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Função para cleanup ao sair
cleanup() {
    echo "
🛑 Parando serviços..."
    kill $API_PID $ASTRO_PID 2>/dev/null
    pkill -f "node server.js" 2>/dev/null
    pkill -f "astro dev" 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT

# Iniciar API backend
echo "🔧 Iniciando API backend na porta 3000..."
node server.js &
API_PID=$!
sleep 2

# Verificar se API iniciou
if curl -s http://localhost:3000/health > /dev/null; then
    echo "✅ API backend rodando"
else
    echo "❌ Erro ao iniciar API backend"
    kill $API_PID 2>/dev/null
    exit 1
fi

# Iniciar Astro frontend
echo "🌟 Iniciando Astro frontend na porta 4321..."
npm run dev &
ASTRO_PID=$!

echo "
🎆 Ambiente pronto!"
echo "🔗 API: http://localhost:3000/api"
echo "📱 Frontend: http://localhost:4321"
echo "
⏹️  Para parar: Ctrl+C"

# Aguardar interrupção
wait