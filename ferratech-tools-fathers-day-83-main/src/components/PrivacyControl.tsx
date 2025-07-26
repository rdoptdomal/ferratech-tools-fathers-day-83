import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Shield, Cookie, Eye, Settings } from "lucide-react";

interface PrivacySettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const PrivacyControl = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<PrivacySettings>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const privacyAccepted = localStorage.getItem("privacy-accepted");
    if (!privacyAccepted) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setSettings({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
    localStorage.setItem("privacy-accepted", "true");
    localStorage.setItem("privacy-settings", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }));
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("privacy-accepted", "true");
    localStorage.setItem("privacy-settings", JSON.stringify(settings));
    setShowBanner(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem("privacy-settings", JSON.stringify(settings));
    setShowSettings(false);
  };

  const handleSettingChange = (key: keyof PrivacySettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner && !showSettings) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 left-4 z-50 bg-white shadow-lg"
      >
        <Settings className="h-4 w-4 mr-2" />
        Privacidade
      </Button>
    );
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cookie className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Controle de Privacidade</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBanner(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
                personalizar conteúdo e analisar o tráfego do site. 
                Ao continuar navegando, você concorda com nossa 
                <a href="/privacidade" className="text-primary hover:underline ml-1">
                  Política de Privacidade
                </a>.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Necessários</span>
                  </div>
                  <Checkbox checked disabled />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Analytics</span>
                  </div>
                  <Checkbox 
                    checked={settings.analytics}
                    onCheckedChange={(checked) => handleSettingChange('analytics', checked as boolean)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="h-4 w-4 text-purple-600" />
                    <span className="text-sm font-medium">Marketing</span>
                  </div>
                  <Checkbox 
                    checked={settings.marketing}
                    onCheckedChange={(checked) => handleSettingChange('marketing', checked as boolean)}
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowSettings(true)}
                  className="flex-1"
                >
                  Personalizar
                </Button>
                <Button 
                  size="sm"
                  onClick={handleAcceptAll}
                  className="flex-1"
                >
                  Aceitar Todos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>Configurações de Privacidade</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Cookies Necessários</span>
                    </div>
                    <Checkbox checked disabled />
                  </div>
                  <p className="text-sm text-gray-600">
                    Essenciais para o funcionamento do site. Não podem ser desativados.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Cookies de Analytics</span>
                    </div>
                    <Checkbox 
                      checked={settings.analytics}
                      onCheckedChange={(checked) => handleSettingChange('analytics', checked as boolean)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Nos ajudam a entender como você usa o site para melhorar a experiência.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Cookies de Marketing</span>
                    </div>
                    <Checkbox 
                      checked={settings.marketing}
                      onCheckedChange={(checked) => handleSettingChange('marketing', checked as boolean)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Usados para personalizar anúncios e conteúdo baseado em seus interesses.
                  </p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Cookie className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">Cookies de Preferências</span>
                    </div>
                    <Checkbox 
                      checked={settings.preferences}
                      onCheckedChange={(checked) => handleSettingChange('preferences', checked as boolean)}
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Armazenam suas preferências para personalizar sua experiência.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSettings(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={handleSaveSettings}
                  className="flex-1"
                >
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default PrivacyControl; 