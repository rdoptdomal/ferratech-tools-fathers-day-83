import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      toast({
        title: "Produto removido",
        description: "Item removido do carrinho.",
      });
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Carrinho</h2>
            {getCartItemsCount() > 0 && (
              <Badge variant="secondary" className="ml-2">
                {getCartItemsCount()}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {cartItems.length === 0 ? (
            // Carrinho vazio
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-gray-500 mb-6">
                Adicione produtos para começar suas compras
              </p>
              <Button onClick={() => { onClose(); navigate('/products'); }}>
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.product.price)}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-red-500 hover:text-red-700"
                      onClick={() => handleQuantityChange(item.product.id, 0)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal:</span>
                  <span className="text-lg font-semibold">
                    {formatCurrency(getCartTotal())}
                  </span>
                </div>

                {/* Shipping Info */}
                <div className="text-xs text-gray-500 text-center">
                  {getCartTotal() >= 199 ? (
                    <span className="text-green-600 font-medium">
                      ✓ Frete grátis para todo Brasil
                    </span>
                  ) : (
                    <span>
                      Adicione mais {formatCurrency(199 - getCartTotal())} para frete grátis
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Button 
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                  >
                    Finalizar Compra
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => { onClose(); navigate('/cart'); }}
                    className="w-full"
                  >
                    Ver Carrinho Completo
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MiniCart; 