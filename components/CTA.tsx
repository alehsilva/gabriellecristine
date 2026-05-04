"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { trackWhatsAppClick } from "@/lib/fbPixel";

export default function CTA() {
  return (
    <section id="contato" className="px-4 bg-white py-4">
      <div className="container mx-auto max-w-7xl">
        <div className="hidden lg:block overflow-hidden relative rounded-3xl" style={{ backgroundColor: '#F5F1EA' }}>
          <div className="grid grid-cols-[200px_1fr_280px] xl:grid-cols-[240px_1fr_320px] items-center h-[280px]">
            {/* Left - Plant Image */}
            <div className="relative h-80 opacity-80 -mb-8">
              <Image
                src="/assets/planta.png"
                alt="Planta decorativa"
                width={160}
                height={280}
                className="object-contain object-bottom"
              />
            </div>

            {/* Center - Content */}
            <div className="text-center space-y-5 flex flex-col justify-center items-center px-6 -mt-4">
              <h2 className="text-2xl lg:text-3xl text-gray-700 leading-snug font-light max-w-xl">
                Dar o primeiro passo pode ser difícil –<br />
                mas você não precisa fazer isso sozinho(a).
              </h2>

              {/* WhatsApp Button */}
              <div className="flex justify-center">
                <Link
                  href="https://wa.me/5541998821250?text=Olá%2C%20Gabrielle!%20Vi%20seu%20site%20e%20gostaria%20de%20dar%20o%20primeiro%20passo.%20Vamos%20conversar%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick()}
                  className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3.5 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" fill="currentColor" />
                  <span>Dar o primeiro passo</span>
                </Link>
              </div>

              <p className="text-base text-gray-600 font-light">
                Estou aqui para te ouvir.
              </p>
            </div>

            {/* Right - Person Image */}
            <div className="relative h-full">
              <Image
                src="/assets/banner-person.png"
                alt="Gabrielle Cristine - Psicóloga"
                width={320}
                height={320}
                className="object-contain object-bottom h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
