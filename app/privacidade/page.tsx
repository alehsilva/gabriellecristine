import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Cookie, Eye, Lock, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Gabrielle Cristine Psicóloga',
  description: 'Política de Privacidade e proteção de dados pessoais conforme LGPD',
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o site
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Privacidade</h1>
              <p className="text-sm text-gray-600 mt-1">Última atualização: Maio de 2026</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">
          
          {/* Introdução */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introdução</h2>
            <p className="text-gray-700 leading-relaxed">
              A sua privacidade é importante para nós. Esta Política de Privacidade explica como 
              coletamos, usamos, armazenamos e protegemos seus dados pessoais em conformidade com 
              a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          {/* Dados coletados */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Eye className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Dados que Coletamos</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dados fornecidos por você:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nome completo</li>
                  <li>E-mail</li>
                  <li>Telefone/WhatsApp</li>
                  <li>Mensagem ou informações sobre sua solicitação</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dados coletados automaticamente:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e dispositivo</li>
                  <li>Páginas visitadas e tempo de navegação</li>
                  <li>Origem da visita (referrer)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies e Meta Pixel */}
          <section className="bg-primary-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Cookie className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies e Meta Pixel</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Utilizamos cookies e o <strong>Meta Pixel do Facebook</strong> para melhorar 
                sua experiência e entender como nosso site é utilizado.
              </p>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">O que é o Meta Pixel?</h3>
                <p className="leading-relaxed">
                  O Meta Pixel é uma ferramenta de análise do Facebook que nos permite:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Medir a eficácia de nossas campanhas publicitárias</li>
                  <li>Entender como os visitantes interagem com nosso site</li>
                  <li>Criar audiências personalizadas para anúncios relevantes</li>
                  <li>Otimizar a experiência do usuário</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Dados coletados pelo Meta Pixel:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Páginas visualizadas</li>
                  <li>Ações realizadas no site (cliques, envio de formulários)</li>
                  <li>Informações do dispositivo e navegador</li>
                  <li>Dados demográficos (quando disponíveis)</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  ✓ Você tem controle total
                </p>
                <p className="text-sm leading-relaxed">
                  O Meta Pixel só é ativado após seu consentimento explícito através do banner 
                  de cookies. Você pode recusar ou revogar o consentimento a qualquer momento.
                </p>
              </div>
            </div>
          </section>

          {/* Como usamos os dados */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Como Usamos seus Dados</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Responder suas solicitações de contato</li>
              <li>Agendar consultas e fornecer atendimento psicológico</li>
              <li>Enviar informações sobre nossos serviços (quando autorizado)</li>
              <li>Melhorar nosso site e serviços</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Análise de métricas e otimização de campanhas de marketing</li>
            </ul>
          </section>

          {/* Compartilhamento */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compartilhamento de Dados</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Seus dados pessoais não são vendidos ou compartilhados com terceiros, exceto:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Com seu consentimento explícito</li>
              <li>Para cumprir obrigações legais</li>
              <li>Com prestadores de serviços essenciais (hospedagem, e-mail, análise - Meta/Facebook)</li>
              <li>Para proteger direitos, propriedade e segurança</li>
            </ul>
          </section>

          {/* Segurança */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Segurança dos Dados</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Implementamos medidas técnicas e organizacionais para proteger seus dados contra 
              acesso não autorizado, perda, destruição ou alteração. Isso inclui criptografia, 
              controles de acesso e monitoramento contínuo.
            </p>
          </section>

          {/* Seus direitos */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Seus Direitos (LGPD)</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              De acordo com a LGPD, você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
              <li>Revogar o consentimento</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Obter informações sobre compartilhamento de dados</li>
            </ul>
          </section>

          {/* Retenção */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Retenção de Dados</h2>
            <p className="text-gray-700 leading-relaxed">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as 
              finalidades descritas nesta política, exceto quando a lei exigir um período 
              de retenção mais longo.
            </p>
          </section>

          {/* Contato */}
          <section className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-5 h-5 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Entre em Contato</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Responsável:</strong> Gabrielle Cristine</p>
              <p><strong>CRP:</strong> 08/44356</p>
              <p>
                <strong>E-mail:</strong>{' '}
                <a href="mailto:contato@gabriellecristine.com.br" className="text-primary-600 hover:text-primary-700">
                  contato@gabriellecristine.com.br
                </a>
              </p>
            </div>
          </section>

          {/* Alterações */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alterações nesta Política</h2>
            <p className="text-gray-700 leading-relaxed">
              Esta política pode ser atualizada periodicamente. Recomendamos que você a revise 
              regularmente. A data da última atualização está indicada no início deste documento.
            </p>
          </section>

        </div>

        {/* CTA Voltar */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o site
          </Link>
        </div>
      </main>
    </div>
  );
}
