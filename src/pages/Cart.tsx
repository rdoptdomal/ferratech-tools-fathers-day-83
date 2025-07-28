import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/types";

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();
  const router = useRouter();

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    toast({
      title: "Produto removido",
      description: "Produto removido do carrinho.",
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = (item as any).quantity || 1;
      return total + (item.price * quantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar a compra.",
        variant: "destructive",
      });
      return;
    }

    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold mb-2">Carrinho vazio</h2>
              <p className="text-gray-600 mb-6">
                Adicione produtos ao seu carrinho para começar a comprar.
              </p>
              <Button onClick={() => router.push('/products')}>
                Continuar Comprando
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {item.brand}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, ((item as any).quantity || 1) - 1)}
                            >
                              -
                            </Button>
                            <span className="w-12 text-center">
                              {(item as any).quantity || 1}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, ((item as any).quantity || 1) + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">
                              R$ {((item.price * ((item as any).quantity || 1)).toFixed(2))}
                            </p>
                            <p className="text-sm text-gray-500">
                              R$ {item.price.toFixed(2)} cada
                            </p>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} itens)</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600 font-semibold">Grátis</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>R$ {calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                  >
                    Finalizar Compra
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;