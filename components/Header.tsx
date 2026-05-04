"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/fbPixel";

export default function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with subtle background */}
          <Link href="/" className="flex items-center bg-cream-50/90 px-3rounded-lg backdrop-blur-sm">
            <Image
              src="/assets/logo.png"
              alt="Gabrielle Carraro - Psicóloga Clínica"
              width={1200}
              height={240}
              className="w-auto pt-4 h-16 md:h-20"
              priority
              quality={100}
            />
          </Link>

          {/* Navigation with text shadow for readability */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#sobre" className="text-sm text-gray-700 hover:text-primary-600 transition-colors drop-shadow-sm font-medium">
              Sobre
            </Link>
            <Link href="#abordagem" className="text-sm text-gray-700 hover:text-primary-600 transition-colors drop-shadow-sm font-medium">
              Abordagem
            </Link>
            <Link href="#como-funciona" className="text-sm text-gray-700 hover:text-primary-600 transition-colors drop-shadow-sm font-medium">
              Como funciona
            </Link>
            <Link href="#depoimentos" className="text-sm text-gray-700 hover:text-primary-600 transition-colors drop-shadow-sm font-medium">
              Depoimentos
            </Link>
            <Link href="#faq" className="text-sm text-gray-700 hover:text-primary-600 transition-colors drop-shadow-sm font-medium">
              FAQ
            </Link>
            <Link href="#contato" className="text-sm text-gray-700 hover:text-primary-600 transition-colors drop-shadow-sm font-medium">
              Contato
            </Link>
          </nav>

          {/* CTA Button */}
          <Link
            href="https://wa.me/5541998821250?text=Olá%2C%20Gabrielle!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20terapia.%20Pode%20me%20ajudar%3F"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick()}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Fale comigo</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
