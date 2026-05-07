import { NextRequest, NextResponse } from 'next/server';
import { 
  sendFacebookCAPIEvent, 
  extractFbpCookie, 
  extractFbcParam 
} from '@/lib/facebook-capi';

// Rate limiting simples para prevenir abuso
const requestTracker = new Map<string, number[]>();
const RATE_LIMIT = 100; // máximo de eventos por janela
const RATE_WINDOW = 60 * 1000; // 1 minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestTracker.get(ip) || [];
  
  const recentRequests = requests.filter(time => now - time < RATE_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return false;
  }
  
  recentRequests.push(now);
  requestTracker.set(ip, recentRequests);
  return true;
}

/**
 * API Route para enviar eventos para Facebook Conversions API
 * Recebe eventos do cliente (navegador) e os envia server-side
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Verificar rate limit
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               request.ip ||
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    // 2. Parse do body
    const body = await request.json();
    const { eventName, eventId, eventSourceUrl, customData } = body;

    // 3. Validação básica
    if (!eventName || typeof eventName !== 'string') {
      return NextResponse.json(
        { error: 'eventName is required' },
        { status: 400 }
      );
    }

    if (!eventSourceUrl || typeof eventSourceUrl !== 'string') {
      return NextResponse.json(
        { error: 'eventSourceUrl is required' },
        { status: 400 }
      );
    }

    // 4. Extrair dados do navegador/requisição
    const userAgent = request.headers.get('user-agent') || undefined;
    const cookieHeader = request.headers.get('cookie');
    
    // Extrair cookies do Facebook para desduplicação
    const fbp = extractFbpCookie(cookieHeader);
    const fbc = extractFbcParam(eventSourceUrl, cookieHeader);

    // 5. Preparar dados do usuário
    const userData = {
      clientIpAddress: ip,
      clientUserAgent: userAgent,
      fbp,
      fbc,
    };

    // 6. Enviar para Facebook CAPI
    const success = await sendFacebookCAPIEvent({
      eventName,
      eventId,
      eventSourceUrl,
      userData,
      customData,
    });

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to send event to Facebook' },
        { status: 500 }
      );
    }

    // 7. Retornar sucesso
    return NextResponse.json(
      { 
        success: true,
        eventName,
        eventId 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Facebook CAPI API Error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Rejeitar outros métodos HTTP
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}
