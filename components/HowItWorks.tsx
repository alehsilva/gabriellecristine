import { MessageCircle, Calendar, Video, Heart } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: MessageCircle,
      title: "Primeiro contato",
      description: "Você me chama no WhatsApp.",
    },
    {
      number: "2",
      icon: Calendar,
      title: "Agendamento",
      description: "Definimos dia e horário que funcione para você.",
    },
    {
      number: "3",
      icon: Video,
      title: "Sessão",
      description: "Atendimento online ou presencial com total acolhimento.",
    },
    {
      number: "4",
      icon: Heart,
      title: "Continuidade",
      description: "Seguimos no seu ritmo, respeitando seu processo.",
    },
  ];

  return (
    <section id="como-funciona" className="py-20 px-4 bg-cream-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-4xl md:text-[2.75rem] text-primary-400 font-light">
            Como funciona
          </h2>
          <p className="text-[0.95rem] text-gray-600">
            Um processo simples para você cuidar de você.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-6">
          {/* Dotted connecting line */}
          <div className="hidden md:block absolute top-[50px] left-[12.5%] right-[12.5%] h-px border-t-2 border-dotted border-primary-200" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                {/* Icon in white circle with number badge */}
                <div className="relative flex justify-center mb-5">
                  {/* White circle with icon */}
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-cream-200 z-10">
                    <Icon className="w-12 h-12 text-gray-700" strokeWidth={1.5} />
                  </div>
                  
                  {/* Number circle badge (top-left) */}
                  <div className="absolute -top-2 left-1/2 -translate-x-[52px] w-9 h-9 bg-primary-500 text-white rounded-full flex items-center justify-center text-base font-medium z-20 shadow-md">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-medium text-base text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-[0.88rem] leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
