import { Brain, Users as UsersIcon, Battery, Sprout } from "lucide-react";

export default function ForWho() {
  const situations = [
    {
      icon: Brain,
      title: "Ansiedade constante",
      description: "Pensamentos acelerados, preocupação excessiva ou sensação de estar sempre no limite.",
    },
    {
      icon: UsersIcon,
      title: "Relacionamentos difíceis",
      description: "Conflitos frequentes, dificuldade em se comunicar ou em se conectar emocionalmente.",
    },
    {
      icon: Battery,
      title: "Sobrecarga emocional",
      description: "Cansaço mental, falta de energia, irritabilidade ou sensação de vazio.",
    },
    {
      icon: Sprout,
      title: "Autoconhecimento",
      description: "Desejo de entender melhor seus padrões, emoções e propósito de vida.",
    },
  ];

  return (
    <section className="pb-10 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary-500">
            Para quem é esse atendimento
          </h2>
          <p className="text-base text-gray-600">
            A terapia pode te ajudar se você...
          </p>
        </div>

        {/* Situations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {situations.map((situation, index) => {
            const Icon = situation.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-serif text-lg text-gray-800 mb-2 text-center">
                  {situation.title}
                </h3>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {situation.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
