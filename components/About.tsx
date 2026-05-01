import Image from "next/image";
import { Shield, GraduationCap, Award, Users, Heart } from "lucide-react";

export default function About() {
  const credentials = [
    {
      icon: Shield,
      title: "CRP 08/44356",
      description: "",
    },
    {
      icon: GraduationCap,
      title: "Especialização em TCC",
      description: "UniCesumar",
    },
    {
      icon: Award,
      title: "Pós em Neuropsicologia",
      description: "Instituto Faculeste",
    },
    {
      icon: Users,
      title: "Atendimento Online",
      description: "Brasil e Internacional",
    },
  ];

  return (
    <section id="sobre" className="py-14 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr] xl:grid-cols-[380px_1fr] gap-8 md:gap-10 lg:gap-14 items-start">
          {/* Left Column - Oval Image */}
          <div className="relative mx-auto md:mx-0 md:pt-0">
            <div className="relative w-[280px] h-[350px] md:w-[300px] md:h-[375px] lg:w-[360px] lg:h-[450px] xl:w-[380px] xl:h-[475px] rounded-[50%] overflow-hidden shadow-lg">
              <Image
                src="/assets/aboutme.jpg"
                alt="Gabrielle Cristine - Psicóloga"
                fill
                sizes="380px"
                className="object-cover"
                style={{ objectPosition: "center 30%" }}
              />
            </div>
          </div>

          {/* Right Column - Content and Credentials */}
          <div className="flex gap-6 lg:gap-8">
            {/* Text Content */}
            <div className="flex-1 space-y-6 pt-0 max-w-[500px]">
              <h2 className="text-[2.5rem] lg:text-[2.65rem] text-primary-400 leading-[1.15] font-light">
                Sobre mim
              </h2>

              <div className="space-y-5">
                <p className="leading-relaxed">
                  <span className="text-gray-900 text-[1.4rem] font-normal">Olá, eu sou Gabrielle Cristine,</span>
                  <br />
                  <span className="text-gray-500 text-[1.2rem] font-normal">psicóloga | CRP 08/44356</span>
                </p>

                <p className="text-[0.93rem] text-gray-600 leading-[1.8] font-normal">
                  Sou formada há mais de 8 anos e minha missão é ajudar pessoas a se reconectarem consigo mesmas, compreendendo suas emoções, lidando com desafios e construindo uma vida mais leve e significativa.
                </p>

                <p className="text-[0.93rem] text-gray-600 leading-[1.8] font-normal">
                  Acredito em um atendimento acolhedor, sem julgamentos, onde você pode se sentir à vontade para ser quem realmente é.
                </p>

                <div className="flex items-start space-x-3 pt-3">
                  <div className="flex-shrink-0 pt-1">
                    <Heart className="w-8 h-8 text-primary-300" strokeWidth={1.5} fill="none" />
                  </div>
                  <p className="text-[0.8rem] text-gray-600 leading-[1.8] pt-0.5 font-normal">
                    <span className="font-normal text-gray-600">Mais de 1.500 pessoas já iniciaram</span>
                    <br />
                    <span className="font-normal text-gray-600">seus processos de transformação.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden md:block w-px bg-primary-200/40 self-stretch my-2"></div>

            {/* Credentials Cards */}
            <div className="space-y-4 pt-20 md:w-[240px] lg:w-[260px]">
              {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-2"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-primary-400" strokeWidth={1.8} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-normal text-gray-700 text-[0.88rem] leading-tight">
                        {cred.title}
                      </h3>
                      {cred.description && (
                        <p className="text-[0.78rem] text-gray-500 mt-0.5 leading-snug">{cred.description}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
