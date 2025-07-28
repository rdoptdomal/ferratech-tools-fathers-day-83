# FerraTech E-commerce

Uma plataforma de e-commerce moderna construída com Next.js, TypeScript, TailwindCSS e MongoDB, integrada com BlackCat Pagamentos.

## 🚀 Tecnologias Utilizadas

- **Next.js 13** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utilitário
- **Prisma** - ORM para banco de dados
- **MongoDB** - Banco de dados NoSQL
- **BlackCat Pagamentos** - Gateway de pagamento
- **Zustand** - Gerenciamento de estado
- **Lucide React** - Ícones
- **Netlify** - Deploy

## 📋 Pré-requisitos

- Node.js 18+ 
- MongoDB Atlas (gratuito)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/ferratech-ecommerce.git
cd ferratech-ecommerce
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:
```env
DATABASE_URL="your_mongodb_atlas_url_here"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="https://ferratech.shop"
BLACKCAT_SECRET_KEY="your_blackcat_secret_key_here"
BLACKCAT_PUBLIC_KEY="your_blackcat_public_key_here"
```

4. **Configure o banco de dados MongoDB**
```bash
# Gere o cliente Prisma
npm run db:generate

# Execute as migrações
npm run db:push

# Popule com dados de exemplo
npm run db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   │   ├── products/      # Produtos
│   │   ├── categories/    # Categorias
│   │   ├── checkout/      # Checkout
│   │   └── webhooks/      # Webhooks BlackCat
│   ├── categoria/         # Páginas de categoria
│   ├── produto/          # Páginas de produto
│   ├── globals.css       # Estilos globais
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Página inicial
├── components/            # Componentes React
│   ├── Header.tsx        # Header com Mega Menu
│   ├── Footer.tsx        # Footer
│   ├── ProductCard.tsx   # Card de produto
│   ├── CategoryPage.tsx  # Página de categoria
│   └── HomePage.tsx      # Página inicial
├── store/                # Gerenciamento de estado
│   └── cartStore.ts      # Store do carrinho
└── lib/                  # Utilitários
    └── prisma.ts         # Cliente Prisma

prisma/
└── schema.prisma         # Schema do banco de dados

scripts/
└── seed.ts              # Script para popular banco
```

## 🎨 Funcionalidades

### ✅ Implementadas
- [x] **Mega Menu** - Navegação por categorias e subcategorias
- [x] **Páginas de Categoria** - Listagem com filtros e paginação
- [x] **Cards de Produto** - Suporte a variações (cor, tamanho, etc.)
- [x] **Carrinho de Compras** - Gerenciamento com Zustand
- [x] **API Routes** - Endpoints para produtos, categorias e checkout
- [x] **BlackCat Integration** - Gateway de pagamento completo
- [x] **Webhook Handler** - Processamento de notificações
- [x] **Responsividade** - Mobile-first design
- [x] **SEO** - Meta tags dinâmicas e estrutura otimizada
- [x] **Performance** - Lazy loading e otimizações

### 🚧 Em Desenvolvimento
- [ ] **Checkout Multi-step** - Processo de compra em etapas
- [ ] **Sistema de Usuários** - Login, cadastro, perfil
- [ ] **Painel Administrativo** - Gestão de produtos e pedidos
- [ ] **Sistema de Avaliações** - Reviews de produtos
- [ ] **Wishlist** - Lista de desejos
- [ ] **Notificações** - Email e push notifications

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o linter
npm run db:generate  # Gera o cliente Prisma
npm run db:push      # Aplica as migrações
npm run db:studio    # Abre o Prisma Studio
npm run db:seed      # Popula o banco com dados
npm run db:reset     # Reseta e popula o banco
```

## 💳 Integração BlackCat

### Configuração
1. Configure as chaves do BlackCat no `.env.local`
2. Configure o webhook no painel do BlackCat:
   - URL: `https://ferratech.shop/api/webhooks/blackcat`
   - Eventos: `payment.created`, `