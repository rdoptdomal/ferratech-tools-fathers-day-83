import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Copy, CheckCircle, QrCode, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { blackCatClient } from "@/integrations/blackcat/client";
import { orderService } from "@/services/orders";

interface PaymentPixState {
  paymentResult: any;
  orderId: string;
  qrCodeImage: string;
  qrCodeText: string;
}

const PaymentPix = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid' | 'failed'>('pending');
  const [isChecking, setIsChecking] = useState(false);
  
  const state = location.state as PaymentPixState;
  const { paymentResult, orderId, qrCodeImage, qrCodeText } = state || {};

  useEffect(() => {
    if (!state) {
      navigate('/checkout');
      return;
    }

    // Iniciar verificação periódica do status
    const checkPaymentStatus = async () => {
      if (paymentStatus === 'paid' || paymentStatus === 'failed') return;
      
      setIsChecking(true);
      try {
        const result = await blackCatClient.getPayment(paymentResult.transaction_id);
        
        if (result.status === 'paid') {
          setPaymentStatus('paid');
          await orderService.updateOrderStatus(orderId, 'confirmed');
          await orderService.updatePaymentStatus(orderId, 'paid');
          
          toast({
            title: "Pagamento confirmado!",
            description: "Seu pedido foi processado com sucesso.",
          });
          
          // Redirecionar para página de sucesso após 3 segundos
          setTimeout(() => {
            navigate('/order-success', { state: { orderId } });
          }, 3000);
          
        } else if (result.status === 'failed') {
          setPaymentStatus('failed');
          await orderService.updatePaymentStatus(orderId, 'failed');
          
          toast({
            title: "Pagamento rejeitado",
            description: "Houve um problema com seu pagamento.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
      } finally {
        setIsChecking(false);
      }
    };

    // Verificar a cada 10 segundos
    const interval = setInterval(checkPaymentStatus, 10000);
    
    return () => clearInterval(interval);
  }, [paymentStatus, paymentResult?.transaction_id, orderId, navigate, toast]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(qrCodeText);
      setCopied(true);
      toast({
        title: "Código copiado!",
        description: "O código PIX foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o código PIX.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount / 100);
  };

  if (!state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <QrCode className="h-6 w-6" />
                Pagamento PIX
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status do Pagamento */}
              <div className="text-center">
                {paymentStatus === 'pending' && (
                  <div className="flex items-center justify-center gap-2 text-blue-600">
                    <Clock className="h-5 w-5" />
                    <span>Aguardando pagamento</span>
                  </div>
                )}
                {paymentStatus === 'paid' && (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span>Pagamento confirmado!</span>
                  </div>
                )}
                {paymentStatus === 'failed' && (
                  <Badge variant="destructive">Pagamento rejeitado</Badge>
                )}
              </div>

              {/* QR Code */}
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border inline-block">
                  <img 
                    src={qrCodeImage} 
                    alt="QR Code PIX" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
              </div>

              {/* Código PIX */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Código PIX:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={qrCodeText}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                  />
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? 'Copiado!' : 'Copiar'}
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Informações do Pedido */}
              <div className="space-y-2">
                <h3 className="font-medium">Informações do Pedido</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>ID do Pedido:</strong> {orderId}</p>
                  <p><strong>Valor:</strong> {formatCurrency(paymentResult.amount)}</p>
                  <p><strong>Status:</strong> 
                    <Badge variant="outline" className="ml-2">
                      {paymentStatus === 'pending' ? 'Aguardando' : 
                       paymentStatus === 'paid' ? 'Pago' : 'Falhou'}
                    </Badge>
                  </p>
                </div>
              </div>

              {/* Instruções */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Como pagar:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. Abra o app do seu banco</li>
                  <li>2. Escolha a opção PIX</li>
                  <li>3. Escaneie o QR Code ou cole o código</li>
                  <li>4. Confirme o pagamento</li>
                </ol>
              </div>

              {/* Botões */}
              <div className="space-y-2">
                {paymentStatus === 'failed' && (
                  <Button onClick={() => navigate('/checkout')} className="w-full">
                    Tentar Novamente
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')} 
                  className="w-full"
                >
                  Voltar ao Início
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPix; 