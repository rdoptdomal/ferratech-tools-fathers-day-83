# 🚀 Instruções de Deploy - FerraTech E-commerce

## 📋 Pré-requisitos

1. **Conta no Netlify** - [netlify.com](https://netlify.com)
2. **MongoDB Atlas** - Já configurado
3. **Repositório Git** - GitHub, GitLab ou Bitbucket
4. **Chaves BlackCat** - Já configuradas no projeto

## 🔧 Configuração do Banco de Dados

### MongoDB Atlas (Já Configurado)
- **URL**: `mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech`
- **Database**: ferratech
- **Status**: ✅ Conectado e funcionando

### Verificar Conexão
```bash
# Teste a conexão localmente
npm run db:generate
npm run db:push
npm run db:seed
```

## 🚀 Deploy no Netlify

### Passo 1: Preparar o Repositório

```bash
# Certifique-se de que todos os arquivos estão commitados
git add .
git commit -m "Preparando para deploy no Netlify"
git push origin main
```

### Passo 2: Conectar ao Netlify

1. Acesse [app.netlify.com](https://app.netlify.com)
2. Clique em "New site from Git"
3. Escolha seu provedor Git
4. Selecione o repositório `ferratech-ecommerce`
5. Configure as opções de build:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: `18`

### Passo 3: Configurar Variáveis de Ambiente

No painel do Netlify, vá em **Site settings > Environment variables** e adicione:

```env
# Banco de Dados MongoDB
DATABASE_URL=mongodb+srv://rdoptdomal:Helena2270184!@ferratech.wbmjhml.mongodb.net/ferratech?retryWrites=true&w=majority&appName=ferratech

# BlackCat Pagamentos
BLACKCAT_SECRET_KEY=sk_yfcQHXDMEaZ18y2eXfNNK6gARWHB28W1w2JCiGOJRF5ANlyT
BLACKCAT_PUBLIC_KEY=pk_98LtyQC254l3zTGscDDrKUdfEpnHCvMIygtXduJJzmdzHxIo

# Site
NEXT_PUBLIC_SITE_URL=https://seu-dominio.netlify.app
NEXT_PUBLIC_API_URL=https://seu-dominio.netlify.app
NEXT_PUBLIC_SITE_NAME=FerraTech

# Opcional - Email
SENDGRID_API_KEY=sua_chave_sendgrid
SENDGRID_FROM_EMAIL=contato@ferratech.com.br

# Opcional - Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Passo 4: Configurar Banco de Dados

1. **Execute as migrações**:
   ```bash
   # Localmente ou via Netlify CLI
   npx prisma db push
   ```

2. **Popule com dados**:
   ```bash
   npm run db:seed
   ```

### Passo 5: Configurar Webhook BlackCat

1. Acesse o painel do BlackCat
2. Vá em **Configurações > Webhooks**
3. Adicione um novo webhook:
   - **URL**: `https://seu-dominio.netlify.app/api/webhooks/blackcat`
   - **Método**: POST
   - **Eventos**: 
     - `payment.created`
     - `payment.approved`
     - `payment.failed`
     - `payment.cancelled`
     - `payment.refunded`

### Passo 6: Testar o Deploy

1. **Verifique o build**:
   - Acesse a aba "Deploys" no Netlify
   - Verifique se o build foi bem-sucedido

2. **Teste as funcionalidades**:
   - Navegação entre páginas
   - Adicionar produtos ao carrinho
   - Processo de checkout
   - Integração com BlackCat

## 🔧 Troubleshooting

### Erro de Build
```bash
# Verifique os logs no Netlify
# Comum: Dependências faltando
npm install --legacy-peer-deps
```

### Erro de Banco de Dados
```bash
# Verifique a URL do MongoDB
# Teste a conexão localmente
npx prisma db push
```

### Erro de Webhook
```bash
# Verifique os logs do Netlify
# Teste o endpoint localmente
curl -X POST https://seu-dominio.netlify.app/api/webhooks/blackcat
```

## 📱 Domínio Personalizado

1. No Netlify, vá em **Domain settings**
2. Clique em **Add custom domain**
3. Configure seu domínio
4. Atualize as variáveis de ambiente:
   ```env
   NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
   ```

## 🔒 SSL/HTTPS

O Netlify fornece SSL automático. Certifique-se de:
1. Usar sempre `https://` nas URLs
2. Configurar redirecionamentos HTTP → HTTPS
3. Verificar certificados SSL

## 📊 Monitoramento

### Logs do Netlify
- Acesse **Functions > Functions log**
- Monitore erros de API

### Logs do MongoDB
- Use o MongoDB Atlas Dashboard
- Monitore queries lentas

### BlackCat Dashboard
- Monitore transações
- Verifique webhooks
- Analise métricas de pagamento

## 🚀 Otimizações

### Performance
```bash
# Build otimizado
npm run build

# Verificar bundle size
npm run build -- --analyze
```

### Cache
- Configure CDN no Netlify
- Use cache headers apropriados
- Otimize imagens

### SEO
- Configure sitemap
- Adicione meta tags
- Configure robots.txt

## 📞 Suporte

- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **BlackCat**: [blackcat.com.br](https://blackcat.com.br)
- **Prisma**: [prisma.io/docs](https://prisma.io/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

## ✅ Checklist de Deploy

- [ ] Repositório conectado ao Netlify
- [ ] Variáveis de ambiente configuradas
- [ ] MongoDB Atlas configurado
- [ ] Migrações executadas
- [ ] Dados populados
- [ ] Webhook BlackCat configurado
- [ ] Domínio personalizado (opcional)
- [ ] SSL configurado
- [ ] Testes realizados
- [ ] Monitoramento ativo

## 🎉 Deploy Concluído!

Seu e-commerce está online em: `https://seu-dominio.netlify.app`

**URL do Webhook para BlackCat**: `https://seu-dominio.netlify.app/api/webhooks/blackcat`

## 🔗 Links Importantes

- **MongoDB Atlas**: [cloud.mongodb.com](https://cloud.mongodb.com)
- **Netlify**: [app.netlify.com](https://app.netlify.com)
- **BlackCat**: [blackcat.com.br](https://blackcat.com.br) 