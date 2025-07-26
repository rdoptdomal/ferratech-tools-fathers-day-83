import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  HelpCircle,
  ExternalLink,
  Calendar,
  MapPin,
  CreditCard,
  QrCode
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { orderService } from "@/services/orders";

interface OrderStatus {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  completed: boolean;
  current: boolean;
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  shipping_address: any;
  created_at: string;
  blackcat_payment_id?: string;
  tracking_code?: string;
  order_items: Array<{
    product_id: string;
    quantity: number;
    price: number;
    product: {
      name: string;
      image: string;
    };
  }>;
}

const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // Simular dados de pedidos - em produção, buscar do Supabase
      const mockOrders: Order[] = [
        {
          id: "ORD-001",
          customer_name: "João Silva",
          customer_email: "joao@email.com",
          total_amount: 299.90,
          payment_method: "credit_card",
          payment_status: "paid",
          order_status: "shipped",
          shipping_address: {
            street: "Rua das Flores",
            number: "123",
            city: "São Paulo",
            state: "SP",
            zip_code: "01234-567"
          },
          created_at: "2024-01-15T10:30:00Z",
          blackcat_payment_id: "txn_12345",
          tracking_code: "BR123456789BR",
          order_items: [
            {
              product_id: "1",
              quantity: 1,
              price: 189.90,
              product: {
                name: "Furadeira de Impacto 650W",
                image: "/src/assets/drill-machine.jpg"
              }
            },
            {
              product_id: "2",
              quantity: 1,
              price: 110.00,
              product: {
                name: "Esmerilhadeira Angular 900W",
                image: "/src/assets/angle-grinder.jpg"
              }
            }
          ]
        },
        {
          id: "ORD-002",
          customer_name: "João Silva",
          customer_email: "joao@email.com",
          total_amount: 149.90,
          payment_method: "pix",
          payment_status: "paid",
          order_status: "confirmed",
          shipping_address: {
            street: "Rua das Flores",
            number: "123",
            city: "São Paulo",
            state: "SP",
            zip_code: "01234-567"
          },
          created_at: "2024-01-10T14:20:00Z",
          blackcat_payment_id: "txn_67890",
          order_items: [
            {
              product_id: "3",
              quantity: 1,
              price: 149.90,
              product: {
                name: "Serra Circular 1400W",
                image: "/src/assets/circular-saw.jpg"
              }
            }
          ]
        }
      ];
      
      setOrders(mockOrders);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar seus pedidos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusTimeline = (order: Order): OrderStatus[] => {
    const statuses: OrderStatus[] = [
      {
        id: "ordered",
        label: "Pedido Realizado",
        icon: <Package className="h-4 w-4" />,
        color: "text-green-600",
        completed: true,
        current: false
      },
      {
        id: "paid",
        label: "Pagamento Aprovado",
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-green-600",
        completed: order.payment_status === "paid",
        current: order.payment_status === "paid" && order.order_status === "confirmed"
      },
      {
        id: "processing",
        label: "Em Separação",
        icon: <Clock className="h-4 w-4" />,
        color: "text-blue-600",
        completed: ["confirmed", "shipped", "delivered"].includes(order.order_status),
        current: order.order_status === "confirmed"
      },
      {
        id: "shipped",
        label: "Enviado",
        icon: <Truck className="h-4 w-4" />,
        color: "text-blue-600",
        completed: ["shipped", "delivered"].includes(order.order_status),
        current: order.order_status === "shipped"
      },
      {
        id: "delivered",
        label: "Entregue",
        icon: <CheckCircle className="h-4 w-4" />,
        color: "text-green-600",
        completed: order.order_status === "delivered",
        current: order.order_status === "delivered"
      }
    ];

    return statuses;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Aguardando Pagamento", color: "bg-yellow-100 text-yellow-800" },
      paid: { label: "Pago", color: "bg-green-100 text-green-800" },
      failed: { label: "Falhou", color: "bg-red-100 text-red-800" },
      confirmed: { label: "Confirmado", color: "bg-blue-100 text-blue-800" },
      shipped: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
      delivered: { label: "Entregue", color: "bg-green-100 text-green-800" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
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

  const handleContactSupport = (orderId: string) => {
    // Em produção, abrir formulário de contato pré-preenchido
    toast({
      title: "Suporte",
      description: "Em breve você será redirecionado para o chat de suporte.",
    });
  };

  const handleTrackPackage = (trackingCode: string) => {
    // Abrir página de rastreamento da transportadora
    window.open(`https://rastreamento.correios.com.br/app/index.php?objeto=${trackingCode}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando seus pedidos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
            <p className="text-gray-600">Acompanhe o status de todos os seus pedidos</p>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-gray-500 mb-6">
                  Você ainda não fez nenhum pedido. Que tal começar a comprar?
                </p>
                <Button onClick={() => navigate('/products')}>
                  Ver Produtos
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                        <p className="text-sm text-gray-500">
                          Realizado em {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(order.order_status)}
                        <Button variant="ghost" size="sm">
                          {selectedOrder?.id === order.id ? "Ocultar" : "Ver Detalhes"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  {selectedOrder?.id === order.id && (
                    <CardContent className="border-t pt-6">
                      {/* Timeline */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-4">Status do Pedido</h4>
                        <div className="space-y-4">
                          {getOrderStatusTimeline(order).map((status, index) => (
                            <div key={status.id} className="flex items-center gap-3">
                              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                                status.completed ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                <span className={status.completed ? 'text-green-600' : 'text-gray-400'}>
                                  {status.icon}
                                </span>
                              </div>
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${
                                  status.completed ? 'text-gray-900' : 'text-gray-500'
                                }`}>
                                  {status.label}
                                </p>
                                {status.current && (
                                  <p className="text-xs text-blue-600">Status atual</p>
                                )}
                              </div>
                              {index < getOrderStatusTimeline(order).length - 1 && (
                                <div className={`w-px h-8 ml-4 ${
                                  status.completed ? 'bg-green-200' : 'bg-gray-200'
                                }`} />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-4">Itens do Pedido</h4>
                        <div className="space-y-3">
                          {order.order_items.map((item) => (
                            <div key={item.product_id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{item.product.name}</p>
                                <p className="text-sm text-gray-500">
                                  Qtd: {item.quantity} x {formatCurrency(item.price)}
                                </p>
                              </div>
                              <p className="font-medium text-sm">
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-3">Informações de Entrega</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                              <div>
                                <p className="font-medium">{order.shipping_address.street}, {order.shipping_address.number}</p>
                                <p className="text-gray-500">{order.shipping_address.city} - {order.shipping_address.state}</p>
                                <p className="text-gray-500">CEP: {order.shipping_address.zip_code}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-3">Informações de Pagamento</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              {order.payment_method === 'credit_card' ? (
                                <CreditCard className="h-4 w-4 text-gray-400" />
                              ) : (
                                <QrCode className="h-4 w-4 text-gray-400" />
                              )}
                              <span className="capitalize">
                                {order.payment_method === 'credit_card' ? 'Cartão de Crédito' : 'PIX'}
                              </span>
                            </div>
                            <p className="text-gray-500">Total: {formatCurrency(order.total_amount)}</p>
                            {order.tracking_code && (
                              <div className="pt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleTrackPackage(order.tracking_code!)}
                                  className="flex items-center gap-2"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  Rastrear Envio
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Support Button */}
                      <div className="mt-6 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => handleContactSupport(order.id)}
                          className="flex items-center gap-2"
                        >
                          <HelpCircle className="h-4 w-4" />
                          Precisa de ajuda com este pedido?
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyOrders; 