import React from 'react';
import { MessageCircle } from 'lucide-react';

const whatsappNumber = '447596932028';
const whatsappUrl = `https://wa.me/${whatsappNumber}`;

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[70] inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-3 shadow-[0_8px_24px_rgba(37,211,102,0.45)] hover:brightness-95 transition-all"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="text-sm font-semibold">Chat with us</span>
    </a>
  );
}
