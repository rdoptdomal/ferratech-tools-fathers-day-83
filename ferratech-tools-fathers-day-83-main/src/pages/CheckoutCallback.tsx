import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { blackCatClient } from "@/integrations/blackcat/client";
import { orderService } from "@/services/orders";
import { useToast } from "@/hooks/use-toast";

interface PaymentStatus {
  status: 'processing' | 'paid' | 'failed' | 'pending';
  message: string;
}

const CheckoutCallback = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>({
    status: 'processing',
    message: 'Processando seu pagamento...'
  });
  
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Extrair transaction_id da URL
        const transactionId = searchParams.get('transaction_id') || 
                            location.state?.transactionId;
        
        if (!transactionId) {
          setPaymentStatus({
            status: 'failed',
            message: 'ID da transação não encontrado'
          });
          setIsVerifying(false);
          return;
        }

        // Verificar status do pagamento no BlackCat
        const paymentResult = await blackCatClient.getPayment(transactionId);
        
        // Atualizar status do pedido no banco
        const orderId = location.state?.orderId;
        if (orderId) {
          await orderService.updateOrderStatus(orderId, 
            paymentResult.status === 'paid' ? 'confirmed' : 'pending'
          );
          await orderService.updatePaymentStatus(orderId, paymentResult.status);
        }

        // Definir status baseado na resposta
        if (paymentResult.status === 'paid') {
          setPaymentStatus({
            status: 'paid',
            message: 'Pagamento aprovado com sucesso!'
          });
          
          toast({
            title: "Pagamento aprovado!",
            description: "Seu pedido foi processado com sucesso.",
          });
          
          // Redirecionar para página de sucesso após 3 segundos
          setTimeout(() => {
            navigate('/order-success', { 
              state: { 
                orderId: orderId,
                transactionId: transactionId 
              } 
            });
          }, 3000);
          
        } else if (paymentResult.status === 'failed') {
          setPaymentStatus({
            status: 'failed',
            message: 'Pagamento foi rejeitado'
          });
          
          toast({
            title: "Pagamento rejeitado",
            description: "Houve um problema com seu pagamento. Tente novamente.",
            variant: "destructive",
          });
          
        } else {
          setPaymentStatus({
            status: 'pending',
            message: 'Pagamento ainda está sendo processado'
          });
        }
        
      } catch (error: any) {
        console.error('Erro ao verificar pagamento:', error);
        setPaymentStatus({
          status: 'failed',
          message: 'Erro ao verificar status do pagamento'
        });
        
        toast({
          title: "Erro na verificação",
          description: "Não foi possível verificar o status do pagamento.",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [searchParams, location.state, navigate, toast]);

  const handleRetry = () => {
    navigate('/checkout');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                Processando Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              {isVerifying ? (
                <div className="space-y-4">
                  <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-600" />
                  <p className="text-gray-600">{paymentStatus.message}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentStatus.status === 'paid' && (
                    <CheckCircle className="h-12 w-12 mx-auto text-green-600" />
                  )}
                  {paymentStatus.status === 'failed' && (
                    <XCircle className="h-12 w-12 mx-auto text-red-600" />
                  )}
                  <p className="text-gray-600">{paymentStatus.message}</p>
                  
                  <div className="space-y-2">
                    {paymentStatus.status === 'failed' && (
                      <Button onClick={handleRetry} className="w-full">
                        Tentar Novamente
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={handleGoHome} 
                      className="w-full"
                    >
                      Voltar ao Início
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutCallback; 