# 🚀 Início Rápido - FerraTech E-commerce

## ⚡ Setup em 5 minutos

### 1. Instalar Dependências
```bash
npm install
```

### 2. Testar Conexão MongoDB
```bash
npm run test:db
```

### 3. Configurar Banco de Dados
```bash
npm run db:generate
npm run db:push
npm run db:seed
```

### 4. Iniciar Desenvolvimento
```bash
npm run dev
```

## ✅ Verificações

### MongoDB Atlas
- ✅ URL configurada
- ✅ Credenciais válidas
- ✅ Database: ferratech

### BlackCat Pagamentos
- ✅ Secret Key: `sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT`
- ✅ Public Key: `pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo`
- ✅ Webhook: `/api/webhooks/blackcat`

### Funcionalidades Testadas
- ✅ Conexão com MongoDB
- ✅ API de produtos
- ✅ API de categorias
- ✅ Checkout BlackCat
- ✅ Webhook handler
- ✅ Carrinho Zustand
- ✅ Responsividade mobile

## 🎯 URLs Importantes

- **Local**: http://localhost:3000
- **API Produtos**: http://localhost:3000/api/products
- **API Categorias**: http://localhost:3000/api/categories
- **API Checkout**: http://localhost:3000/api/checkout
- **Webhook**: http://localhost:3000/api/webhooks/blackcat

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Banco de dados
npm run db:generate    # Gerar cliente Prisma
npm run db:push        # Aplicar migrações
npm run db:seed        # Popular dados
npm run db:studio      # Abrir Prisma Studio
npm run test:db        # Testar conexão MongoDB

# Deploy
npm run build          # Build para produção
```

## 📱 Teste Mobile

1. Abra DevTools (F12)
2. Clique no ícone de dispositivo móvel
3. Selecione iPhone 14 Pro Max
4. Teste todas as funcionalidades

## 🚀 Deploy

Siga as instruções em `DEPLOY_INSTRUCTIONS.md`

## 📞 Suporte

- 📧 Email: contato@ferratech.com.br
- 📱 WhatsApp: (51) 98145-6622
- 🌐 Website: https://ferratech.shop 