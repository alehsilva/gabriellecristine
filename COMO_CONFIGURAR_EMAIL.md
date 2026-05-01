# 📧 Como Configurar Envio de Emails

## Status Atual

✅ **Formulário funcionando** - Valida dados, protege contra spam
❌ **Emails não são enviados** - Precisa configurar serviço de email

## 🚀 Configurar Resend (5 minutos)

### 1. Criar Conta no Resend

1. Acesse: https://resend.com/signup
2. Crie conta gratuita
3. Vá em **API Keys**
4. Crie nova chave
5. Copie a chave (começa com `re_`)

### 2. Instalar Biblioteca

```bash
npm install resend
```

### 3. Adicionar API Key

**Na Vercel:**
1. Acesse seu projeto
2. Vá em **Settings** → **Environment Variables**
3. Adicione:
   - Name: `RESEND_API_KEY`
   - Value: `re_sua_chave_aqui`
   - Environments: Production, Preview, Development

**Localmente (.env.local):**
```bash
RESEND_API_KEY=re_sua_chave_aqui
```

### 4. Atualizar Código da API

Substitua o conteúdo de `app/api/contact/route.ts` pelo conteúdo do arquivo:
📄 `docs-route-with-resend.example.txt`

Ou copie e cole este código:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contactForm';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ... resto do código está no arquivo docs-route-with-resend.example.ts
```

### 5. Commit e Push

```bash
git add .
git commit -m "feat: adiciona envio de email via Resend"
git push
```

### 6. Testar

1. Aguarde deploy na Vercel (2-3 min)
2. Acesse o site
3. Preencha o formulário
4. Verifique seu email!

## ⚠️ Importante

**Domínio do Email:**
- Resend gratuito permite enviar de `onboarding@resend.dev`
- Para usar seu domínio (`contato@gabriellecristine.com.br`), precisa:
  1. Ter um domínio registrado
  2. Configurar DNS no Resend
  3. Verificar domínio

**Limites do Plano Gratuito:**
- 100 emails/dia
- 3.000 emails/mês
- Suficiente para começar!

## 🔧 Alternativas

### SendGrid
```bash
npm install @sendgrid/mail
```
Veja documentação: https://github.com/sendgrid/sendgrid-nodejs

### Nodemailer (SMTP)
```bash
npm install nodemailer
```
Funciona com Gmail, Outlook, qualquer SMTP

### Formspree
Serviço sem código: https://formspree.io
Apenas aponta o formulário para o endpoint deles

## 📊 Monitorar Emails

Na Vercel, veja os logs:
1. Vá em **Deployments**
2. Clique no último deploy
3. Clique em **Functions**
4. Veja logs de `/api/contact`

## 🆘 Problemas Comuns

### Email não chega
- Verifique API Key no Vercel
- Verifique logs na Vercel
- Verifique pasta de spam
- Teste com outro email

### Erro 500
- Verifique se instalou `resend`
- Verifique se API Key está configurada
- Veja logs na Vercel

### Domínio não verificado
- Use `onboarding@resend.dev` temporariamente
- Configure DNS do seu domínio
- Aguarde verificação (pode demorar)

---

**Arquivo de exemplo:** [docs-route-with-resend.example.txt](docs-route-with-resend.example.txt)
