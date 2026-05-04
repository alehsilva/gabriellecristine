// Utilitário para rastrear eventos customizados do Facebook Pixel

export const fbPixelEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, data);
  }
};

export const fbPixelCustomEvent = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', eventName, data);
  }
};

// Eventos padrão úteis para sua landing page:
export const trackContact = () => {
  fbPixelEvent('Contact');
};

export const trackLead = () => {
  fbPixelEvent('Lead');
};

export const trackCompleteRegistration = () => {
  fbPixelEvent('CompleteRegistration');
};

export const trackWhatsAppClick = () => {
  fbPixelCustomEvent('WhatsAppClick');
};
