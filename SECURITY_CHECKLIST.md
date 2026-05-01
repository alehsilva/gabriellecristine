# ✅ Checklist de Segurança para Deploy

## 🔴 CRÍTICO - Fazer ANTES do Deploy

### 1. Implementar API Route para Formulário de Contato
**Status**: ⚠️ PENDENTE
- [ ] O formulário atual apenas faz `console.log()` - isso não funciona em produção
- [ ] Criar rota API segura em `/app/api/contact/route.ts`
- [ ] Implementar validação server-side com Zod
- [ ] Adicionar rate limiting para prevenir spam

### 2. Configurar Variáveis de Ambiente
**Status**: ⚠️ PENDENTE
- [ ] Criar arquivo `.env.local` (baseado no `.env.example`)
- [ ] NUNCA commitar `.env.local` no Git (já está no .gitignore ✅)
- [ ] Configurar variáveis no painel da plataforma de deploy
- [ ] Usar `NEXT_PUBLIC_` apenas para valores que podem ser públicos

### 3. Proteger Contra Spam e Bots
**Status**: ⚠️ PENDENTE
- [ ] Implementar Google reCAPTCHA v3 OU Cloudflare Turnstile
- [ ] Adicionar honeypot field no formulário
- [ ] Implementar rate limiting (max 5 submissões por IP/hora)

### 4. Ocultar Informações Sensíveis
**Status**: ⚠️ ATENÇÃO
- [ ] Remover número de WhatsApp hardcoded no código (linha 46 do ContactForm.tsx)
- [ ] Mover para variável de ambiente
- [ ] Verificar se não há emails ou números expostos no código

## 🟡 IMPORTANTE - Configurações de Segurança

### 5. Headers de Segurança HTTP
**Status**: ⚠️ PENDENTE
```javascript
// Adicionar no next.config.js
headers: [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]
```

### 6. HTTPS e Domínio
- [ ] Certificado SSL configurado automaticamente (Vercel/Netlify fazem isso)
- [ ] Configurar redirect HTTP → HTTPS
- [ ] Configurar domínio customizado

### 7. Validação e Sanitização
- [ ] ✅ Validação client-side com Zod (já implementado)
- [ ] Implementar validação server-side idêntica
- [ ] Sanitizar inputs antes de enviar emails

## 🟢 RECOMENDADO - Boas Práticas

### 8. Monitoramento e Analytics
- [ ] Configurar Google Analytics ou alternativa
- [ ] Configurar error tracking (Sentry, LogRocket)
- [ ] Monitorar taxa de submissão de formulários

### 9. Performance e SEO
- [ ] Configurar meta tags corretas (verificar layout.tsx)
- [ ] Adicionar sitemap.xml
- [ ] Adicionar robots.txt
- [ ] Otimizar imagens

### 10. Backup e Versionamento
- [ ] Garantir que código está no Git
- [ ] Fazer backup do repositório
- [ ] Documentar processo de deploy

## 📋 Plataformas Recomendadas

### Vercel (Mais Recomendada para Next.js)
✅ Deploy automático do GitHub
✅ HTTPS gratuito
✅ CDN global
✅ Variáveis de ambiente seguras
✅ Preview deployments
✅ Zero configuração

### Netlify (Alternativa)
✅ Similar ao Vercel
✅ Form handling nativo (útil para seu formulário)
✅ HTTPS gratuito

### Cloudflare Pages
✅ CDN extremamente rápido
✅ HTTPS gratuito
✅ Boa camada de segurança

## 🚀 Próximos Passos Imediatos

1. **Implementar API Route segura** (arquivo será criado)
2. **Adicionar proteção anti-spam**
3. **Configurar variáveis de ambiente**
4. **Atualizar headers de segurança**
5. **Deploy na Vercel**

---

## 📞 Informações Sensíveis Encontradas

⚠️ **Atenção**: Encontrei as seguintes informações expostas no código que devem ser movidas para variáveis de ambiente:

- WhatsApp: `5511999999999` (ContactForm.tsx linha 46)
- Email: `gabriellecristinecarraro@gmail.com` (.env.example)
- Telefone: `41998821250` (.env.example)
- Instagram: `gabriellecarraro.psi` (.env.example)

**Estas informações estão no .env.example (OK) mas o WhatsApp no ContactForm.tsx está hardcoded e deve ser corrigido.**
