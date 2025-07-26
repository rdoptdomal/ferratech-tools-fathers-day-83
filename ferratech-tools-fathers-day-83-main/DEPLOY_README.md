# 🚀 Guia de Deploy - FerraTech Tools

## 📋 Pré-requisitos

- Node.js 18+
- Git
- Conta no GitHub (rdopt12@gmail.com)
- Conta no Vercel (rdopt12@gmail.com)

## 🔧 Configuração Inicial

### 1. **GitHub Setup**

```bash
# Clone o repositório
git clone https://github.com/rdopt12/ferratech-tools.git
cd ferratech-tools

# Configure suas credenciais
git config user.name "rdopt12"
git config user.email "rdopt12@gmail.com"
```

### 2. **Vercel Setup**

```bash
# Instale o Vercel CLI
npm install -g vercel

# Faça login no Vercel
vercel login
```

### 3. **Variáveis de Ambiente**

As seguintes variáveis já estão configuradas no `vercel.json`:

```env
VITE_SUPABASE_URL=https://ymxmdhshkwrgyvpvwmmg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_BLACKCAT_SECRET_KEY=sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT
VITE_BLACKCAT_PUBLIC_KEY=pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo
VITE_GA_TRACKING_ID=G-1234567890
VITE_SITE_URL=https://ferratech-tools.vercel.app
```

## 🚀 Deploy Automatizado

### Opção 1: Script Automatizado

```bash
# Execute o script de deploy
chmod +x deploy.sh
./deploy.sh
```

### Opção 2: Deploy Manual

```bash
# 1. Build do projeto
npm install
npm run build

# 2. Commit e push para GitHub
git add .
git commit -m "Deploy: FerraTech Tools"
git push origin main

# 3. Deploy no Vercel
vercel --prod
```

## 📊 Configuração do Banco de Dados

### PostgreSQL via Supabase

O projeto está configurado para usar PostgreSQL através do Supabase:

1. **URL do Banco**: `https://ymxmdhshkwrgyvpvwmmg.supabase.co`
2. **Schema**: Executar `supabase/schema.sql`
3. **Tabelas Principais**:
   - `products` - Catálogo de produtos
   - `orders` - Pedidos dos clientes
   - `order_items` - Itens dos pedidos
   - `users` - Usuários do sistema

### Executar Schema

```sql
-- Execute o schema no Supabase SQL Editor
-- Arquivo: supabase/schema.sql
```

## 📈 Google Analytics

### Configuração

- **ID do GA4**: `G-1234567890`
- **Eventos Rastreados**:
  - `add_to_cart` - Adicionar ao carrinho
  - `begin_checkout` - Iniciar checkout
  - `purchase` - Compra finalizada
  - `view_item` - Visualizar produto
  - `search` - Busca no site

### Verificar Implementação

```javascript
// No console do navegador
gtag('event', 'test', {
  event_category: 'test',
  event_label: 'test'
});
```

## 🔍 URLs Importantes

### Produção
- **Site**: https://ferratech-tools.vercel.app
- **Dashboard Vercel**: https://vercel.com/rdopt12/ferratech-tools
- **GitHub**: https://github.com/rdopt12/ferratech-tools

### Desenvolvimento
- **Local**: http://localhost:5173
- **Build**: http://localhost:4173

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview
npm run preview

# Lint
npm run lint

# Deploy rápido
vercel --prod
```

## 📱 Funcionalidades Implementadas

### ✅ Mobile-First
- Responsivo em todos os dispositivos
- Gestos touch otimizados
- Performance mobile

### ✅ E-commerce
- Catálogo de produtos
- Carrinho de compras
- Checkout integrado
- Pagamentos (PIX, Cartão)

### ✅ Pós-Venda
- Rastreamento de pedidos
- Sistema de devoluções
- Suporte ao cliente

### ✅ SEO & Analytics
- Sitemap XML
- Google Analytics 4
- Meta tags otimizadas
- Structured Data

## 🔒 Segurança

- **HTTPS**: Configurado automaticamente
- **Headers de Segurança**: Implementados
- **CORS**: Configurado corretamente
- **Rate Limiting**: Proteção contra spam

## 📞 Suporte

Para dúvidas sobre o deploy:

- **Email**: rdopt12@gmail.com
- **GitHub Issues**: https://github.com/rdopt12/ferratech-tools/issues
- **Vercel Support**: https://vercel.com/support

---

**Status**: ✅ Pronto para Deploy  
**Última Atualização**: 26/01/2024 