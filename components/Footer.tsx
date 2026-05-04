import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin, Mail, MapPin, Phone, Globe, Lock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = {
    navigation: [
      { name: "Sobre", href: "#sobre" },
      { name: "Abordagem", href: "#abordagem" },
      { name: "Como funciona", href: "#como-funciona" },
      { name: "FAQ", href: "#faq" },
      { name: "Contato", href: "#contato" },
    ],
  };

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com/gabriellecarraro.psi",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/gabriellecarraro",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-cream-50 border-t border-cream-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={200}
                height={80}
                className="w-40 h-12"
              />
            </div>
            <p className="text-sm text-gray-500 pt-2">
              CRP 08/44356
            </p>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>(41) 99882-1250</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>gabriellecristinecarraro@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Curitiba - PR</span>
              </li>
              <li className="flex items-start space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Atendimento online e presencial</span>
              </li>
            </ul>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Links úteis</h4>
            <ul className="space-y-3">
              {links.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Column */}
          <div>
            <h4 className="font-medium text-gray-700 mb-4">Redes sociais</h4>
            <div className="space-y-4">
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-400 hover:border-primary-400 transition-all"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/privacidade"
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-400 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Política de Privacidade</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-cream-200">
          <p className="text-sm text-gray-500 text-center">
            © {currentYear} Gabrielle Cristine Psicóloga. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
