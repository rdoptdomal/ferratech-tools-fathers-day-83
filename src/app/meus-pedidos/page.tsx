'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string;
  orderNumber: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingCode?: string;
  estimatedDelivery?: string;
}

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simular dados de pedidos - em produção, isso viria da API
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          status: 'delivered',
          createdAt: '2024-12-15T10:30:00Z',
          total: 189.90,
          items: [
            {
              id: '1',
              productId: 'prod-1',
              name: 'Furadeira de Impacto 650W Profissional',
              price: 189.90,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=100&h=100&fit=crop'
            }
          ],
          shippingAddress: {
            street: 'Rua das Flores, 123',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01234-567'
          },
          trackingCode: 'BR123456789BR',
          estimatedDelivery: '2024-12-20'
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          status: 'shipped',
          createdAt: '2024-12-10T14:20:00Z',
          total: 599.90,
          items: [
            {
              id: '2',
              productId: 'prod-2',
              name: 'Serra Circular 185mm 1800W - Makita',
              price: 599.90,
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=100&h=100&fit=crop'
            }
          ],
          shippingAddress: {
            street: 'Av. Paulista, 1000',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100'
          },
          trackingCode: 'BR987654321BR',
          estimatedDelivery: '2024-12-18'
        }
      ];

      setOrders(mockOrders);
    } catch (err) {
      setError('Erro ao carregar pedidos');
      console.error('Erro ao buscar pedidos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      pending: 'Aguardando Pagamento',
      processing: 'Processando',
      shipped: 'Enviado',
      delivered: 'Entregue',
      cancelled: 'Cancelado'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleTrackOrder = (trackingCode: string) => {
    // Abrir rastreamento em nova aba
    window.open(`https://rastreamento.correios.com.br/app/index.php?objeto=${trackingCode}`, '_blank');
  };

  const handleReorder = (order: Order) => {
    // Adicionar itens do pedido ao carrinho
    order.items.forEach(item => {
      // Aqui você implementaria a lógica para adicionar ao carrinho
      console.log('Adicionando ao carrinho:', item);
    });
    
    // Redirecionar para o carrinho
    router.push('/cart');
  };

  const handleContactSupport = (orderNumber: string) => {
    // Redirecionar para página de contato com número do pedido
    router.push(`/contato?order=${orderNumber}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando seus pedidos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="bg-red-100 text-red-800 px-4 py-3 rounded-lg">
              <p className="font-medium">{error}</p>
              <button 
                onClick={fetchOrders}
                className="mt-2 text-blue-600 hover:text-blue-700 underline"
              >
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Meus Pedidos
          </h1>
          <p className="text-xl text-gray-600">
            Acompanhe o status de suas compras
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <svg className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Nenhum pedido encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Você ainda não fez nenhuma compra. Que tal começar agora?
              </p>
              <button
                onClick={() => router.push('/products')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Ver Produtos
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header do Pedido */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Pedido #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Realizado em {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Itens do Pedido */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Quantidade: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Endereço de Entrega */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Endereço de Entrega
                    </h4>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city} - {order.shippingAddress.state}<br />
                      CEP: {order.shippingAddress.zipCode}
                    </p>
                  </div>

                  {/* Informações de Rastreamento */}
                  {order.trackingCode && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Rastreamento
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600">
                            Código: {order.trackingCode}
                          </p>
                          {order.estimatedDelivery && (
                            <p className="text-sm text-gray-600">
                              Entrega estimada: {formatDate(order.estimatedDelivery)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleTrackOrder(order.trackingCode!)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Rastrear
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Ações do Pedido */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleReorder(order)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                      >
                        Comprar Novamente
                      </button>
                      <button
                        onClick={() => handleContactSupport(order.orderNumber)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                      >
                        Falar com Suporte
                      </button>
                      {order.status === 'delivered' && (
                        <button
                          onClick={() => router.push(`/minha-conta/pedidos/${order.id}/avaliar`)}
                          className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors"
                        >
                          Avaliar Produto
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 