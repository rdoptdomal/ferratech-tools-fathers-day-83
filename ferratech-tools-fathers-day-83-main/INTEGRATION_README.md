# Integração BlackCatPagamentos - FerraTech Ferramentas

## Visão Geral

Esta documentação descreve a integração completa com o gateway de pagamento BlackCatPagamentos, implementada na plataforma FerraTech Ferramentas. A integração permite processar pagamentos via PIX e Cartão de Crédito com validação 3DS.

## Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
# BlackCat Pagamentos API Keys
VITE_BLACKCAT_PUBLIC_KEY=pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo
VITE_BLACKCAT_SECRET_KEY=sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT

# Site URL
VITE_SITE_URL=http://localhost:5173

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Estrutura do Banco de Dados

A tabela `orders` deve conter os seguintes campos:

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_cpf TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  order_status TEXT DEFAULT 'pending',
  blackcat_payment_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Arquitetura da Integração

### 1. Cliente BlackCat (`src/integrations/blackcat/client.ts`)

- **Autenticação**: Basic Auth usando public_key:secret_key
- **Endpoint Base**: `https://api.blackcatpagamentos.com/v1`
- **Métodos Principais**:
  - `createPayment()`: Cria nova transação
  - `getPayment()`: Consulta status da transação
  - `refundPayment()`: Processa estorno

### 2. Fluxo de Pagamento

#### PIX
1. Usuário seleciona PIX no checkout
2. Frontend envia dados para `/api/create-payment`
3. Backend cria transação no BlackCat
4. Retorna QR Code e código PIX
5. Usuário paga via app bancário
6. Webhook ou polling atualiza status
7. Redirecionamento para página de sucesso

#### Cartão de Crédito (3DS)
1. Usuário preenche dados do cartão
2. Frontend envia dados para `/api/create-payment`
3. Backend cria transação com 3DS habilitado
4. Se 3DS necessário, retorna `authentication_url`
5. Usuário é redirecionado para autenticação
6. Após autenticação, retorna para `/checkout/callback`
7. Backend verifica status final
8. Redirecionamento baseado no resultado

### 3. Páginas Implementadas

#### `/checkout`
- Formulário de dados do cliente
- Seleção de método de pagamento
- Integração com BlackCat
- Redirecionamento baseado no método

#### `/payment-pix`
- Exibe QR Code do PIX
- Permite copiar código PIX
- Verificação automática de status
- Instruções de pagamento

#### `/checkout/callback`
- Processa retorno do 3DS
- Verifica status da transação
- Atualiza pedido no banco
- Redirecionamento final

## Funcionalidades Implementadas

### 1. Segurança
- ✅ Chaves de API em variáveis de ambiente
- ✅ Autenticação Basic Auth
- ✅ Validação de dados no frontend
- ✅ Tratamento de erros robusto

### 2. Pagamento PIX
- ✅ Geração de QR Code
- ✅ Código PIX copiável
- ✅ Verificação automática de status
- ✅ Instruções claras para o usuário

### 3. Pagamento Cartão de Crédito
- ✅ Suporte a 3DS
- ✅ Redirecionamento para autenticação
- ✅ Processamento de callback
- ✅ Validação de dados do cartão

### 4. Gestão de Pedidos
- ✅ Criação automática no Supabase
- ✅ Atualização de status
- ✅ Rastreamento por transaction_id
- ✅ Histórico completo

### 5. Webhooks e Polling
- ✅ Serviço de webhooks implementado
- ✅ Polling para verificação de status
- ✅ Atualização automática de pedidos

## Endpoints da API BlackCat

### Criar Transação
```http
POST https://api.blackcatpagamentos.com/v1/transactions
Authorization: Basic {base64(public_key:secret_key)}
Content-Type: application/json

{
  "amount": 13766,
  "currency": "BRL",
  "description": "Pedido Ferratech",
  "customer": {
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "cpf": "12345678901"
  },
  "payment_method": "pix",
  "redirect_url": "https://site.com/checkout/callback",
  "enable3DS": true
}
```

### Consultar Transação
```http
GET https://api.blackcatpagamentos.com/v1/transactions/{transaction_id}
Authorization: Basic {base64(public_key:secret_key)}
```

## Tratamento de Erros

### Erros Comuns
1. **Cartão recusado**: Redirecionamento para página de erro
2. **3DS falhou**: Retorno ao checkout
3. **PIX expirado**: Geração de novo QR Code
4. **Erro de rede**: Retry automático

### Logs
- Todos os erros são logados no console
- Webhooks são processados com logs detalhados
- Status de transações é monitorado

## Testes

### Ambiente de Teste
- Use cartões de teste fornecidos pelo BlackCat
- Teste PIX com valores pequenos
- Verifique logs de erro e sucesso

### Cenários de Teste
1. Pagamento PIX bem-sucedido
2. Pagamento cartão sem 3DS
3. Pagamento cartão com 3DS
4. Cartão recusado
5. Timeout de PIX
6. Erro de rede

## Deploy

### Vercel
1. Configure as variáveis de ambiente no Vercel
2. Deploy automático via GitHub
3. Verifique logs de erro

### Produção
1. Use chaves de produção do BlackCat
2. Configure webhooks para produção
3. Teste todos os fluxos
4. Monitore logs e métricas

## Monitoramento

### Métricas Importantes
- Taxa de conversão por método de pagamento
- Tempo médio de processamento
- Taxa de erro por tipo
- Status de webhooks

### Alertas
- Falhas de webhook
- Erros de autenticação
- Timeouts de transação
- Pedidos não processados

## Suporte

Para dúvidas sobre a integração:
1. Verifique logs do console
2. Teste endpoints individualmente
3. Consulte documentação do BlackCat
4. Entre em contato com o suporte técnico

---

**Versão**: 1.0.0  
**Última atualização**: 2024-01-XX  
**Status**: ✅ Implementado e Testado 