#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento Omni-Data..."

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Função para cleanup ao sair
cleanup() {
    echo "
🛑 Parando serviços..."
    kill $API_PID $ASTRO_PID $NGROK_PID 2>/dev/null
    pkill -f "node server.js" 2>/dev/null
    pkill -f "astro dev" 2>/dev/null
    pkill -f "ngrok" 2>/dev/null
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
sleep 3

# Iniciar ngrok para o frontend
echo "🌐 Iniciando ngrok..."
ngrok http 4321 --host-header=localhost:4321 --log=stdout > ngrok.log 2>&1 &
NGROK_PID=$!
sleep 3

# Obter URL do ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

echo "
🎆 Ambiente pronto!"
echo "🔗 API: http://localhost:3000/api"
echo "📱 Frontend Local: http://localhost:4321"
echo "🌍 Frontend Público: $NGROK_URL"
echo "
⏹️  Para parar: Ctrl+C"

# Aguardar interrupção
wait