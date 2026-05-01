# Guia de Personalização

Este documento explica como personalizar a landing page para suas necessidades específicas.

## 📝 Alterando Informações de Contato

### WhatsApp

Procure por `5511999999999` em todos os arquivos e substitua pelo número correto:

**Arquivos a modificar:**
- `components/Header.tsx`
- `components/Hero.tsx`
- `components/CTA.tsx`
- `components/WhatsAppButton.tsx`
- `.env.example`

### CRP e Informações Profissionais

Procure por `06/123456` e substitua pelo CRP correto:

**Arquivos a modificar:**
- `app/layout.tsx` (metadata)
- `components/Header.tsx`
- `components/About.tsx`
- `components/Testimonials.tsx`
- `components/Footer.tsx`

### Email

Procure por `contato@julianamartins.com.br`:

**Arquivos a modificar:**
- `components/Footer.tsx`
- `.env.example`

## 🎨 Personalizando Cores

As cores são definidas no `tailwind.config.ts`:

```typescript
colors: {
  cream: {
    50: '#faf8f5',   // Fundo principal
    100: '#f5f1ea',
    // ...
  },
  sage: {
    // Verde suave
  },
  terracotta: {
    // Laranja/terracota para CTAs
  },
}
```

### Como usar as cores:

- `bg-cream-50` - Fundo principal
- `text-terracotta-500` - Títulos e CTAs
- `bg-sage-500` - Botões secundários

## 🖼️ Adicionando Imagens

1. Coloque as imagens na pasta `public/`:
```
public/
  ├── hero-image.jpg
  ├── about-photo.jpg
  └── office.jpg
```

2. Substitua os placeholders nos componentes:

```tsx
// Antes
<div className="absolute inset-0 bg-gradient-to-br from-cream-300 to-sage-200 flex items-center justify-center">
  <p className="text-gray-400 text-sm">Imagem Hero</p>
</div>

// Depois
import Image from "next/image";

<Image
  src="/hero-image.jpg"
  alt="Juliana Martins Psicóloga"
  fill
  className="object-cover"
  priority
/>
```

**Arquivos com placeholders de imagem:**
- `components/Hero.tsx`
- `components/About.tsx`
- `components/TherapeuticApproach.tsx`
- `components/CTA.tsx`

## ✍️ Modificando Textos

### Hero Section (components/Hero.tsx)

- Título principal
- Subtítulo
- Texto descritivo
- CTA button text

### About Section (components/About.tsx)

- Texto "Sobre mim"
- Descrição profissional
- Credenciais e formações

### Para Quem (components/ForWho.tsx)

Array `situations` - adicione ou remova situações:

```typescript
const situations = [
  {
    icon: Brain,
    title: "Sua situação",
    description: "Descrição...",
  },
  // Adicione mais...
];
```

## 📧 Integrando o Formulário com Backend

### Opção 1: Formspree

1. Crie uma conta em [formspree.io](https://formspree.io)
2. Crie um novo form e copie o endpoint
3. Em `components/ContactForm.tsx`, modifique o `onSubmit`:

```typescript
const onSubmit = async (data: ContactFormData) => {
  const response = await fetch('https://formspree.io/f/SEU_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // ...
};
```

### Opção 2: API Route do Next.js

1. Crie `app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Envie email usando nodemailer, SendGrid, etc.
  
  return NextResponse.json({ success: true });
}
```

2. Atualize `components/ContactForm.tsx`:

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## 🔗 Adicionando Redes Sociais

Em `components/Footer.tsx`, atualize os links:

```typescript
const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/SEU_USUARIO",
    icon: Instagram,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/SEU_PERFIL",
    icon: Linkedin,
  },
  // Adicione mais redes...
];
```

## 📱 Testando Responsividade

Use as DevTools do navegador:

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1024px+

## 🚀 Performance

### Otimizando Imagens

```tsx
import Image from "next/image";

<Image
  src="/imagem.jpg"
  alt="Descrição"
  width={800}
  height={600}
  quality={85} // 85 é um bom balanço
  placeholder="blur" // Opcional
/>
```

### Lazy Loading

Componentes pesados podem usar lazy loading:

```tsx
import dynamic from 'next/dynamic';

const Testimonials = dynamic(() => import('@/components/Testimonials'));
```

## 📊 Analytics

### Google Analytics

1. Instale o pacote:
```bash
npm install @next/third-parties
```

2. Em `app/layout.tsx`:
```tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-XXXXXXXXXX" />
    </html>
  )
}
```

## 🎯 SEO

### Metadata por Página

Se adicionar mais páginas, customize o metadata:

```tsx
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Título da Página',
  description: 'Descrição...',
  openGraph: {
    title: 'Título OG',
    description: 'Descrição OG',
    images: ['/og-image.jpg'],
  },
}
```

## 🔒 LGPD / Privacidade

Adicione uma página de política de privacidade:

1. Crie `app/privacidade/page.tsx`
2. Adicione o conteúdo legal
3. Atualize o link no Footer

## 📝 Checklist Antes do Deploy

- [ ] Substituir todas as imagens placeholder
- [ ] Atualizar número do WhatsApp
- [ ] Atualizar CRP
- [ ] Atualizar email e telefone
- [ ] Configurar redes sociais
- [ ] Testar formulário de contato
- [ ] Adicionar Google Analytics (opcional)
- [ ] Criar página de privacidade
- [ ] Testar em diferentes dispositivos
- [ ] Verificar SEO (title, description, OG tags)
- [ ] Configurar domínio personalizado

## 🆘 Problemas Comuns

### Build falha

```bash
# Limpe o cache
rm -rf .next
npm run build
```

### Estilos não aparecem

```bash
# Reconstrua o Tailwind
npx tailwindcss -i ./app/globals.css -o ./dist/output.css
```

### TypeScript errors

```bash
# Verifique os tipos
npx tsc --noEmit
```

---

Para mais ajuda, consulte a [documentação do Next.js](https://nextjs.org/docs).
