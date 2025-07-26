import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Shield, Cookie } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const hasConsented = localStorage.getItem('ferratech-cookie-consent');
    if (!hasConsented) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('ferratech-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('ferratech-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Cookie className="h-5 w-5 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Política de Cookies
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Utilizamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                    Ao continuar navegando, você concorda com nossa{' '}
                    <a 
                      href="/politica-privacidade" 
                      className="text-primary hover:underline font-medium"
                    >
                      Política de Privacidade
                    </a>
                    .
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDecline}
                  className="h-6 w-6 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={handleAccept}
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  Aceitar Todos os Cookies
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleDecline}
                  size="sm"
                  className="flex-1 sm:flex-none"
                >
                  Recusar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieConsent; 