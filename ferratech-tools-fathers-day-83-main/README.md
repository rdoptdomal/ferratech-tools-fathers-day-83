# 🛠️ Ferratech Tools - E-commerce Completo

Sistema de e-commerce completo para loja de ferramentas com integração Supabase e BlackCat Pagamentos.

## 🚀 Funcionalidades

- **Catálogo de Produtos**: Gerenciamento completo de produtos
- **Painel Administrativo**: Interface para gestão de produtos e pedidos
- **Checkout Integrado**: Pagamentos via cartão, PIX e boleto
- **Sistema de Pedidos**: Rastreamento completo de pedidos
- **Integração BlackCat**: Processamento de pagamentos
- **Banco de Dados Supabase**: Armazenamento seguro de dados

## 🛠️ Tecnologias

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + Shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Pagamentos**: BlackCat Pagamentos
- **Deploy**: Vercel

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Supabase
- Conta no BlackCat Pagamentos

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd ferratech-tools-fathers-day-83-main
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=https://ymxmdhshkwrgyvpvwmmg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlteG1kaHNoa3dyZ3l2cHZ3bW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4ODQ3MTUsImV4cCI6MjA2ODQ2MDcxNX0.UyWasAnU67wDmc62426uM1uf3XZxNHbKQqThpijTHKA
VITE_BLACKCAT_SECRET_KEY=sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT
VITE_BLACKCAT_PUBLIC_KEY=pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo
```

4. **Configure o Supabase**
Execute os seguintes comandos SQL no seu projeto Supabase:

```sql
-- Tabela de produtos
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  brand VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  specifications TEXT[],
  in_stock BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 4.5,
  image VARCHAR,
  detailed_specs JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de pedidos
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  customer_name VARCHAR NOT NULL,
  customer_email VARCHAR NOT NULL,
  customer_phone VARCHAR NOT NULL,
  customer_cpf VARCHAR NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method VARCHAR NOT NULL,
  payment_status VARCHAR DEFAULT 'pending',
  order_status VARCHAR DEFAULT 'pending',
  blackcat_payment_id VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de itens do pedido
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id VARCHAR NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de usuários
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  role VARCHAR DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas de segurança RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Políticas para produtos (leitura pública)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Políticas para pedidos
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Políticas para itens do pedido
CREATE POLICY "Users can view their own order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()
    )
  );
```

5. **Execute o projeto**
```bash
npm run dev
```

## 🚀 Deploy no Vercel

1. **Conecte seu repositório ao Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Conecte seu repositório GitHub/GitLab

2. **Configure as variáveis de ambiente**
   No painel do Vercel, adicione as seguintes variáveis:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BLACKCAT_SECRET_KEY`
   - `VITE_BLACKCAT_PUBLIC_KEY`

3. **Deploy automático**
   O Vercel detectará automaticamente que é um projeto Vite e fará o deploy.

## 📱 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas da aplicação
├── services/           # Serviços de API
├── integrations/       # Integrações externas
│   ├── supabase/      # Cliente Supabase
│   └── blackcat/      # Cliente BlackCat
├── hooks/             # Custom hooks
├── lib/               # Utilitários
└── data/              # Dados estáticos
```

## 🔧 Configuração do BlackCat

1. **Crie uma conta no BlackCat**
   - Acesse [blackcat.com.br](https://blackcat.com.br)
   - Registre-se como comerciante

2. **Configure as credenciais**
   - Obtenha suas chaves de API
   - Configure no arquivo `.env.local`

3. **Teste os pagamentos**
   - Use os cartões de teste fornecidos
   - Teste PIX e boleto em ambiente sandbox

## 🛡️ Segurança

- Todas as chaves sensíveis estão em variáveis de ambiente
- RLS (Row Level Security) configurado no Supabase
- Validação de dados no frontend e backend
- HTTPS obrigatório em produção

## 📊 Monitoramento

- Logs de erro no Vercel
- Métricas de performance
- Monitoramento de pagamentos no BlackCat
- Analytics do Supabase

## 🆘 Suporte

Para suporte técnico:
- Email: suporte@ferratech.com.br
- Telefone: (11) 9999-9999
- Documentação: [docs.ferratech.com.br](https://docs.ferratech.com.br)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ pela equipe Ferratech**
