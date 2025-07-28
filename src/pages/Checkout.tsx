import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, CreditCard, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "PIX"
  });

  const { toast } = useToast();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Simular processamento do pagamento
      toast({
        title: "Pedido processado!",
        description: "Seu pedido foi enviado com sucesso.",
      });
      
      // Redirecionar para página de sucesso
      router.push('/order-success');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao processar o pedido.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/cart')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Carrinho
          </Button>
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Checkout */}
          <Card>
            <CardHeader>
              <CardTitle>Informações de Entrega</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Dados Pessoais</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="cpf">CPF</Label>
                      <Input
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Endereço */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Endereço de Entrega</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="street">Rua *</Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        value={formData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neighborhood">Bairro *</Label>
                      <Input
                        id="neighborhood"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">CEP *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Método de Pagamento */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Método de Pagamento</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="pix"
                        name="paymentMethod"
                        value="PIX"
                        checked={formData.paymentMethod === "PIX"}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      />
                      <Label htmlFor="pix" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        PIX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="credit"
                        name="paymentMethod"
                        value="CREDIT_CARD"
                        checked={formData.paymentMethod === "CREDIT_CARD"}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      />
                      <Label htmlFor="credit" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Cartão de Crédito
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="boleto"
                        name="paymentMethod"
                        value="BOLETO"
                        checked={formData.paymentMethod === "BOLETO"}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      />
                      <Label htmlFor="boleto" className="flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        Boleto Bancário
                      </Label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Finalizar Pedido
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Resumo do Pedido */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>R$ 299,90</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>R$ 299,90</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informações de Entrega</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Entrega em 3-5 dias úteis</p>
                  <p>• Frete grátis para compras acima de R$ 199</p>
                  <p>• Rastreamento do pedido</p>
                  <p>• Garantia de 12 meses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;