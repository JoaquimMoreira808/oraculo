#!/bin/bash

echo "🔧 Configurando usuário MySQL para Omni-Data..."

# Verificar se MySQL está rodando
if ! pgrep -x "mysqld" > /dev/null; then
    echo "❌ MySQL não está rodando. Inicie o MySQL primeiro."
    echo "   sudo systemctl start mysql"
    exit 1
fi

echo "📝 Criando usuário e database omni_data..."

# Executar script SQL como root
mysql -u root -p < create-user.sql

if [ $? -eq 0 ]; then
    echo "✅ Usuário omni_data criado com sucesso!"
    echo "✅ Database omni_data configurado!"
    echo ""
    echo "🔧 Agora você pode executar:"
    echo "   ./dev.sh"
else
    echo "❌ Erro ao criar usuário. Verifique se você tem acesso root ao MySQL."
    echo "   Tente executar manualmente:"
    echo "   mysql -u root -p < create-user.sql"
fi