import Link from "next/link";
import Image from "next/image";

export default function TherapeuticApproach() {
  return (
    <section id="abordagem" className="px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Content */}
          <div className="space-y-4 min-w-32">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary-400 leading-tight font-light">
              Abordagem terapêutica
            </h2>
            
            <div className="space-y-4 text-gray-600 leading-relaxed text-base">
              <p>
                Utilizo a abordagem <strong className="text-gray-700">Cognitivo-Comportamental (TCC)</strong>, que ajuda você a entender como seus pensamentos, emoções e comportamentos se conectam.
              </p>
              
              <p>
                O objetivo não é mudar quem você é, mas te ajudar a lidar melhor com o que você sente e vive, <strong className="text-gray-700">desenvolvendo ferramentas práticas</strong> para uma vida mais equilibrada.
              </p>
            </div>

            <Link
              href="#contato"
              className="inline-block border-2 border-primary-300 text-primary-400 hover:bg-primary-50 px-6 py-2.5 rounded-full text-sm font-normal transition-colors mt-4"
            >
              Saiba mais sobre minha abordagem
            </Link>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative aspect-[4/2] overflow-hidden">
              <Image
                src="/assets/abordagem.png"
                alt="Abordagem Terapêutica - Terapia Cognitivo-Comportamental"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Fadeout overlay on the right side */}
              <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
