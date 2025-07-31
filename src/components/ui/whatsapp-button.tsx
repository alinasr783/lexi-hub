import { MessageCircle } from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
}

export const WhatsAppButton = ({ 
  message = "مرحباً، أريد التواصل معكم", 
  className = "" 
}: WhatsAppButtonProps) => {
  const { contactInfo } = useContactInfo();
  
  const handleClick = () => {
    if (!contactInfo?.whatsapp) return;
    
    // Remove any non-numeric characters and ensure it starts with country code
    let phoneNumber = contactInfo.whatsapp.replace(/[^\d]/g, '');
    if (!phoneNumber.startsWith('966')) {
      phoneNumber = '966' + phoneNumber;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!contactInfo?.whatsapp) return null;

  return (
    <button
      onClick={handleClick}
      className={`
        fixed bottom-6 right-6 z-50
        bg-gradient-to-r from-green-500 to-green-600
        hover:from-green-600 hover:to-green-700
        text-white rounded-full p-4 
        shadow-2xl hover:shadow-green-500/25
        transform hover:scale-110 
        transition-all duration-500 ease-out
        backdrop-blur-sm border border-green-400/20
        group relative overflow-hidden
        ${className}
      `}
      aria-label="تواصل عبر الواتساب"
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
      
      {/* Icon */}
      <MessageCircle className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-75 animate-ping"></span>
      <span className="absolute inset-0 rounded-full bg-green-400 opacity-50 animate-pulse"></span>
      
      {/* Notification dot */}
      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-3 h-3 animate-bounce shadow-lg"></span>
    </button>
  );
};