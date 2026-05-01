# 🚀 Guia de Deploy Seguro - Vercel

## Pré-requisitos

✅ Código no GitHub/GitLab/Bitbucket
✅ Conta na Vercel (gratuita)
✅ Variáveis de ambiente configuradas

## Passo a Passo

### 1. Preparar Código para Deploy

```bashw
# Testar build localmente
npm run build

# Testar produção localmente
npm start

# Verificar se não há erros
npm run lint
```

### 2. Criar .env.local

```bash
# Copiar template
cp .env.local.template .env.local

# Editar com suas informações reais
# Importante: NÃO commitar este arquivo!
```

### 3. Fazer Deploy na Vercel

#### Opção A: Via Interface Web (Mais Fácil)

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Click em "Add New Project"
4. Selecione o repositório do projeto
5. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - `NEXT_PUBLIC_CONTACT_EMAIL`
   - `NEXT_PUBLIC_PHONE`
   - `NEXT_PUBLIC_CRP`
   - `NEXT_PUBLIC_INSTAGRAM`
   - `NEXT_PUBLIC_LINKEDIN`
6. Click em "Deploy"

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 4. Configurar Variáveis de Ambiente na Vercel

1. Acesse o Dashboard do projeto
2. Vá em "Settings" → "Environment Variables"
3. Adicione cada variável:
   - Nome: `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - Valor: `5541998821250` (seu número real)
   - Ambiente: Production, Preview, Development
4. Click em "Save"
5. Repita para todas as variáveis

### 5. Configurar Domínio Customizado (Opcional)

1. Vá em "Settings" → "Domains"
2. Adicione seu domínio
3. Configure DNS conforme instruções

### 6. Verificar Deploy

- [ ] Site carrega corretamente
- [ ] Formulário de contato funciona
- [ ] WhatsApp abre corretamente
- [ ] HTTPS está ativo (cadeado verde)
- [ ] Não há erros no console do navegador

## 🔒 Checklist de Segurança Pós-Deploy

- [ ] ✅ HTTPS configurado automaticamente
- [ ] ✅ Headers de segurança aplicados (verificar em securityheaders.com)
- [ ] ✅ Formulário protegido contra spam
- [ ] ✅ Rate limiting ativo
- [ ] ✅ Variáveis de ambiente não expostas no código
- [ ] ✅ .env.local NÃO está no Git
- [ ] ⚠️ Configurar serviço de email (Resend recomendado)
- [ ] ⚠️ Adicionar Google reCAPTCHA (opcional mas recomendado)

## 📧 Próximo Passo: Configurar Envio de Emails

### Opção Recomendada: Resend

1. Crie conta em [resend.com](https://resend.com)
2. Copie a API Key
3. Adicione no Vercel: `RESEND_API_KEY=re_xxxxx`
4. Instale a biblioteca:
   ```bash
   npm install resend
   ```
5. Atualize `/app/api/contact/route.ts` para usar Resend

### Configuração Resend no código:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'contato@seu-dominio.com',
  to: process.env.CONTACT_RECIPIENT_EMAIL,
  subject: `Novo contato: ${sanitizedData.name}`,
  html: `
    <h2>Novo contato recebido</h2>
    <p><strong>Nome:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Telefone:</strong> ${sanitizedData.phone}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${sanitizedData.message}</p>
    <p><strong>Preferência:</strong> ${sanitizedData.preferredContact}</p>
  `,
});
```

## 🛡️ Melhorias Futuras (Opcional)

- [ ] Adicionar Google reCAPTCHA v3
- [ ] Configurar Sentry para monitoramento de erros
- [ ] Adicionar Google Analytics
- [ ] Configurar sitemap.xml
- [ ] Adicionar meta tags Open Graph
- [ ] Otimizar imagens com next/image
- [ ] Adicionar testes automatizados

## 📊 Monitoramento

- **Vercel Analytics**: Ative nas configurações do projeto
- **Google Search Console**: Adicione o site
- **PageSpeed Insights**: Teste performance

## 🆘 Problemas Comuns

### Formulário não envia
- Verifique console do navegador (F12)
- Verifique logs na Vercel
- Confirme que rota `/api/contact` está acessível

### WhatsApp não abre
- Verifique formato do número (sem espaços, com código do país)
- Teste o link manualmente

### Variável de ambiente não funciona
- Confirme que adicionou na Vercel
- Faça redeploy após adicionar variáveis
- Variáveis públicas devem começar com `NEXT_PUBLIC_`

## 🎉 Pronto!

Seu site está seguro e no ar! 🚀

**URL do projeto**: Será algo como `seu-projeto.vercel.app`
