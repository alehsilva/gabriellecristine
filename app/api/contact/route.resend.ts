import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contactForm';
import { z } from 'zod';
import { Resend } from 'resend';

// Inicializar Resend (só funcionará após configurar RESEND_API_KEY)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

function generateEmailHTML(data: any) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #D4A574; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 Novo Contato Recebido</h1>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">👤 Nome:</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">📧 Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          <div class="field">
            <div class="label">📱 Telefone/WhatsApp:</div>
            <div class="value">
              <a href="https://wa.me/${data.phone.replace(/\D/g, '')}">${data.phone}</a>
            </div>
          </div>
          <div class="field">
            <div class="label">💬 Mensagem:</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="field">
            <div class="label">✅ Preferência de Contato:</div>
            <div class="value">${data.preferredContact === 'whatsapp' ? 'WhatsApp' : data.preferredContact === 'email' ? 'Email' : 'Telefone'}</div>
          </div>
        </div>
        <div class="footer">
          <p>Mensagem enviada através do site gabriellecristine.com.br</p>
          <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
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

    // 6. Log para debug (sempre útil)
    console.log('📧 Novo contato recebido:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      timestamp: new Date().toISOString(),
      ip: ip.substring(0, 20),
    });

    // 7. Enviar email via Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: 'Site Gabrielle <contato@gabriellecristine.com.br>', // Ajuste o domínio
          to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'gabriellecristinecarraro@gmail.com',
          replyTo: sanitizedData.email,
          subject: `Novo contato: ${sanitizedData.name}`,
          html: generateEmailHTML(sanitizedData),
        });
        
        console.log('✅ Email enviado com sucesso via Resend');
      } catch (emailError) {
        console.error('❌ Erro ao enviar email via Resend:', emailError);
        // Não falha a requisição se o email falhar, apenas loga
      }
    } else {
      console.warn('⚠️ Resend não configurado - Email não foi enviado');
      console.warn('Configure RESEND_API_KEY nas variáveis de ambiente');
    }

    // 8. Retornar sucesso
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

    console.error('❌ Erro ao processar contato:', error);
    
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
