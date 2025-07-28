import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export default function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Política de Privacidade</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Como protegemos e utilizamos seus dados pessoais
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  <Shield className="inline h-6 w-6 mr-2 text-primary" />
                  Proteção de Dados
                </h2>
                <p className="text-gray-600 mb-4">
                  A FerraTech está comprometida em proteger a privacidade e os dados pessoais 
                  de nossos clientes. Esta política descreve como coletamos, utilizamos e 
                  protegemos suas informações pessoais, em conformidade com a Lei Geral de 
                  Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <Lock className="inline h-5 w-5 mr-2 text-primary" />
                  Dados que Coletamos
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Informações de identificação pessoal (nome, CPF, e-mail)</li>
                  <li>• Dados de contato (telefone, endereço)</li>
                  <li>• Informações de pagamento (processadas de forma segura)</li>
                  <li>• Dados de navegação e cookies</li>
                  <li>• Histórico de compras e preferências</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <Eye className="inline h-5 w-5 mr-2 text-primary" />
                  Como Utilizamos seus Dados
                </h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Processar e entregar seus pedidos</li>
                  <li>• Fornecer suporte ao cliente</li>
                  <li>• Enviar comunicações sobre produtos e ofertas</li>
                  <li>• Melhorar nossos serviços e experiência do usuário</li>
                  <li>• Cumprir obrigações legais e regulamentares</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  <CheckCircle className="inline h-5 w-5 mr-2 text-primary" />
                  Seus Direitos
                </h3>
                <p className="text-gray-600 mb-4">
                  Conforme a LGPD, você tem os seguintes direitos:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>Acesso:</strong> Solicitar informações sobre seus dados</li>
                  <li>• <strong>Correção:</strong> Atualizar dados incorretos ou incompletos</li>
                  <li>• <strong>Exclusão:</strong> Solicitar a remoção de seus dados</li>
                  <li>• <strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                  <li>• <strong>Revogação:</strong> Retirar consentimento a qualquer momento</li>
                  <li>• <strong>Oposição:</strong> Opor-se ao tratamento de dados</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Segurança dos Dados
                </h3>
                <p className="text-gray-600 mb-4">
                  Implementamos medidas técnicas e organizacionais adequadas para proteger 
                  seus dados pessoais contra:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Acesso não autorizado</li>
                  <li>• Alteração, divulgação ou destruição não autorizada</li>
                  <li>• Perda acidental de dados</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Compartilhamento de Dados
                </h3>
                <p className="text-gray-600">
                  Não vendemos, alugamos ou compartilhamos seus dados pessoais com terceiros, 
                  exceto quando necessário para:
                </p>
                <ul className="text-gray-600 space-y-2 mt-2">
                  <li>• Processar pagamentos (gateways de pagamento)</li>
                  <li>• Entregar produtos (transportadoras)</li>
                  <li>• Cumprir obrigações legais</li>
                  <li>• Prevenir fraudes e garantir segurança</li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Cookies e Tecnologias Similares
                </h3>
                <p className="text-gray-600">
                  Utilizamos cookies e tecnologias similares para melhorar sua experiência 
                  em nosso site, analisar o tráfego e personalizar conteúdo. Você pode 
                  gerenciar suas preferências de cookies através das configurações do seu navegador.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Retenção de Dados
                </h3>
                <p className="text-gray-600">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir 
                  as finalidades para as quais foram coletados, ou conforme exigido por lei. 
                  Quando não mais necessário, os dados são excluídos de forma segura.
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Alterações nesta Política
                </h3>
                <p className="text-gray-600">
                  Podemos atualizar esta política periodicamente. Recomendamos que você 
                  revise esta página regularmente para se manter informado sobre como 
                  protegemos suas informações.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Entre em Contato
                </h3>
                <p className="text-gray-600 mb-4">
                  Se você tiver dúvidas sobre esta política ou quiser exercer seus direitos, 
                  entre em contato conosco:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• <strong>E-mail:</strong> privacidade@ferratech.shop</li>
                  <li>• <strong>Telefone:</strong> (11) 99999-9999</li>
                  <li>• <strong>Endereço:</strong> Rua das Ferramentas, 123 - São Paulo/SP</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 