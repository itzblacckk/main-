import React from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppFloat() {
  const handleClick = () => {
    const message = "Hi, I'm interested in booking a tour. Please provide more information.";
    window.open(`https://wa.me/+919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center gap-2 group"
      aria-label="Book via WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
        Quick Book
      </span>
    </button>
  );
}