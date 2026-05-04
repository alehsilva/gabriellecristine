import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contato" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl text-primary-400 leading-tight font-light mb-6">
            Vamos conversar?
          </h2>
          <p className="text-base text-gray-600 leading-relaxed font-normal">
            Dar o primeiro passo pode ser difícil, mas você não precisa fazer isso sozinho(a). 
            Preencha o formulário abaixo ou entre em contato diretamente pelo WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-12 max-w-6xl mx-auto items-start">
          {/* Formulário */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Informações Laterais */}
          <div className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-24">
            {/* Como funciona */}
            <div className="bg-cream-50 rounded-2xl p-6 lg:p-7 border border-cream-200">
              <h3 className="text-lg text-gray-800 font-normal mb-5">
                Como funciona?
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-normal text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-normal text-gray-800 mb-1 text-sm">Preencha o formulário</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      Conte um pouco sobre o que te traz aqui. Suas informações são confidenciais.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-normal text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-normal text-gray-800 mb-1 text-sm">Retorno em até 24h</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      Entrarei em contato para entendermos melhor suas necessidades.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-normal text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-normal text-gray-800 mb-1 text-sm">Agendamento</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      Vamos encontrar o melhor horário para sua primeira sessão.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações de Contato */}
            <div className="bg-cream-50 rounded-2xl p-6 lg:p-7 border border-cream-200 space-y-4">
              <h3 className="text-lg text-gray-800 font-normal mb-1">
                Outras formas de contato
              </h3>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-normal text-gray-700 mb-0.5">WhatsApp</p>
                  <a 
                    href="https://wa.me/5541998821250?text=Olá%2C%20Gabrielle!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20terapia.%20Pode%20me%20ajudar%3F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary-500 hover:text-primary-600 transition-colors"
                  >
                    (41) 99882-1250
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-normal text-gray-700 mb-0.5">Email</p>
                  <a 
                    href="mailto:gabriellecristinecarraro@gmail.com"
                    className="text-sm text-primary-500 hover:text-primary-600 transition-colors break-all"
                  >
                    gabriellecristinecarraro@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-normal text-gray-700 mb-0.5">Atendimento</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Online (todo Brasil e internacional)
                    <br />
                    Presencial em Curitiba/PR
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-normal text-gray-700 mb-0.5">Horários</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Segunda a Sexta: 8h às 19h
                    <br />
                    Sábado: 8h às 12h
                  </p>
                </div>
              </div>
            </div>

            {/* Nota de Privacidade */}
            <div className="bg-primary-50 rounded-xl p-4 border-l-4 border-primary-300">
              <p className="text-sm text-gray-700 leading-relaxed">
                <span className="font-normal text-primary-600">💚 Sigilo profissional garantido:</span> Todas as informações compartilhadas são confidenciais e protegidas pelo código de ética da psicologia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
