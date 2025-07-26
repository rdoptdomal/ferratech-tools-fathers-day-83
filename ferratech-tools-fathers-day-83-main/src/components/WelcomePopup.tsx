import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, User, MessageCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    consent: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const popupShown = localStorage.getItem("welcome-popup-shown");
    if (!popupShown) {
      setTimeout(() => {
        setShowPopup(true);
      }, 2000);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      toast({
        title: "Atenção",
        description: "Você precisa concordar em receber comunicações.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Cadastro realizado!",
      description: "Você receberá o cupom de 5% de desconto em breve.",
    });
    
    localStorage.setItem("welcome-popup-shown", "true");
    setShowPopup(false);
  };

  const handleClose = () => {
    localStorage.setItem("welcome-popup-shown", "true");
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-red-600 rounded-lg max-w-sm w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-yellow-400 hover:text-white transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Banner */}
        <div className="bg-yellow-400 text-black text-center py-2">
          <span className="font-bold text-lg">FERRATECH</span>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="text-yellow-400 text-2xl font-bold mb-2">
            Bem-vindo!
          </h2>
          
          <p className="text-yellow-400 text-sm mb-4">
            <strong>GANHE 5% DE DESCONTO</strong>
          </p>
          
          <p className="text-yellow-400 text-xs mb-6">
            Cadastre-se e receba o cupom para sua primeira compra! *fora promo
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Consent Checkbox */}
            <div className="flex items-center justify-center gap-2">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, consent: checked as boolean }))
                }
                className="border-yellow-400 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <label htmlFor="consent" className="text-yellow-400 text-xs">
                Eu concordo em receber comunicações
              </label>
            </div>

            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Nome completo"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="pl-10 bg-white text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Phone Input */}
            <div className="relative">
              <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="tel"
                placeholder="Ex: (00) 00000-0000"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="pl-10 bg-white text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="email"
                placeholder="Ex: seuemail@aqui.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="pl-10 bg-white text-gray-900 placeholder-gray-500"
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded"
            >
              CADASTRE-SE
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup; 