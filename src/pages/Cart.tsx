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

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock cart items for demonstration
  useEffect(() => {
    setCartItems([
      {
        id: "1",
        name: "Furadeira de Impacto 650W Profissional",
        price: 189.90,
        originalPrice: 299.90,
        image: "/src/assets/drill-machine.jpg",
        quantity: 1,
      },
      {
        id: "2",
        name: "Esmerilhadeira Angular 900W 4.1/2\" Premium",
        price: 149.90,
        originalPrice: 219.90,
        image: "/src/assets/angle-grinder.jpg",
        quantity: 2,
      },
    ]);
  }, []);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removido",
      description: "O produto foi removido do carrinho.",
    });
  };

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

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discount;
  const shipping = subtotal >= 199 ? 0 : 29.90;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemsCount={0} />
        
        <div className="flex-1 flex items-center justify-center py-16">
          <div className="text-center space-y-6">
            <div className="text-8xl">🛒</div>
            <h2 className="text-3xl font-bold">Seu carrinho está vazio</h2>
            <p className="text-muted-foreground text-lg">
              Adicione produtos ao carrinho para continuar suas compras
            </p>
            <Button size="lg" onClick={() => navigate('/products')}>
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
      <Header cartItemsCount={cartItems.length} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Carrinho de Compras</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items do Carrinho */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl font-bold text-primary">
                            R$ {item.price.toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through">
                              R$ {item.originalPrice.toFixed(2)}
                            </span>
                          )}
                          {item.originalPrice && (
                            <Badge variant="destructive">
                              -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center font-semibold">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => navigate('/products')}>
                  Continuar Comprando
                </Button>
              </div>
            </div>
            
            {/* Resumo do Pedido */}
            <div className="space-y-6">
              {/* Cupom de Desconto */}
              <Card>
                <CardHeader>
                  <CardTitle>Cupom de Desconto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Digite o código do cupom"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button onClick={applyCoupon}>
                      Aplicar
                    </Button>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Cupons disponíveis:</p>
                    <p>• FERRATECH10 - 10% de desconto</p>
                    <p>• BEMVINDO - 5% de desconto</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Resumo */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Desconto ({(discount * 100).toFixed(0)}%)</span>
                      <span>-R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span>
                      {shipping === 0 ? (
                        <Badge variant="secondary">Grátis</Badge>
                      ) : (
                        `R$ ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {shipping > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Frete grátis para compras acima de R$ 199
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Compra
                  </Button>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span>🔒</span>
                      <span>Compra 100% segura</span>
                    </div>
                  </div>
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