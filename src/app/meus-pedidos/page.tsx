import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Package, Truck, CheckCircle, Clock, Eye } from 'lucide-react';

export default function MeusPedidosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Meus Pedidos</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Acompanhe o status de suas compras
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Filtros */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary text-white px-4 py-2 rounded-lg font-semibold">
                  Todos
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
                  Pendentes
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
                  Em Transporte
                </button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
                  Entregues
                </button>
              </div>
            </div>

            {/* Lista de Pedidos */}
            <div className="space-y-6">
              
              {/* Pedido 1 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Pedido #12345</h3>
                    <p className="text-sm text-gray-600">Realizado em 15/06/2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-600 font-semibold">Entregue</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Furadeira de Impacto 650W</p>
                      <p className="text-sm text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Jogo de Brocas HSS</p>
                      <p className="text-sm text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Alicate Universal</p>
                      <p className="text-sm text-gray-600">Qtd: 2</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">Total: R$ 299,90</p>
                    <p className="text-sm text-gray-600">Pago via PIX</p>
                  </div>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Ver Detalhes</span>
                  </button>
                </div>
              </div>

              {/* Pedido 2 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Pedido #12344</h3>
                    <p className="text-sm text-gray-600">Realizado em 12/06/2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-600 font-semibold">Em Transporte</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Serra Circular 185mm Makita</p>
                      <p className="text-sm text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Disco de Corte para Madeira</p>
                      <p className="text-sm text-gray-600">Qtd: 2</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">Total: R$ 599,90</p>
                    <p className="text-sm text-gray-600">Pago via Cartão de Crédito</p>
                  </div>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Ver Detalhes</span>
                  </button>
                </div>
              </div>

              {/* Pedido 3 */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">Pedido #12343</h3>
                    <p className="text-sm text-gray-600">Realizado em 10/06/2024</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <span className="text-yellow-600 font-semibold">Pendente</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Panela de Pressão 5L</p>
                      <p className="text-sm text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Jogo de Panelas 5 Peças</p>
                      <p className="text-sm text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Wok 32cm</p>
                      <p className="text-sm text-gray-600">Qtd: 1</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-gray-900">Total: R$ 299,90</p>
                    <p className="text-sm text-gray-600">Aguardando Pagamento</p>
                  </div>
                  <button className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Ver Detalhes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Paginação */}
            <div className="mt-8 flex justify-center">
              <nav className="flex space-x-2">
                <button className="px-3 py-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Anterior
                </button>
                <button className="px-3 py-2 bg-primary text-white rounded-lg">
                  1
                </button>
                <button className="px-3 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  2
                </button>
                <button className="px-3 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  3
                </button>
                <button className="px-3 py-2 text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200">
                  Próxima
                </button>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 