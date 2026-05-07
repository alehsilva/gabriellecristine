// Utilitário para Facebook Conversions API (CAPI)
// Envia eventos server-side para aumentar a cobertura e precisão dos dados

import crypto from 'crypto';

// Tipos para os eventos do Facebook CAPI
export interface FacebookCAPIEvent {
  event_name: string;
  event_time: number;
  event_id?: string;
  event_source_url: string;
  action_source: 'website';
  user_data: {
    client_ip_address?: string;
    client_user_agent?: string;
    fbp?: string; // Facebook browser cookie
    fbc?: string; // Facebook click ID
    em?: string; // Email (hashed)
    ph?: string; // Phone (hashed)
    fn?: string; // First name (hashed)
    ln?: string; // Last name (hashed)
  };
  custom_data?: Record<string, any>;
}

interface SendEventParams {
  eventName: string;
  eventId?: string;
  eventSourceUrl: string;
  userData: {
    clientIpAddress?: string;
    clientUserAgent?: string;
    fbp?: string;
    fbc?: string;
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
  customData?: Record<string, any>;
}

/**
 * Gera um hash SHA256 para dados sensíveis (email, telefone, nome)
 * Conforme requerido pelo Facebook CAPI
 */
export function hashData(data: string): string {
  if (!data) return '';
  // Normalizar: lowercase, remover espaços
  const normalized = data.toLowerCase().trim();
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

/**
 * Gera um event_id único para desduplicação
 * Deve ser o mesmo ID usado no pixel do navegador
 */
export function generateEventId(): string {
  return `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
}

/**
 * Envia um evento para o Facebook Conversions API
 */
export async function sendFacebookCAPIEvent(params: SendEventParams): Promise<boolean> {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.error('Facebook CAPI: Missing PIXEL_ID or ACCESS_TOKEN');
    return false;
  }

  // Preparar user_data com hash de dados sensíveis
  const userData: FacebookCAPIEvent['user_data'] = {
    client_ip_address: params.userData.clientIpAddress,
    client_user_agent: params.userData.clientUserAgent,
    fbp: params.userData.fbp,
    fbc: params.userData.fbc,
  };

  // Adicionar dados sensíveis com hash (se disponíveis)
  if (params.userData.email) {
    userData.em = hashData(params.userData.email);
  }
  if (params.userData.phone) {
    userData.ph = hashData(params.userData.phone);
  }
  if (params.userData.firstName) {
    userData.fn = hashData(params.userData.firstName);
  }
  if (params.userData.lastName) {
    userData.ln = hashData(params.userData.lastName);
  }

  // Construir o evento
  const event: FacebookCAPIEvent = {
    event_name: params.eventName,
    event_time: Math.floor(Date.now() / 1000), // Unix timestamp em segundos
    event_id: params.eventId,
    event_source_url: params.eventSourceUrl,
    action_source: 'website',
    user_data: userData,
    custom_data: params.customData,
  };

  // Payload para a API do Facebook
  const payload = {
    data: [event],
    test_event_code: process.env.META_TEST_EVENT_CODE, // Opcional: para teste
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error('Facebook CAPI Error:', result);
      return false;
    }

    // Verificar se há erros no resultado
    if (result.events_received === 0 || result.messages?.length > 0) {
      console.warn('Facebook CAPI Warning:', result);
    }

    console.log(`✅ Facebook CAPI: ${params.eventName} sent successfully`, {
      event_id: params.eventId,
      events_received: result.events_received,
    });

    return true;
  } catch (error) {
    console.error('Facebook CAPI Exception:', error);
    return false;
  }
}

/**
 * Extrai o cookie fbp (Facebook browser pixel) dos cookies da requisição
 */
export function extractFbpCookie(cookieHeader: string | null): string | undefined {
  if (!cookieHeader) return undefined;
  
  const match = cookieHeader.match(/_fbp=([^;]+)/);
  return match ? match[1] : undefined;
}

/**
 * Extrai o parâmetro fbc (Facebook click ID) da URL ou cookies
 */
export function extractFbcParam(url: string, cookieHeader: string | null): string | undefined {
  // Tentar pegar da URL primeiro
  try {
    const urlObj = new URL(url);
    const fbclid = urlObj.searchParams.get('fbclid');
    if (fbclid) {
      return `fb.1.${Date.now()}.${fbclid}`;
    }
  } catch (e) {
    // URL inválida
  }

  // Tentar pegar dos cookies
  if (cookieHeader) {
    const match = cookieHeader.match(/_fbc=([^;]+)/);
    return match ? match[1] : undefined;
  }

  return undefined;
}
