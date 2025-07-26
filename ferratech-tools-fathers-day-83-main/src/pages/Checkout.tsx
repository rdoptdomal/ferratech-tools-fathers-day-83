import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Truck, MapPin, Lock, QrCode, FileText } from "lucide-react";
import { blackCatClient, type BlackCatPaymentRequest } from "@/integrations/blackcat/client";
import { orderService, type OrderItemInsert } from "@/services/orders";
import { productService } from "@/services/products";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CheckoutForm {
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    birthDate: string;
  };
  shipping: {
    cep: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  payment: {
    method: string;
    cardNumber?: string;
    cardHolder?: string;
    cardExpiry?: string;
    cardCvv?: string;
    installments?: number;
  };
}

const Checkout = () => {
  const [cartItems] = useState<CartItem[]>([
    { id: "1", name: "Furadeira de Impacto 650W", price: 189.90, quantity: 1 },
    { id: "2", name: "Esmerilhadeira Angular 900W", price: 149.90, quantity: 2 },
  ]);
  
  const [form, setForm] = useState<CheckoutForm>({
    customer: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      birthDate: ""
    },
    shipping: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: ""
    },
    payment: {
      method: "credit-card"
    }
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = shippingMethod === "express" ? 19.90 : (subtotal >= 199 ? 0 : 29.90);
  const total = subtotal + shipping;

  const handleInputChange = (section: keyof CheckoutForm, field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const { customer, shipping } = form;
    
    // Validar dados pessoais
    if (!customer.name || !customer.email || !customer.phone || !customer.cpf) {
      toast({
        title: "Dados incompletos",
        description: "Preencha todos os dados pessoais",
        variant: "destructive"
      });
      return false;
    }

    // Validar endereço de entrega
    if (!shipping.cep || !shipping.street || !shipping.number || !shipping.city || !shipping.state) {
      toast({
        title: "Endereço incompleto",
        description: "Preencha todos os dados de entrega",
        variant: "destructive"
      });
      return false;
    }

    // Validar dados do cartão apenas se o método for cartão de crédito
    if (paymentMethod === "credit-card") {
      const { payment } = form;
      if (!payment.cardNumber || !payment.cardHolder || !payment.cardExpiry || !payment.cardCvv) {
        toast({
          title: "Dados do cartão incompletos",
          description: "Preencha todos os dados do cartão",
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const processPayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    
    try {
      // Preparar dados base do pagamento
      const paymentData: BlackCatPaymentRequest = {
        amount: Math.round(total * 100), // BlackCat espera em centavos
        currency: "BRL",
        description: `Pedido Ferratech - ${cartItems.map(item => item.name).join(", ")}`,
        customer: {
          name: form.customer.name,
          email: form.customer.email,
          phone: form.customer.phone,
          cpf: form.customer.cpf.replace(/\D/g, "")
        },
        payment_method: paymentMethod as any,
        shipping_address: {
          street: form.shipping.street,
          number: form.shipping.number,
          complement: form.shipping.complement,
          neighborhood: form.shipping.neighborhood,
          city: form.shipping.city,
          state: form.shipping.state,
          zip_code: form.shipping.cep.replace(/\D/g, "")
        },
        redirect_url: `${import.meta.env.VITE_SITE_URL}/checkout/callback`,
        enable3DS: paymentMethod === "credit-card" // 3DS apenas para cartão
      };

      // Configurar dados específicos por método de pagamento
      if (paymentMethod === "credit-card") {
        // Validar se todos os dados do cartão estão preenchidos
        if (!form.payment.cardNumber || !form.payment.cardHolder || !form.payment.cardExpiry || !form.payment.cardCvv) {
          toast({
            title: "Dados do cartão incompletos",
            description: "Preencha todos os dados do cartão de crédito",
            variant: "destructive"
          });
          setIsProcessing(false);
          return;
        }

        paymentData.card_data = {
          number: form.payment.cardNumber.replace(/\s/g, ""),
          holder_name: form.payment.cardHolder,
          expiration_month: form.payment.cardExpiry!.split("/")[0],
          expiration_year: "20" + form.payment.cardExpiry!.split("/")[1],
          cvv: form.payment.cardCvv!
        };
        paymentData.installments = form.payment.installments || 1;
      }

      // Processar pagamento com BlackCat
      const paymentResult = await blackCatClient.createPayment(paymentData);
      setPaymentResult(paymentResult);

      // Criar pedido no Supabase
      const orderItems: Omit<OrderItemInsert, 'order_id'>[] = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const order = await orderService.createOrder({
        customer_name: form.customer.name,
        customer_email: form.customer.email,
        customer_phone: form.customer.phone,
        customer_cpf: form.customer.cpf,
        total_amount: total,
        shipping_address: form.shipping,
        payment_method: paymentMethod,
        payment_status: paymentResult.status,
        order_status: "pending",
        blackcat_payment_id: paymentResult.transaction_id
      }, orderItems);

      toast({
        title: "Pedido processado com sucesso!",
        description: `ID do pedido: ${order.id}`,
      });
      
      // Redirecionar baseado no método de pagamento
      switch (paymentMethod) {
        case "pix":
          if (paymentResult.pix_details) {
            navigate('/payment-pix', { 
              state: { 
                paymentResult, 
                orderId: order.id,
                qrCodeImage: paymentResult.pix_details.qr_code_image_base64,
                qrCodeText: paymentResult.pix_details.qr_code_text
              } 
            });
          } else {
            navigate('/order-success', { state: { orderId: order.id } });
          }
          break;

        case "credit-card":
          if (paymentResult.status === "authentication_required" && paymentResult.authentication_url) {
            // Redirecionar para autenticação 3DS
            window.location.href = paymentResult.authentication_url;
          } else if (paymentResult.status === "paid") {
            navigate('/order-success', { state: { orderId: order.id } });
          } else {
            navigate('/checkout/callback', { 
              state: { 
                transactionId: paymentResult.transaction_id,
                orderId: order.id 
              } 
            });
          }
          break;

        case "boleto":
          navigate('/payment-boleto', { 
            state: { 
              paymentResult, 
              orderId: order.id 
            } 
          });
          break;

        default:
          navigate('/order-success', { state: { orderId: order.id } });
      }

    } catch (error: any) {
      console.error('Erro no pagamento:', error);
      toast({
        title: "Erro no pagamento",
        description: error.message || "Houve um problema ao processar seu pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulário de Checkout */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dados Pessoais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Dados Pessoais
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nome</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Seu nome"
                        value={form.customer.name}
                        onChange={(e) => handleInputChange('customer', 'name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com"
                        value={form.customer.email}
                        onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        placeholder="(11) 99999-9999"
                        value={form.customer.phone}
                        onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cpf">CPF</Label>
                      <Input 
                        id="cpf" 
                        placeholder="000.000.000-00"
                        value={form.customer.cpf}
                        onChange={(e) => handleInputChange('customer', 'cpf', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Data de Nascimento</Label>
                    <Input 
                      id="birthDate" 
                      type="date"
                      value={form.customer.birthDate}
                      onChange={(e) => handleInputChange('customer', 'birthDate', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Endereço de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input 
                        id="cep" 
                        placeholder="00000-000"
                        value={form.shipping.cep}
                        onChange={(e) => handleInputChange('shipping', 'cep', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="street">Endereço</Label>
                      <Input 
                        id="street" 
                        placeholder="Rua, Avenida..."
                        value={form.shipping.street}
                        onChange={(e) => handleInputChange('shipping', 'street', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="number">Número</Label>
                      <Input 
                        id="number" 
                        placeholder="123"
                        value={form.shipping.number}
                        onChange={(e) => handleInputChange('shipping', 'number', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="complement">Complemento</Label>
                      <Input 
                        id="complement" 
                        placeholder="Apto, Casa..."
                        value={form.shipping.complement}
                        onChange={(e) => handleInputChange('shipping', 'complement', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro</Label>
                      <Input 
                        id="neighborhood" 
                        placeholder="Centro"
                        value={form.shipping.neighborhood}
                        onChange={(e) => handleInputChange('shipping', 'neighborhood', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Select value={form.shipping.state} onValueChange={(value) => handleInputChange('shipping', 'state', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">SP</SelectItem>
                          <SelectItem value="RJ">RJ</SelectItem>
                          <SelectItem value="MG">MG</SelectItem>
                          <SelectItem value="RS">RS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="city">Cidade</Label>
                    <Input 
                      id="city" 
                      placeholder="São Paulo"
                      value={form.shipping.city}
                      onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Método de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle>Método de Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Entrega Padrão</p>
                            <p className="text-sm text-muted-foreground">5-7 dias úteis</p>
                          </div>
                          <span className="font-medium">
                            {subtotal >= 199 ? "Grátis" : "R$ 29,90"}
                          </span>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Entrega Expressa</p>
                            <p className="text-sm text-muted-foreground">2-3 dias úteis</p>
                          </div>
                          <span className="font-medium">R$ 19,90</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

                                {/* Método de Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Cartão de Crédito</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Parcelamento em até 12x sem juros
                        </p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <QrCode className="h-4 w-4" />
                          <span>PIX</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Aprovação instantânea - Sem dados do cartão
                        </p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>Boleto Bancário</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Vencimento em 3 dias úteis
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Informações específicas do método selecionado */}
                  {paymentMethod === "pix" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <QrCode className="h-4 w-4 text-green-600" />
                        <span className="font-medium text-green-800">Pagamento PIX</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Após finalizar a compra, você receberá um QR Code para pagamento instantâneo via PIX.
                        Não é necessário preencher dados do cartão.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "boleto" && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Boleto Bancário</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        Após finalizar a compra, você receberá um boleto bancário com vencimento em 3 dias úteis.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "credit-card" && (
                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-4 w-4 text-purple-600" />
                        <span className="font-medium text-purple-800">Cartão de Crédito</span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Preencha os dados do seu cartão abaixo. Aceitamos parcelamento em até 12x sem juros.
                      </p>
                    </div>
                  )}

                  {/* Campos do Cartão de Crédito */}
                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="0000 0000 0000 0000"
                          value={form.payment.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            handleInputChange('payment', 'cardNumber', formatted);
                          }}
                          maxLength={19}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardHolder">Nome do Titular</Label>
                          <Input 
                            id="cardHolder" 
                            placeholder="Como está no cartão"
                            value={form.payment.cardHolder}
                            onChange={(e) => handleInputChange('payment', 'cardHolder', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardExpiry">Validade</Label>
                          <Input 
                            id="cardExpiry" 
                            placeholder="MM/AA"
                            value={form.payment.cardExpiry}
                            onChange={(e) => {
                              const formatted = formatExpiry(e.target.value);
                              handleInputChange('payment', 'cardExpiry', formatted);
                            }}
                            maxLength={5}
                          />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardCvv">CVV</Label>
                          <Input 
                            id="cardCvv" 
                            placeholder="123"
                            value={form.payment.cardCvv}
                            onChange={(e) => handleInputChange('payment', 'cardCvv', e.target.value)}
                            maxLength={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="installments">Parcelas</Label>
                          <Select value={form.payment.installments?.toString()} onValueChange={(value) => handleInputChange('payment', 'installments', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1x sem juros</SelectItem>
                              <SelectItem value="2">2x sem juros</SelectItem>
                              <SelectItem value="3">3x sem juros</SelectItem>
                              <SelectItem value="6">6x sem juros</SelectItem>
                              <SelectItem value="12">12x sem juros</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Resumo do Pedido */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Itens do Carrinho */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                        </div>
                        <span className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Frete */}
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>{shipping === 0 ? "Grátis" : `R$ ${shipping.toFixed(2)}`}</span>
                  </div>
                  
                  <Separator />
                  
                  {/* Total */}
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>
                  
                  {/* Botão de Finalizar */}
                  <Button 
                    onClick={processPayment} 
                    disabled={isProcessing}
                    className="w-full"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processando...
                      </>
                    ) : (
                      <>
                        <Lock className="h-4 w-4 mr-2" />
                        Finalizar Compra
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Seus dados estão protegidos com criptografia SSL
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;