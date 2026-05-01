import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gabrielle Cristine - Psicóloga | CRP 08/44356",
  description: "Psicóloga especializada em TCC e Neuropsicologia. Atendimento humanizado presencial em Curitiba e online para todo Brasil e internacional (português).",
  keywords: ["psicóloga", "terapia", "psicologia", "atendimento online", "TCC", "neuropsicologia", "Curitiba", "Brasil", "ansiedade", "relacionamentos"],
  authors: [{ name: "Gabrielle Cristine" }],
  openGraph: {
    title: "Gabrielle Cristine - Psicóloga",
    description: "Um espaço seguro para entender o que você sente e encontrar caminhos mais leves para viver.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
