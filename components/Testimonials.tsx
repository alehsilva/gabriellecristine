/* eslint-disable react/no-unescaped-entities */
"use client";

import { Star, Quote, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Juliana",
      age: 28,
      text: "Me senti acolhida desde a primeira sessão. Hoje consigo lidar melhor com minha ansiedade e me relacionar de forma mais leve.",
      rating: 5,
    },
    {
      name: "Carlos",
      age: 34,
      text: "O atendimento me ajudou a enxergar coisas que eu não percebia antes. Sou muito grato por todo o processo.",
      rating: 5,
    },
  ];

  return (
    <section id="depoimentos" className="py-14 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">
          {/* Left Column - Title */}
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl text-primary-400 leading-tight font-light">
              O que dizem sobre o atendimento
            </h2>
            <div className="w-16 h-1 bg-primary-200"></div>
          </div>

          {/* Right Column - Testimonials Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-[1fr_1fr_280px] gap-6 lg:gap-8">
            {/* Testimonial Cards */}
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-cream-50 rounded-xl p-6 lg:p-7 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-5 left-5 text-primary-200 opacity-30">
                  <Quote className="w-8 h-8" fill="currentColor" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Testimonial Text */}
                  <p className="text-gray-600 leading-relaxed text-sm pt-8">
                    "{testimonial.text}"
                  </p>

                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>

                  {/* Author */}
                  <p className="font-medium text-gray-700 text-sm">
                    {testimonial.name}, {testimonial.age} anos
                  </p>
                </div>
              </div>
            ))}

            {/* Ethics Card */}
            <div className="bg-white rounded-xl p-6 lg:p-7 flex flex-col justify-center">
              <div className="space-y-4 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <ShieldCheck className="w-14 h-14 text-primary-300" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-800">Ética e compromisso</h3>
                  <p className="text-gray-600 leading-relaxed text-xs">
                    Atendimento 100% ético e sigiloso, conforme o Código de Ética Profissional do Psicólogo.
                  </p>
                  <p className="text-sm text-gray-700 font-medium pt-2">CRP 08/44356</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
