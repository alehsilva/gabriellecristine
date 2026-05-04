'use client';

import { useConsent } from '@/lib/consent-context';
import { Cookie, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function CookieConsent() {
  const { showBanner, acceptAll, acceptNecessary } = useConsent();
  const [showDetails, setShowDetails] = useState(false);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-primary-400 shadow-2xl">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
            <Cookie className="w-6 h-6 text-primary-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Cookies e Privacidade
            </h3>
            
            {!showDetails ? (
              <p className="text-sm text-gray-600 mb-4">
                Utilizamos cookies essenciais e ferramentas de análise (como Meta Pixel) 
                para melhorar sua experiência e entender como nosso site é utilizado. 
                Ao aceitar, você concorda com o uso de cookies de marketing e análise.{' '}
                <button
                  onClick={() => setShowDetails(true)}
                  className="text-primary-600 hover:text-primary-700 underline font-medium"
                >
                  Ver detalhes
                </button>
              </p>
            ) : (
              <div className="text-sm text-gray-600 mb-4 space-y-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">🔒 Cookies Necessários (sempre ativos)</h4>
                  <p className="text-xs">Essenciais para o funcionamento básico do site.</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-1">📊 Cookies de Marketing</h4>
                  <p className="text-xs">
                    <strong>Meta Pixel:</strong> Utilizado para análise de audiência, 
                    otimização de campanhas e remarketing no Facebook/Instagram. 
                    Coleta dados de navegação e interações no site.
                  </p>
                </div>
                <p className="text-xs">
                  Você pode alterar suas preferências a qualquer momento.{' '}
                  <Link href="/privacidade" className="text-primary-600 hover:text-primary-700 underline font-medium">
                    Leia nossa Política de Privacidade
                  </Link>
                </p>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                onClick={acceptAll}
                className="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-sm"
              >
                Aceitar Todos
              </button>
              <button
                onClick={acceptNecessary}
                className="px-6 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
              >
                Apenas Necessários
              </button>
              <Link
                href="/privacidade"
                className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-primary-400 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                Saiba Mais
              </Link>
            </div>
          </div>

          {showDetails && (
            <button
              onClick={() => setShowDetails(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600"
              aria-label="Fechar detalhes"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
