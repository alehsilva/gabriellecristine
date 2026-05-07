"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contactForm";
import { trackLead, trackWhatsAppClick } from "@/lib/fbPixel";

// Função para gerar event_id único para desduplicação
function generateEventId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      preferredContact: "whatsapp",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Gerar event_id único para desduplicação entre navegador e servidor
      const eventId = generateEventId();

      // Disparar evento Lead no navegador ANTES de enviar para o servidor
      // Isso garante que ambos os eventos (navegador e servidor) tenham o mesmo event_id
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {}, { eventID: eventId });
      }

      // Enviar para API route segura (que também enviará para CAPI)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          eventId, // Enviar o mesmo event_id para o servidor
          eventSourceUrl: window.location.href, // URL da página para CAPI
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }
      
      setSubmitStatus("success");
      reset();
      
      // Redirect to WhatsApp after success (usa variável de ambiente)
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5541998821250';
      const whatsappMessage = `Olá, Gabrielle! Me chamo ${data.name}. Acabei de preencher o formulário no seu site e gostaria de conversar sobre terapia.`;
      setTimeout(() => {
        trackWhatsAppClick();
        window.open(
          `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
          "_blank"
        );
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot - campo invisível para pegar bots */}
      <input
        type="text"
        name="honeypot"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />
      
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-normal text-gray-700 mb-2">
          Nome completo *
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.name ? "border-red-300 focus:ring-red-400" : "border-cream-200 focus:ring-primary-300"
          } focus:ring-2 focus:border-transparent transition-colors outline-none bg-white text-gray-800 placeholder:text-gray-400`}
          placeholder="Seu nome completo"
        />
        {errors.name && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-2">
          Email *
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.email ? "border-red-300 focus:ring-red-400" : "border-cream-200 focus:ring-primary-300"
          } focus:ring-2 focus:border-transparent transition-colors outline-none bg-white text-gray-800 placeholder:text-gray-400`}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-normal text-gray-700 mb-2">
          WhatsApp/Telefone *
        </label>
        <input
          {...register("phone")}
          type="tel"
          id="phone"
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.phone ? "border-red-300 focus:ring-red-400" : "border-cream-200 focus:ring-primary-300"
          } focus:ring-2 focus:border-transparent transition-colors outline-none bg-white text-gray-800 placeholder:text-gray-400`}
          placeholder="(41) 99999-9999"
        />
        {errors.phone && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-normal text-gray-700 mb-2">
          Mensagem *
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.message ? "border-red-300 focus:ring-red-400" : "border-cream-200 focus:ring-primary-300"
          } focus:ring-2 focus:border-transparent transition-colors outline-none resize-none bg-white text-gray-800 placeholder:text-gray-400`}
          placeholder="Conte um pouco sobre o que te traz aqui..."
        />
        {errors.message && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-normal text-gray-700 mb-3">
          Preferência de contato *
        </label>
        <div className="space-y-2.5">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              {...register("preferredContact")}
              type="radio"
              value="whatsapp"
              className="w-4 h-4 text-primary-500 focus:ring-primary-400 border-cream-300"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">WhatsApp</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              {...register("preferredContact")}
              type="radio"
              value="email"
              className="w-4 h-4 text-primary-500 focus:ring-primary-400 border-cream-300"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">Email</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              {...register("preferredContact")}
              type="radio"
              value="phone"
              className="w-4 h-4 text-primary-500 focus:ring-primary-400 border-cream-300"
            />
            <span className="text-sm text-gray-700 group-hover:text-gray-900">Telefone</span>
          </label>
        </div>
        {errors.preferredContact && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.preferredContact.message}
          </p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer group">
          <input
            {...register("acceptTerms")}
            type="checkbox"
            className="mt-0.5 w-4 h-4 text-primary-500 rounded focus:ring-primary-400 border-cream-300"
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            Aceito receber contato e estou de acordo com a{' '}
            <a 
              href="/privacidade" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 underline"
            >
              política de privacidade
            </a> *
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary-400 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-normal transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Enviando...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Enviar mensagem</span>
          </>
        )}
      </button>

      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800 leading-relaxed">
            Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800 leading-relaxed">
            Ops! Algo deu errado. Por favor, tente novamente ou entre em contato pelo WhatsApp.
          </p>
        </div>
      )}
    </form>
  );
}
