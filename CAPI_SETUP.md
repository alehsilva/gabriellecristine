# Guia de Configuração: Facebook Conversions API (CAPI)

## 📋 O que foi implementado

Implementei um sistema completo de rastreamento que envia eventos do Facebook Pixel tanto pelo **navegador** quanto pelo **servidor** (CAPI), com desduplicação automática. Isso aumentará significativamente a taxa de cobertura dos eventos.

## 🎯 Arquivos criados/modificados

### Novos arquivos:
1. **`lib/facebook-capi.ts`** - Utilitário para enviar eventos server-side
2. **`app/api/facebook-capi/route.ts`** - API route para processar eventos CAPI

### Arquivos modificados:
1. **`components/FacebookPixel.tsx`** - Atualizado para enviar PageView com event_id e CAPI
2. **`components/ContactForm.tsx`** - Atualizado para enviar Lead com desduplicação
3. **`app/api/contact/route.ts`** - Adicionado envio CAPI para conversões de formulário
4. **`.env.local`** - Configurado com token CAPI
5. **`.env.example`** e **`.env.local.template`** - Documentação atualizada

## ✅ Como funciona a desduplicação

O sistema usa `event_id` único para cada evento:
- O mesmo `event_id` é enviado pelo navegador (Pixel) e pelo servidor (CAPI)
- O Facebook automaticamente deduplica e conta como **1 único evento**
- Isso aumenta a **taxa de cobertura** sem duplicar conversões

### Eventos implementados com CAPI:

#### 1. **PageView** (Visualização de página)
- ✅ Navegador: Enviado automaticamente quando a página carrega
- ✅ Servidor: Enviado automaticamente via `/api/facebook-capi`
- ✅ Desduplicação: Sim (mesmo event_id)

#### 2. **Lead** (Conversão de formulário)
- ✅ Navegador: Enviado quando o usuário submete o formulário
- ✅ Servidor: Enviado com dados enriquecidos (email, nome, telefone)
- ✅ Desduplicação: Sim (mesmo event_id)
- ✅ Dados sensíveis: Automaticamente com hash SHA256

## 🚀 Como testar

### 1. **Reiniciar o servidor de desenvolvimento**

```bash
npm run dev
```

### 2. **Testar eventos no Gerenciador de Eventos do Facebook**

Acesse: https://business.facebook.com/events_manager2/list/pixel/4497279150508477/overview

Você deve ver:
- ✅ Eventos chegando de **2 origens**: Browser e Server
- ✅ Taxa de eventos com CAPI deve aumentar para **75%+**
- ✅ Qualidade do evento deve melhorar (mais dados disponíveis)

### 3. **Usar Test Events (Opcional mas recomendado)**

Para validar antes de ir ao vivo:

1. Acesse: https://business.facebook.com/events_manager2/list/pixel/4497279150508477/test_events
2. Copie o código de teste fornecido
3. Adicione ao `.env.local`:
   ```
   META_TEST_EVENT_CODE=TEST12345
   ```
4. Navegue no site e submeta o formulário
5. Veja os eventos aparecerem em tempo real no Test Events

### 4. **Verificar logs no console do servidor**

Durante o desenvolvimento, você verá logs como:
```
✅ Facebook CAPI: PageView sent successfully
✅ Facebook CAPI: Lead sent successfully
```

## 📊 Resultados esperados

Após a implementação, você deve observar:

| Métrica | Antes | Depois |
|---------|-------|--------|
| Taxa de cobertura CAPI | < 50% | **75%+** |
| Qualidade dos eventos | Média | **Alta** |
| Dados disponíveis | Básicos | **Enriquecidos** |
| Custo por resultado | — | **Redução esperada** |

## 🔐 Segurança

✅ **Token CAPI protegido**: Apenas no servidor, nunca exposto ao navegador
✅ **Dados sensíveis com hash**: Email, telefone e nome com SHA256
✅ **Rate limiting**: Proteção contra abuso nas APIs
✅ **Validação de entrada**: Zod schema no backend

## 🐛 Solução de problemas

### Eventos não aparecem no Gerenciador de Eventos

1. Verifique se o token CAPI está correto no `.env.local`
2. Confirme que o servidor está rodando (não apenas build)
3. Verifique o console do servidor para erros
4. Use Test Events para debug em tempo real

### Taxa de cobertura ainda baixa

- Aguarde 24-48h para o Facebook processar os dados
- Verifique se ambos os eventos (navegador + servidor) estão sendo enviados
- Confirme que os cookies `_fbp` e `_fbc` estão presentes

### Erro "Missing PIXEL_ID or ACCESS_TOKEN"

- Confirme que o arquivo `.env.local` existe
- Reinicie o servidor de desenvolvimento após alterar variáveis de ambiente
- Verifique se não há espaços extras no token

## 📚 Documentação oficial

- [Facebook Conversions API](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Event Deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [Server-Side Parameters](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event)

## ✨ Próximos passos (opcional)

Para melhorar ainda mais:

1. **Implementar mais eventos**: AddToCart, InitiateCheckout, Purchase
2. **Configurar Advanced Matching**: Enviar mais dados do usuário
3. **Monitorar Event Match Quality**: Acompanhar a qualidade dos dados
4. **A/B Testing**: Comparar resultados antes e depois da CAPI
