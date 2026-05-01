"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contactForm";

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
      // Enviar para API route segura
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }
      
      setSubmitStatus("success");
      reset();
      
      // Redirect to WhatsApp after success (usa variável de ambiente)
      const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5541998821250';
      setTimeout(() => {
        window.open(
          `https://wa.me/${whatsappNumber}?text=Olá! Meu nome é ${encodeURIComponent(data.name)} e gostaria de agendar uma sessão.`,
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nome completo *
        </label>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.name ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-terracotta-500"
          } focus:ring-2 focus:border-transparent transition-colors outline-none`}
          placeholder="Seu nome"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.email ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-terracotta-500"
          } focus:ring-2 focus:border-transparent transition-colors outline-none`}
          placeholder="seu@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          WhatsApp/Telefone *
        </label>
        <input
          {...register("phone")}
          type="tel"
          id="phone"
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.phone ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-terracotta-500"
          } focus:ring-2 focus:border-transparent transition-colors outline-none`}
          placeholder="(11) 99999-9999"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Mensagem *
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className={`w-full px-4 py-3 rounded-lg border ${
            errors.message ? "border-red-400 focus:ring-red-500" : "border-gray-300 focus:ring-terracotta-500"
          } focus:ring-2 focus:border-transparent transition-colors outline-none resize-none`}
          placeholder="Conte um pouco sobre o que te traz aqui..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Preferred Contact Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Preferência de contato *
        </label>
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              {...register("preferredContact")}
              type="radio"
              value="whatsapp"
              className="w-4 h-4 text-terracotta-500 focus:ring-terracotta-500"
            />
            <span className="text-gray-700">WhatsApp</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              {...register("preferredContact")}
              type="radio"
              value="email"
              className="w-4 h-4 text-terracotta-500 focus:ring-terracotta-500"
            />
            <span className="text-gray-700">Email</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              {...register("preferredContact")}
              type="radio"
              value="phone"
              className="w-4 h-4 text-terracotta-500 focus:ring-terracotta-500"
            />
            <span className="text-gray-700">Telefone</span>
          </label>
        </div>
        {errors.preferredContact && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.preferredContact.message}
          </p>
        )}
      </div>

      {/* Terms Checkbox */}
      <div>
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            {...register("acceptTerms")}
            type="checkbox"
            className="mt-1 w-4 h-4 text-terracotta-500 rounded focus:ring-terracotta-500"
          />
          <span className="text-sm text-gray-600">
            Aceito receber contato e estou de acordo com a política de privacidade *
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            {errors.acceptTerms.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-terracotta-500 hover:bg-terracotta-600 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
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
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-800">
            Mensagem enviada com sucesso! Você será redirecionado para o WhatsApp.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-800">
            Ops! Algo deu errado. Por favor, tente novamente ou entre em contato pelo WhatsApp.
          </p>
        </div>
      )}
    </form>
  );
}
