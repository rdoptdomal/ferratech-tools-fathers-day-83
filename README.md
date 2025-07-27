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
DATABASE_URL="mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech"
NEXT_PUBLIC_API_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="https://ferratech.shop"
BLACKCAT_SECRET_KEY="sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT"
BLACKCAT_PUBLIC_KEY="pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo"
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
   - Eventos: `payment.created`, `payment.approved`, `payment.failed`

### Métodos de Pagamento
- **PIX** - Pagamento instantâneo
- **Cartão de Crédito** - Parcelamento em até 12x
- **Boleto** - Pagamento em até 3 dias úteis
- **Transferência Bancária** - PIX direto

## 🚀 Deploy no Netlify

### 1. Preparação
```bash
# Build local para testar
npm run build

# Commit das mudanças
git add .
git commit -m "Preparando para deploy"
git push origin main
```

### 2. Configuração no Netlify
1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente:
   ```
   DATABASE_URL=mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech
   BLACKCAT_SECRET_KEY=sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT
   BLACKCAT_PUBLIC_KEY=pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo
   NEXT_PUBLIC_SITE_URL=https://seu-dominio.netlify.app
   ```

### 3. Configuração do Banco
- MongoDB Atlas já configurado
- URL: `mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech`

### 4. Configuração do Webhook
- No painel do BlackCat, configure o webhook:
  - URL: `https://seu-dominio.netlify.app/api/webhooks/blackcat`
  - Método: POST
  - Eventos: Todos os eventos de pagamento

## 🎯 Características Técnicas

### Mobile-First
- Design responsivo otimizado para dispositivos móveis
- Componentes adaptáveis para diferentes tamanhos de tela
- Performance otimizada para conexões lentas

### SEO Otimizado
- Meta tags dinâmicas para cada página
- Estrutura de dados semântica
- URLs amigáveis e breadcrumbs
- Sitemap automático

### Performance
- Lazy loading de imagens
- Code splitting automático
- Cache inteligente com SWR
- Otimizações de bundle

### Segurança
- Validação de dados no backend
- Recalculo de preços no servidor
- Proteção contra CSRF
- Sanitização de inputs
- Verificação de assinatura de webhooks

## 📝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Suporte

- 📧 Email: contato@ferratech.com.br
- 📱 WhatsApp: (51) 98145-6622
- 🌐 Website: https://ferratech.shop

## 🙏 Agradecimentos

- BlackCat Pagamentos pela integração
- Comunidade Next.js e React
- Contribuidores do projeto 