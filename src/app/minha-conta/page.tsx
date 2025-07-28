import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { User, Package, Heart, Settings, LogOut } from 'lucide-react';

export default function MinhaContaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Minha Conta</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Gerencie seus dados pessoais, pedidos e preferências
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Menu de Navegação */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <a href="/meus-pedidos" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <Package className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Meus Pedidos</h3>
                    <p className="text-sm text-gray-600">Acompanhe suas compras</p>
                  </div>
                </div>
              </a>

              <a href="/favoritos" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <Heart className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Favoritos</h3>
                    <p className="text-sm text-gray-600">Produtos salvos</p>
                  </div>
                </div>
              </a>

              <a href="/perfil" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <User className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Perfil</h3>
                    <p className="text-sm text-gray-600">Dados pessoais</p>
                  </div>
                </div>
              </a>

              <a href="/configuracoes" className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <Settings className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Configurações</h3>
                    <p className="text-sm text-gray-600">Preferências da conta</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Informações da Conta */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informações da Conta
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value="João Silva"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value="joao.silva@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value="(11) 99999-9999"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Endereço Principal</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        value="01234-567"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Endereço
                      </label>
                      <input
                        type="text"
                        value="Rua das Flores, 123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cidade
                        </label>
                        <input
                          type="text"
                          value="São Paulo"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Estado
                        </label>
                        <input
                          type="text"
                          value="SP"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Salvar Alterações
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Cancelar
                </button>
              </div>
            </div>

            {/* Estatísticas */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-gray-600">Pedidos Realizados</div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">12</div>
                <div className="text-gray-600">Produtos Favoritos</div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">3</div>
                <div className="text-gray-600">Endereços Salvos</div>
              </div>
            </div>

            {/* Botão de Logout */}
            <div className="mt-8 text-center">
              <button className="flex items-center space-x-2 mx-auto text-red-600 hover:text-red-700 transition-colors">
                <LogOut className="h-5 w-5" />
                <span>Sair da Conta</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 