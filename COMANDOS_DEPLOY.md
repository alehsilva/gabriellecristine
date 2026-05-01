# 🚀 Comandos para Deploy - Gabrielle Cristine

## 📦 1. Subir Código para GitHub

Execute estes comandos no terminal (na pasta do projeto):

```bash
# Inicializar Git (se ainda não iniciou)
git init

# Adicionar repositório remoto
git remote add origin https://github.com/alehsilva/gabriellecristine.git

# Criar .env.local (IMPORTANTE!)
cp .env.local.template .env.local

# Verificar o que será commitado
git status

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "feat: site psicóloga com formulário seguro e proteções"

# Enviar para GitHub (branch main)
git push -u origin main
```

**⚠️ IMPORTANTE**: Se der erro no push, pode ser que a branch se chame `master`:
```bash
git branch -M main
git push -u origin main
```

## 🌐 2. Deploy na Vercel

### Opção A: Interface Web (Recomendado - 5 minutos)

1. **Acesse**: https://vercel.com/new
2. **Login**: Clique em "Continue with GitHub"
3. **Import Repository**: 
   - Procure por `alehsilva/gabriellecristine`
   - Clique em "Import"
4. **Configure o Projeto**:
   - Project Name: `gabriellecristine` (ou outro nome)
   - Framework Preset: Next.js (detecta automaticamente)
   - Root Directory: `./` (não mude)
   - Build Command: `next build` (padrão)
   - Output Directory: `.next` (padrão)

5. **Environment Variables** (CRÍTICO!):
   Clique em "Add Environment Variable" e adicione:
   
   ```
   Nome: NEXT_PUBLIC_WHATSAPP_NUMBER
   Valor: 5541998821250
   ```
   
   ```
   Nome: NEXT_PUBLIC_CONTACT_EMAIL
   Valor: gabriellecristinecarraro@gmail.com
   ```
   
   ```
   Nome: NEXT_PUBLIC_PHONE
   Valor: 41998821250
   ```
   
   ```
   Nome: NEXT_PUBLIC_CRP
   Valor: 08/44356
   ```
   
   ```
   Nome: NEXT_PUBLIC_INSTAGRAM
   Valor: gabriellecarraro.psi
   ```
   
   ```
   Nome: NEXT_PUBLIC_LINKEDIN
   Valor: gabriellecarraro
   ```

6. **Deploy**: Clique em "Deploy" e aguarde 2-3 minutos

7. **Pronto!** 🎉 Você receberá uma URL como:
   - `https://gabriellecristine.vercel.app`
   - ou `https://gabriellecristine-alehsilva.vercel.app`

### Opção B: Via CLI (Alternativa)

```bash
# Instalar Vercel CLI globalmente
npm install -g vercel

# Login na Vercel
vercel login

# Deploy (primeira vez)
vercel

# Seguir prompts interativos:
# - Set up and deploy? Yes
# - Which scope? [sua conta]
# - Link to existing project? No
# - What's your project's name? gabriellecristine
# - In which directory is your code located? ./
# - Want to override settings? No

# Adicionar variáveis de ambiente via CLI
vercel env add NEXT_PUBLIC_WHATSAPP_NUMBER production
# Cole: 5541998821250

vercel env add NEXT_PUBLIC_CONTACT_EMAIL production
# Cole: gabriellecristinecarraro@gmail.com

# ... repita para todas as variáveis

# Deploy para produção
vercel --prod
```

## ✅ 3. Verificar Deploy

Após o deploy, teste:

1. **Abra o site**: URL fornecida pela Vercel
2. **Teste HTTPS**: Verifique se tem cadeado verde
3. **Teste formulário**:
   - Preencha com dados válidos
   - Verifique se valida corretamente
   - Envie o formulário
   - Verifique se WhatsApp abre
4. **Abra o Console** (F12): Não deve ter erros

## 📧 4. Configurar Email (URGENTE - Após Deploy)

O formulário está funcionando mas **não envia emails ainda**. Faça isso nas próximas 24h:

### 4.1. Criar Conta no Resend

1. Acesse: https://resend.com/signup
2. Crie conta (gratuito)
3. Vá em "API Keys"
4. Clique "Create API Key"
5. Copie a chave (começa com `re_`)

### 4.2. Adicionar API Key na Vercel

1. Acesse seu projeto na Vercel
2. Vá em "Settings" → "Environment Variables"
3. Adicione nova variável:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_sua_chave_aqui`
   - **Environments**: Production, Preview, Development
4. Clique "Save"

### 4.3. Adicionar Biblioteca Resend

```bash
# No terminal do projeto
npm install resend

# Commitar
git add package.json package-lock.json
git commit -m "feat: adiciona Resend para envio de emails"
git push
```

### 4.4. Atualizar código da API

Vou criar um arquivo com o código atualizado...

## 🎯 Comandos Rápidos (Copiar e Colar)

### Primeiro Deploy (tudo de uma vez)

```bash
# 1. Configurar Git
git init
git remote add origin https://github.com/alehsilva/gabriellecristine.git

# 2. Criar .env.local
cp .env.local.template .env.local

# 3. Testar build local
npm install
npm run build

# 4. Enviar para GitHub
git add .
git commit -m "feat: site com formulário seguro e proteções"
git branch -M main
git push -u origin main
```

Depois: **Faça deploy na Vercel pela interface web** (mais fácil)

### Atualizações Futuras

```bash
# Fazer mudanças no código...

# Testar localmente
npm run dev

# Enviar para GitHub (deploy automático na Vercel)
git add .
git commit -m "descrição da mudança"
git push
```

## 🔥 Atalhos Úteis

### Ver status do Git
```bash
git status
```

### Desfazer mudanças (antes do commit)
```bash
git checkout .
```

### Ver logs na Vercel (se algo der errado)
1. Acesse o projeto na Vercel
2. Vá em "Deployments"
3. Clique no último deployment
4. Clique em "View Function Logs"

## ⚠️ Problemas Comuns

### Erro: "Repository not found"
```bash
# Verifique se adicionou o remote correto
git remote -v

# Se estiver errado, remova e adicione novamente
git remote remove origin
git remote add origin https://github.com/alehsilva/gabriellecristine.git
```

### Erro: "Updates were rejected"
```bash
# Forçar push (primeira vez, cuidado!)
git push -u origin main --force
```

### Build falhou na Vercel
- Verifique os logs na Vercel
- Confirme que `npm run build` funciona localmente
- Verifique se todas as variáveis de ambiente foram adicionadas

### Variáveis de ambiente não funcionam
- Confirme que adicionou TODAS as variáveis na Vercel
- Faça um novo deploy (ou clique em "Redeploy")
- Variáveis com `NEXT_PUBLIC_` são acessíveis no browser

## 🎉 Próximos Passos

Depois que o site estiver no ar:

1. ✅ Configurar domínio customizado (se tiver)
2. ✅ Configurar Resend para emails
3. ✅ Testar formulário em produção
4. ✅ Compartilhar o link!

---

**URL do Repositório**: https://github.com/alehsilva/gabriellecristine
**Vercel Dashboard**: https://vercel.com/dashboard
