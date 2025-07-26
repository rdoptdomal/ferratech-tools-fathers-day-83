import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Download, ExternalLink, ArrowLeft, Clock } from "lucide-react";
import { blackCatClient } from "@/integrations/blackcat/client";

const PaymentBoleto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<string>("pending");

  const { paymentResult, orderId } = location.state || {};

  useEffect(() => {
    if (!paymentResult) {
      navigate('/checkout');
      return;
    }

    // Verificar status do pagamento a cada 60 segundos
    const interval = setInterval(async () => {
      try {
        const payment = await blackCatClient.getPayment(paymentResult.id);
        setPaymentStatus(payment.status);
        
        if (payment.status === 'approved') {
          toast({
            title: "Pagamento aprovado!",
            description: "Seu pedido foi confirmado com sucesso.",
          });
          navigate('/order-success', { state: { orderId } });
        }
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [paymentResult, orderId, navigate, toast]);

  const downloadBoleto = () => {
    if (paymentResult.boleto_url) {
      window.open(paymentResult.boleto_url, '_blank');
    }
  };

  const openBoleto = () => {
    if (paymentResult.boleto_url) {
      window.open(paymentResult.boleto_url, '_blank');
    }
  };

  if (!paymentResult) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={0} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/checkout')}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar ao Checkout
          </Button>

          <Card className="text-center">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <FileText className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl">Pagamento Boleto</CardTitle>
              <p className="text-gray-600">
                Gere e pague o boleto bancário
              </p>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Status do Pagamento */}
              <div className="flex items-center justify-center gap-2">
                <Badge variant={paymentStatus === 'approved' ? 'default' : 'secondary'}>
                  {paymentStatus === 'approved' ? 'Aprovado' : 'Aguardando Pagamento'}
                </Badge>
                {paymentStatus === 'pending' && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Vencimento em 3 dias úteis</span>
                  </div>
                )}
              </div>

              {/* Código do Boleto */}
              <div className="space-y-2">
                <h3 className="font-medium">Código do Boleto</h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <code className="text-sm break-all">
                    {paymentResult.boleto_code}
                  </code>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={downloadBoleto}
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Baixar Boleto
                </Button>
                <Button
                  onClick={openBoleto}
                  className="flex-1"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Abrir Boleto
                </Button>
              </div>

              {/* Instruções */}
              <div className="text-left space-y-3">
                <h3 className="font-medium">Como pagar:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                  <li>Baixe ou abra o boleto bancário</li>
                  <li>Pague em qualquer banco ou lotérica</li>
                  <li>Use o código de barras para pagamento online</li>
                  <li>O pagamento será confirmado em até 2 dias úteis</li>
                </ol>
              </div>

              {/* Informações do Pedido */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Valor:</span>
                  <span className="font-medium">
                    R$ {(paymentResult.amount / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Pedido:</span>
                  <span className="font-medium">#{orderId?.slice(-8)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Vencimento:</span>
                  <span className="font-medium">
                    {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </div>

              {/* Avisos */}
              <div className="space-y-3">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <h4 className="font-medium text-yellow-800 mb-1">Importante:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• O boleto vence em 3 dias úteis</li>
                    <li>• Após o pagamento, aguarde até 2 dias úteis para confirmação</li>
                    <li>• Guarde o comprovante de pagamento</li>
                  </ul>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <p>Em caso de dúvidas sobre o pagamento, entre em contato conosco.</p>
                </div>
              </div>

              {/* Botão de Verificação */}
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Verificar Status do Pagamento
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentBoleto; 