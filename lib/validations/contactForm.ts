import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  email: z
    .string()
    .email("Email inválido")
    .min(1, "Email é obrigatório"),
  phone: z
    .string()
    .regex(/^\(?[1-9]{2}\)?\s?9?\d{4}-?\d{4}$/, "Telefone inválido")
    .min(1, "Telefone é obrigatório"),
  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(500, "Mensagem muito longa"),
  preferredContact: z.enum(["whatsapp", "email", "phone"], {
    required_error: "Selecione uma forma de contato",
  }),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Você deve aceitar os termos",
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
