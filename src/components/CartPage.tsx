'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Header from './Header';
import Footer from './Footer';

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (productId: string, variation: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variation);
    } else {
      updateQuantity(productId, newQuantity, variation);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Adicione produtos ao carrinho antes de finalizar a compra.');
      return;
    }
    
    setLoading(true);
    // Redirecionar para checkout
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao seu carrinho para começar a comprar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/')}
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Continuar Comprando
              </button>
              <button
                onClick={() => router.push('/produtos')}
                className="border border-primary text-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Ver Todos os Produtos
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Carrinho de Compras</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <div key={`${item.product.id}-${JSON.stringify(item.variation)}`} className="border border-gray-200 rounded-lg p-4">
                <div className="flex gap-4">
                  {/* Imagem */}
                  <div className="w-24 h-24 relative flex-shrink-0">
                    <Image
                      src={item.product.images[0] || '/placeholder.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Informações */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.product.name}
                    </h3>
                    
                    {/* Variações */}
                    {item.variation && Object.keys(item.variation).length > 0 && (
                      <div className="text-sm text-gray-600 mb-2">
                        {Object.entries(item.variation).map(([key, value]) => (
                          <span key={key} className="mr-2">
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-lg font-bold text-primary mb-2">
                      {formatPrice(item.product.price)}
                    </p>

                    {/* Controles de Quantidade */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.variation, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.variation, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id, item.variation)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg p-6 bg-white sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumo do Pedido</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({items.reduce((total, item) => total + item.quantity, 0)} itens):</span>
                  <span className="font-semibold">{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frete:</span>
                  <span className="text-green-600 font-semibold">Grátis</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(getTotal())}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={loading || items.length === 0}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {loading ? 'Processando...' : 'Finalizar Compra'}
                </button>

                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpar Carrinho
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>• Frete grátis para compras acima de R$ 199</p>
                <p>• Entrega em até 3 dias úteis</p>
                <p>• Garantia de 12 meses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 