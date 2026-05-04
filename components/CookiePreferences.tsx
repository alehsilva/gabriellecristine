'use client';

import { useConsent } from '@/lib/consent-context';
import { Cookie, Shield, X } from 'lucide-react';
import { useState } from 'react';

export default function CookiePreferences() {
  const { hasMarketingConsent } = useConsent();
  const [showPanel, setShowPanel] = useState(false);
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* Botão flutuante para abrir preferências */}
      <button
        onClick={() => setShowPanel(true)}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-white border-2 border-gray-300 rounded-full shadow-lg hover:shadow-xl hover:border-primary-400 transition-all flex items-center justify-center group"
        aria-label="Preferências de Cookies"
        title="Gerenciar Cookies"
      >
        <Cookie className="w-5 h-5 text-gray-600 group-hover:text-primary-600 transition-colors" />
      </button>

      {/* Panel de preferências */}
      {showPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Preferências de Cookies
                    </h2>
                    <p className="text-sm text-gray-600">Gerencie suas preferências</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Fechar"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Status atual */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Status Atual:</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cookies Necessários:</span>
                    <span className="text-green-600 font-semibold">✓ Ativo</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cookies de Marketing:</span>
                    <span className={hasMarketingConsent ? 'text-green-600 font-semibold' : 'text-gray-500 font-semibold'}>
                      {hasMarketingConsent ? '✓ Ativo' : '✗ Desativado'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Descrição dos cookies */}
              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    🔒 Cookies Necessários
                  </h4>
                  <p className="text-sm text-gray-600">
                    Essenciais para o funcionamento básico do site. Não podem ser desativados.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    📊 Cookies de Marketing (Meta Pixel)
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Utilizados para análise de audiência e otimização de campanhas. 
                    Incluem rastreamento de interações e comportamento no site.
                  </p>
                  {pixelId && (
                    <p className="text-xs text-gray-500">
                      Provedor: Meta/Facebook • ID: {pixelId}
                    </p>
                  )}
                </div>
              </div>

              {/* Informações adicionais */}
              <div className="text-sm text-gray-600 mb-6">
                <p>
                  Para mais informações sobre como protegemos seus dados, consulte nossa{' '}
                  <a
                    href="/privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 underline font-medium"
                  >
                    Política de Privacidade
                  </a>
                  .
                </p>
              </div>

              {/* Ações */}
              <div className="space-y-3">
                <p className="text-sm text-gray-700 font-medium">
                  Deseja alterar suas preferências? Você precisará recarregar a página.
                </p>
                <button
                  onClick={() => {
                    localStorage.removeItem('cookie-consent');
                    window.location.reload();
                  }}
                  className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Redefinir Preferências
                </button>
                <button
                  onClick={() => setShowPanel(false)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
