import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { RefreshCw, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function TrocasDevolucoesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Trocas e Devoluções</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Processo simples e transparente para sua tranquilidade
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              
              {/* Prazo e Condições */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <Clock className="inline h-6 w-6 mr-2 text-primary" />
                  Prazo e Condições
                </h2>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <p className="text-blue-800">
                    <strong>Prazo de 7 dias:</strong> Você tem até 7 dias corridos após o recebimento 
                    do produto para solicitar troca ou devolução.
                  </p>
                </div>
                <p className="text-gray-600 mb-4">
                  Para que sua solicitação seja aceita, o produto deve estar:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Em perfeito estado de conservação</li>
                  <li>• Na embalagem original</li>
                  <li>• Com todos os acessórios e manuais</li>
                  <li>• Sem sinais de uso ou danos</li>
                </ul>
              </div>

              {/* Produtos que não aceitamos troca */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <AlertCircle className="inline h-5 w-5 mr-2 text-red-500" />
                  Produtos que não aceitamos troca
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Produtos personalizados ou sob medida</li>
                  <li>• Produtos de higiene pessoal</li>
                  <li>• Produtos com lacre violado por questões de segurança</li>
                  <li>• Produtos danificados por mau uso</li>
                  <li>• Produtos sem embalagem original</li>
                </ul>
              </div>

              {/* Como solicitar troca/devolução */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <RefreshCw className="inline h-5 w-5 mr-2 text-primary" />
                  Como solicitar troca ou devolução
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="text-gray-600 space-y-4">
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                      <div>
                        <strong>Acesse sua conta:</strong> Faça login em sua conta no site
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                      <div>
                        <strong>Vá em "Meus Pedidos":</strong> Localize o pedido que deseja trocar/devolver
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                      <div>
                        <strong>Clique em "Solicitar Troca/Devolução":</strong> Selecione o produto e o motivo
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                      <div>
                        <strong>Aguarde nossa análise:</strong> Respondemos em até 24 horas
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                      <div>
                        <strong>Envie o produto:</strong> Após aprovação, envie conforme instruções
                      </div>
                    </li>
                  </ol>
                </div>
              </div>

              {/* Tipos de troca/devolução */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Tipos de troca e devolução
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3 text-green-600">
                      <CheckCircle className="inline h-5 w-5 mr-2" />
                      Troca por outro produto
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Troque por outro produto de mesmo valor ou complemente a diferença.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Produto de mesmo valor</li>
                      <li>• Produto de valor superior (complemento)</li>
                      <li>• Produto de valor inferior (reembolso da diferença)</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h4 className="font-bold text-lg mb-3 text-blue-600">
                      <Package className="inline h-5 w-5 mr-2" />
                      Devolução com reembolso
                    </h4>
                    <p className="text-gray-600 mb-3">
                      Devolva o produto e receba o reembolso total do valor pago.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Reembolso integral</li>
                      <li>• Frete de retorno por nossa conta</li>
                      <li>• Processamento em até 5 dias úteis</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Prazos de processamento */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Prazos de processamento
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">24h</div>
                      <p className="text-sm text-gray-600">Análise da solicitação</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">3-5 dias</div>
                      <p className="text-sm text-gray-600">Recebimento do produto</p>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary mb-2">5 dias úteis</div>
                      <p className="text-sm text-gray-600">Processamento do reembolso</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custos */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Custos de troca/devolução
                </h3>
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-green-800">
                    <strong>Frete grátis:</strong> O frete de retorno é por nossa conta quando 
                    a troca/devolução é aprovada dentro do prazo de 7 dias.
                  </p>
                </div>
                <p className="text-gray-600 mt-4">
                  <strong>Exceções:</strong> Custos de frete podem ser cobrados em casos de:
                </p>
                <ul className="text-gray-600 space-y-2 mt-2">
                  <li>• Produto fora do prazo de 7 dias</li>
                  <li>• Produto com danos por mau uso</li>
                  <li>• Produto sem embalagem original</li>
                </ul>
              </div>

              {/* Contato */}
              <div className="bg-primary/10 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Precisa de ajuda?
                </h3>
                <p className="text-gray-600 mb-4">
                  Nossa equipe está pronta para ajudar com suas dúvidas sobre trocas e devoluções.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="mailto:atendimento@ferratech.shop"
                    className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center"
                  >
                    Enviar E-mail
                  </a>
                  <a
                    href="tel:11999999999"
                    className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-center"
                  >
                    Ligar Agora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 