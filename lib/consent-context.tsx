'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type ConsentContextType = {
  consent: CookieConsent | null;
  showBanner: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  updateConsent: (consent: CookieConsent) => void;
  hasMarketingConsent: boolean;
};

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_KEY = 'cookie-consent';

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Verificar se já existe consentimento salvo
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    if (savedConsent) {
      setConsent(JSON.parse(savedConsent));
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setConsent(newConsent);
    setShowBanner(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const updateConsent = (newConsent: CookieConsent) => {
    saveConsent(newConsent);
  };

  return (
    <ConsentContext.Provider
      value={{
        consent,
        showBanner,
        acceptAll,
        acceptNecessary,
        updateConsent,
        hasMarketingConsent: consent?.marketing ?? false,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}
