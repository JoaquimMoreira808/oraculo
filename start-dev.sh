#!/bin/bash
echo "🚀 Iniciando teste completo..."

# Iniciar API
echo "📡 Iniciando API..."
node server.js &
API_PID=$!
sleep 3

# Testar API diretamente
echo "🔍 Testando API..."
API_RESULT=$(curl -s http://localhost:3000/api/empresas | jq '.data | length')
echo "   Empresas na API: $API_RESULT"

# Iniciar Astro
echo "🌟 Iniciando Astro..."
npm run dev &
ASTRO_PID=$!
sleep 5

echo "🌐 Acesse:"
echo "   API: http://localhost:3000/api/empresas"
echo "   Frontend: http://localhost:4321/maquinas"
echo ""
echo "⏹️  Para parar: Ctrl+C"

# Aguardar interrupção
trap "echo '🛑 Parando serviços...'; kill $API_PID $ASTRO_PID 2>/dev/null; exit" INT
wait