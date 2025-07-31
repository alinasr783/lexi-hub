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
        bg-green-500 hover:bg-green-600 
        text-white rounded-full p-4 
        shadow-lg hover:shadow-xl
        transform hover:scale-105 
        transition-all duration-300
        animate-pulse hover:animate-none
        ${className}
      `}
      aria-label="تواصل عبر الواتساب"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-3 h-3 animate-ping"></span>
    </button>
  );
};