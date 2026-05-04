"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Users } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/fbPixel";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen" style={{ backgroundColor: '#FBF6F5' }}>
      {/* Background image - desktop with curve, mobile centered */}
      <div className="absolute inset-0 md:left-auto md:w-[87%] lg:w-[85%]">
        <div className="absolute inset-0 md:clip-path-ellipse">
          <Image
            src="/assets/hero.png"
            alt="Gabrielle Cristine - Psicóloga"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 87vw"
            className="object-cover opacity-90 md:object-center"
            style={{ objectPosition: "60% center" }}
          />
        </div>
        {/* Desktop gradient overlay for smooth transition */}
        <div
          className="hidden md:block absolute inset-0"
          style={{ 
            width: "50%",
            background: "linear-gradient(to right, #FBF6F5 0%, rgba(251, 246, 245, 0.85) 25%, rgba(251, 246, 245, 0.5) 60%, rgba(251, 246, 245, 0.2) 85%, transparent 100%)"
          }}
          aria-hidden="true"
        />
      </div>

      {/* Mobile readability overlay */}
      <div
        className="md:hidden absolute inset-0"
        style={{ backgroundColor: 'rgba(251, 246, 245, 0.75)' }}
        aria-hidden="true"
      />
      
      <style jsx>{`
        .md\:clip-path-ellipse {
          clip-path: none;
        }
        @media (min-width: 768px) {
          .md\:clip-path-ellipse {
            clip-path: ellipse(150% 100% at 100% 50%);
          }
        }
      `}</style>

      <div className="relative container mx-auto max-w-7xl px-4 pt-40 pb-20 md:pt-48 lg:pt-52 md:pb-32">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-500 font-medium">
              Terapia é cuidado. É escolha. É transformação.
            </p>

            <h1 className="text-5xl md:text-5xl lg:text-6xl xl:text-[4rem] text-gray-800 leading-[1.05] font-normal">
              Você não precisa<br />
              lidar com isso<br />
              sozinho(a).
            </h1>

            <p className="text-base md:text-base lg:text-lg text-gray-600 leading-relaxed max-w-md font-normal">
              Um espaço seguro para entender o que você sente
              <br className="hidden md:block" />
              e encontrar caminhos mais leves para viver.
            </p>

            <div className="pt-2">
              <Link
                href="https://wa.me/5541998821250?text=Olá%2C%20Gabrielle!%20Vi%20seu%20site%20e%20gostaria%20de%20conversar%20sobre%20terapia.%20Pode%20me%20ajudar%3F"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-7 py-3.5 rounded-full text-sm md:text-base font-medium transition-all shadow-md hover:shadow-lg"
              >
                <MessageCircle className="w-5 h-5" fill="currentColor" />
                <span>Conversar no WhatsApp</span>
              </Link>
            </div>

            <div className="flex items-center space-x-2 text-xs text-gray-500 pt-1">
              <Users className="w-4 h-4" />
              <p>Atendimento online e presencial em Curitiba</p>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
