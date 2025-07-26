#!/bin/bash

# Script de Deploy Automatizado - FerraTech Tools
# Email: rdopt12@gmail.com

echo "🚀 Iniciando deploy da FerraTech Tools..."

# 1. Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na raiz do projeto"
    exit 1
fi

# 2. Instalar dependências
echo "📦 Instalando dependências..."
npm install

# 3. Executar build
echo "🔨 Executando build..."
npm run build

# 4. Verificar se o build foi bem-sucedido
if [ ! -d "dist" ]; then
    echo "❌ Erro: Build falhou"
    exit 1
fi

echo "✅ Build concluído com sucesso!"

# 5. Configurar Git (se necessário)
if [ ! -d ".git" ]; then
    echo "📝 Inicializando repositório Git..."
    git init
    git add .
    git commit -m "Initial commit - FerraTech Tools"
fi

# 6. Configurar remote do GitHub
echo "🔗 Configurando GitHub..."
git remote add origin https://github.com/rdopt12/ferratech-tools.git 2>/dev/null || git remote set-url origin https://github.com/rdopt12/ferratech-tools.git

# 7. Fazer push para GitHub
echo "📤 Fazendo push para GitHub..."
git add .
git commit -m "Deploy: FerraTech Tools - $(date)"
git push -u origin main

echo "✅ Push para GitHub concluído!"

# 8. Instalar Vercel CLI (se necessário)
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# 9. Deploy no Vercel
echo "🚀 Fazendo deploy no Vercel..."
vercel --prod --yes

echo "✅ Deploy concluído!"
echo "🌐 URL: https://ferratech-tools.vercel.app"
echo "📊 Dashboard: https://vercel.com/rdopt12/ferratech-tools" 