#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento..."

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Iniciar em modo desenvolvimento
echo "🎯 Iniciando servidor híbrido..."
npm run dev