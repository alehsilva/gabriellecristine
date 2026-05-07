'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { useConsent } from '@/lib/consent-context';

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}

// Função para gerar event_id único para desduplicação
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

// Função para enviar evento para o servidor (CAPI)
async function sendServerEvent(
  eventName: string, 
  eventId: string, 
  customData?: Record<string, any>
): Promise<void> {
  try {
    await fetch('/api/facebook-capi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl: window.location.href,
        customData,
      }),
    });
  } catch (error) {
    console.error('Error sending server event:', error);
  }
}

export default function FacebookPixel() {
  const { hasMarketingConsent } = useConsent();
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const initialPageViewSent = useRef(false);

  useEffect(() => {
    // Só dispara PageView se já tiver consentimento E o pixel já estiver carregado
    if (hasMarketingConsent && typeof window !== 'undefined' && window.fbq) {
      // Gerar event_id único para desduplicação
      const eventId = generateEventId();
      
      // Enviar evento pelo navegador (com event_id)
      window.fbq('track', 'PageView', {}, { eventID: eventId });
      
      // Enviar mesmo evento pelo servidor (CAPI) com o mesmo event_id
      // Isso garante que o Facebook deduplique e conte como um único evento
      sendServerEvent('PageView', eventId);
      
      initialPageViewSent.current = true;
    }
  }, [hasMarketingConsent]);

  // Só carrega o script do Meta Pixel se houver consentimento de marketing E o pixel ID estiver configurado
  if (!hasMarketingConsent || !pixelId) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
