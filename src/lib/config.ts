export const business = {
  name: 'ALINE — Brigadería Gourmet',
  city: 'Caracas, Venezuela',
  instagram: 'https://www.instagram.com/alinedulces/',
  email: 'Alinedulces@gmail.com',
  // Completar con número internacional, sin + ni espacios, antes de habilitar WhatsApp.
  whatsappNumber: '',
};

export function whatsappUrl(message: string): string | null {
  const number = business.whatsappNumber.replace(/\D/g, '');
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : null;
}
