'use client';
import { MessageCircle } from 'lucide-react';

/** Floating WhatsApp contact button */
export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918072007850?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20your%20facility%20services."
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
