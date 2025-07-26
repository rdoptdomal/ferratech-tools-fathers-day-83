import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <Card>
            <CardContent className="py-12">
              {/* 404 Icon */}
              <div className="mb-6">
                <div className="text-6xl font-bold text-primary mb-2">404</div>
                <div className="text-2xl font-semibold text-gray-900 mb-2">
                  Página não encontrada
                </div>
                <p className="text-gray-600">
                  A página que você está procurando não existe ou foi movida.
                </p>
              </div>

              {/* Suggestions */}
              <div className="space-y-4 mb-8">
                <h3 className="font-medium text-gray-900">O que você pode fazer:</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Home className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Voltar ao início</p>
                      <p className="text-xs text-gray-500">Navegue pela nossa página principal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Search className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-sm">Buscar produtos</p>
                      <p className="text-xs text-gray-500">Encontre o que você precisa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/')}
                  className="w-full"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Ir para o Início
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Ver Produtos
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar
                </Button>
              </div>

              {/* Help Text */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Precisa de ajuda? Entre em contato conosco:
                </p>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-gray-600">📧 contato@ferratech.com.br</p>
                  <p className="text-gray-600">📞 (11) 9999-9999</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
