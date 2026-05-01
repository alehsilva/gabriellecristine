import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contactForm';
import { z } from 'zod';

// Rate limiting simples em memória (para produção, use Redis ou similar)
const submissionTracker = new Map<string, number[]>();
const RATE_LIMIT = 5; // máximo de submissões
const RATE_WINDOW = 60 * 60 * 1000; // 1 hora em ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const submissions = submissionTracker.get(ip) || [];
  
  // Remove submissões antigas
  const recentSubmissions = submissions.filter(time => now - time < RATE_WINDOW);
  
  if (recentSubmissions.length >= RATE_LIMIT) {
    return false; // Rate limit excedido
  }
  
  recentSubmissions.push(now);
  submissionTracker.set(ip, recentSubmissions);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar rate limit
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente mais tarde.' },
        { status: 429 }
      );
    }

    // 2. Parse e valida o body
    const body = await request.json();

    // 3. Validação com Zod (server-side)
    const validatedData = contactFormSchema.parse(body);

    // 4. Verificar honeypot (campo invisível para pegar bots)
    if (body.honeypot) {
      console.warn('Bot detectado via honeypot');
      return NextResponse.json(
        { success: true }, // Retorna sucesso para confundir bot
        { status: 200 }
      );
    }

    // 5. Sanitizar dados (remover scripts, caracteres perigosos)
    const sanitizedData = {
      name: validatedData.name.trim(),
      email: validatedData.email.toLowerCase().trim(),
      phone: validatedData.phone.trim(),
      message: validatedData.message.trim(),
      preferredContact: validatedData.preferredContact,
    };

    // 6. Aqui você implementaria o envio do email
    // Opções populares:
    // - Resend (https://resend.com)
    // - SendGrid
    // - Nodemailer com SMTP
    // - Formspree
    
    // Exemplo com console.log (substituir por serviço real)
    console.log('📧 Novo contato recebido:', {
      ...sanitizedData,
      timestamp: new Date().toISOString(),
      ip: ip.substring(0, 20), // Log parcial do IP por segurança
    });

    // TODO: Implementar envio de email
    // await sendEmail({
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `Novo contato: ${sanitizedData.name}`,
    //   html: generateEmailTemplate(sanitizedData),
    // });

    // 7. Retornar sucesso
    return NextResponse.json(
      { 
        success: true,
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.'
      },
      { status: 200 }
    );

  } catch (error) {
    // Tratamento de erros
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: error.errors 
        },
        { status: 400 }
      );
    }

    console.error('Erro ao processar contato:', error);
    
    return NextResponse.json(
      { error: 'Erro ao processar sua solicitação. Tente novamente.' },
      { status: 500 }
    );
  }
}

// Rejeitar outros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
}
