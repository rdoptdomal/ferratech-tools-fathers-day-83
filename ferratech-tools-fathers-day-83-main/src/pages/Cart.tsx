import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, removeFromCart, updateQuantity, getCartSubtotal, getCartTotal } = useCart();

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "ferratech10") {
      setDiscount(0.1); // 10% de desconto
      toast({
        title: "Cupom aplicado!",
        description: "Desconto de 10% aplicado ao pedido.",
      });
    } else if (couponCode.toLowerCase() === "bemvindo") {
      setDiscount(0.05); // 5% de desconto
      toast({
        title: "Cupom aplicado!",
        description: "Desconto de 5% aplicado ao pedido.",
      });
    } else if (couponCode.trim()) {
      toast({
        title: "Cupom inválido",
        description: "O cupom informado não é válido.",
        variant: "destructive",
      });
    }
  };

  const subtotal = getCartSubtotal();
  const discountAmount = subtotal * discount;
  const shipping = subtotal >= 199 ? 0 : 29.90;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-6">
            <div className="text-8xl">🛒</div>
            <h2 className="text-3xl font-heading font-bold text-text-primary">Seu carrinho está vazio</h2>
            <p className="text-text-secondary text-lg font-sans">
              Adicione produtos ao carrinho para continuar suas compras
            </p>
            <Button size="lg" onClick={() => navigate('/products')} className="font-sans">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continuar Comprando
            </Button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-8">Carrinho de Compras</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items do Carrinho */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.product.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                          {item.product.name}
                        </h3>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            
                            <span className="w-12 text-center font-sans">{item.quantity}</span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-heading font-bold text-primary">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(item.product.price * item.quantity)}
                          </div>
                          
                          {item.product.originalPrice && (
                            <Badge variant="secondary" className="font-sans">
                              -{Math.round(((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100)}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cupom */}
                  <div className="space-y-2">
                    <label className="text-sm font-sans text-text-secondary">Cupom de desconto</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite seu cupom"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="font-sans"
                      />
                      <Button onClick={applyCoupon} size="sm" className="font-sans">
                        Aplicar
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Valores */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-sans">
                      <span>Subtotal ({cartItems.length} itens)</span>
                      <span>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(subtotal)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-sm font-sans text-success">
                        <span>Desconto</span>
                        <span>-{new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(discountAmount)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm font-sans">
                      <span>Frete</span>
                      <span>{shipping === 0 ? 'Grátis' : new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(shipping)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-heading font-bold text-text-primary">
                      <span>Total</span>
                      <span>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(total)}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 font-sans"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Compra
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full font-sans"
                    onClick={() => navigate('/products')}
                  >
                    Continuar Comprando
                  </Button>
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

export default Cart;