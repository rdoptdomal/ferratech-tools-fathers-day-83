import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Package, Home, Mail, Phone } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId } = location.state || {};

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={0} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-3xl text-green-600">
                Pedido Confirmado!
              </CardTitle>
              <p className="text-gray-600">
                Seu pedido foi processado com sucesso
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Informações do Pedido */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <h3 className="font-medium">Detalhes do Pedido</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Número do Pedido:</span>
                    <span className="font-medium">#{orderId?.slice(-8) || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <Badge variant="default">Confirmado</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Data:</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Próximos Passos */}
              <div className="space-y-4">
                <h3 className="font-medium">O que acontece agora?</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Confirmação do Pagamento</p>
                      <p>Seu pagamento será processado e confirmado em breve</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Preparação do Pedido</p>
                      <p>Nossa equipe irá preparar seu pedido para envio</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Envio</p>
                      <p>Você receberá o código de rastreamento por email</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Precisa de ajuda?</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>suporte@ferratech.com.br</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <span>(11) 9999-9999</span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Continuar Comprando
                </Button>
                <Button
                  onClick={() => navigate('/admin')}
                  className="flex-1"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Acompanhar Pedido
                </Button>
              </div>

              {/* Aviso */}
              <div className="text-xs text-gray-500 text-center">
                <p>Um email de confirmação foi enviado para você.</p>
                <p>Verifique sua caixa de entrada e spam.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess; 