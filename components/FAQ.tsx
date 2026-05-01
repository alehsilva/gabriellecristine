"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Quanto custa a sessão?",
      answer: "O valor da sessão deve ser consultado diretamente com o profissional, pois pode variar conforme a modalidade e a duração do atendimento.",
    },
    {
      question: "O atendimento online funciona mesmo?",
      answer: "Sim! Estudos comprovam que a terapia online tem a mesma eficácia que o atendimento presencial. Você pode fazer de qualquer lugar, no conforto e segurança da sua casa, mantendo a mesma qualidade terapêutica.",
    },
    {
      question: "Quanto tempo dura a sessão?",
      answer: "Cada sessão tem duração de 50 minutos, que é o tempo padrão estabelecido para atendimentos psicológicos. Esse período é suficiente para trabalharmos de forma profunda e efetiva.",
    },
    {
      question: "Como faço para agendar?",
      answer: "É muito simples! Basta me chamar no WhatsApp clicando no botão 'Agendar sessão'. Vamos conversar sobre suas necessidades e encontrar o melhor horário para você.",
    },
    {
      question: "É sigiloso?",
      answer: "Absolutamente! O sigilo é um dos pilares fundamentais da psicologia. Tudo o que é conversado em sessão é confidencial e protegido pelo Código de Ética Profissional do Psicólogo.",
    },
    {
      question: "Com que frequência preciso fazer?",
      answer: "A frequência ideal geralmente é semanal, especialmente no início do processo. Com o tempo, podemos ajustar para quinzenal conforme sua evolução. Isso será discutido e decidido em conjunto, respeitando suas necessidades e disponibilidade.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-3 mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-primary-500">
            Perguntas frequentes
          </h2>
        </div>

        {/* FAQ Items - Two Columns */}
        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden border border-cream-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cream-50 transition-colors"
              >
                <span className="font-medium text-gray-800 pr-4 text-sm">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 text-primary-500">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
