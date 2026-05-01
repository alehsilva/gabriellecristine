# Landing Page - Juliana Martins Psicóloga

Landing page profissional para psicóloga desenvolvida com as melhores práticas e tecnologias modernas.

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utility-first
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones modernos

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

## 🔧 Instalação

1. Clone o repositório ou navegue até a pasta:
```bash
cd "c:\Users\alexandre.silva\Documents\Gaby"
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal com fontes
│   ├── page.tsx             # Página inicial
│   └── globals.css          # Estilos globais
├── components/
│   ├── Header.tsx           # Cabeçalho com navegação
│   ├── Hero.tsx             # Seção hero principal
│   ├── About.tsx            # Seção sobre a psicóloga
│   ├── ForWho.tsx           # Para quem é o atendimento
│   ├── HowItWorks.tsx       # Como funciona o processo
│   ├── TherapeuticApproach.tsx  # Abordagem terapêutica
│   ├── Testimonials.tsx     # Depoimentos de clientes
│   ├── FAQ.tsx              # Perguntas frequentes
│   ├── CTA.tsx              # Call to action
│   ├── ContactForm.tsx      # Formulário de contato (Hook Forms + Zod)
│   ├── Footer.tsx           # Rodapé
│   └── WhatsAppButton.tsx   # Botão flutuante do WhatsApp
├── lib/
│   └── validations/
│       └── contactForm.ts   # Schema de validação Zod
└── tailwind.config.ts       # Configuração do Tailwind
```

## 🎨 Componentes

### Formulário de Contato

O formulário foi implementado com **React Hook Form** e **Zod** seguindo as melhores práticas:

- ✅ Validação em tempo real
- ✅ Mensagens de erro personalizadas
- ✅ Tipagem completa com TypeScript
- ✅ Estados de loading e sucesso/erro
- ✅ Acessibilidade (a11y)

```typescript
// Exemplo de uso do schema Zod
const contactFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().regex(/^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/),
  message: z.string().min(10),
  preferredContact: z.enum(["whatsapp", "email", "phone"]),
  acceptTerms: z.boolean().refine((val) => val === true),
});
```

## 🎯 Funcionalidades

- ✨ Design moderno e responsivo
- 📱 Mobile-first
- ⚡ Performance otimizada
- 🎨 Paleta de cores personalizada (cream, sage, terracotta)
- 📝 Formulário com validação robusta
- 💬 Integração com WhatsApp
- 🔍 SEO otimizado
- ♿ Acessível

## 🎨 Customização

### Cores

As cores podem ser personalizadas no arquivo `tailwind.config.ts`:

```typescript
colors: {
  cream: { ... },
  sage: { ... },
  terracotta: { ... },
}
```

### Conteúdo

Todo o conteúdo pode ser editado diretamente nos componentes. Para informações de contato, procure por:
- Número do WhatsApp: `5511999999999`
- CRP: `06/123456`
- Email: `contato@julianamartins.com.br`

### Imagens

Os placeholders de imagens devem ser substituídos por imagens reais. Adicione as imagens na pasta `public/` e importe usando o componente `Image` do Next.js.

## 🚀 Build para Produção

```bash
npm run build
npm start
```

## 📦 Deploy

O projeto pode ser facilmente deployado em:

- **Vercel** (recomendado para Next.js)
- **Netlify**
- **AWS Amplify**
- Qualquer plataforma que suporte Node.js

### Deploy na Vercel

1. Instale a CLI da Vercel:
```bash
npm i -g vercel
```

2. Execute:
```bash
vercel
```

## 📝 Próximos Passos

- [ ] Adicionar imagens reais
- [ ] Configurar integração com backend/API
- [ ] Adicionar Google Analytics
- [ ] Implementar Blog (opcional)
- [ ] Adicionar mais depoimentos
- [ ] Integrar com CRM ou sistema de agendamento

## 📄 Licença

Este projeto foi desenvolvido para uso profissional.

## 🤝 Suporte

Para dúvidas ou suporte, entre em contato através do WhatsApp ou email fornecido no site.

---

Desenvolvido com ❤️ usando Next.js e as melhores práticas de desenvolvimento web.
