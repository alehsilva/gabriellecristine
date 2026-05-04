"use client";

import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { trackWhatsAppClick } from "@/lib/fbPixel";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "5541998821250";
  const message = "Olá, Gabrielle! Vi seu site e gostaria de conversar sobre terapia. Pode me ajudar?";

  const handleWhatsAppClick = () => {
    trackWhatsAppClick();
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Tooltip/Popup */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-6 w-80 animate-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Gabrielle Cristine</h3>
                  <p className="text-sm text-gray-500">Psicóloga</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed">
                Olá! 👋 Que bom ter você aqui. Estou disponível para conversar sobre como a terapia pode te ajudar neste momento.
              </p>
              
              <Link
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white text-center px-6 py-3 rounded-full font-medium transition-colors"
                onClick={handleWhatsAppClick}
              >
                Iniciar conversa no WhatsApp
              </Link>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-110 active:scale-95"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-7 h-7" fill="currentColor" />
        </button>

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
      </div>
    </>
  );
}
