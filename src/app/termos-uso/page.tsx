import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Termos de Uso | FerraTech',
  description: 'Termos de uso e condições da FerraTech - Sua loja de ferramentas profissionais.',
};

export default function TermosUso() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Termos de Uso</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
              <p className="text-gray-600 mb-6">
                Ao acessar e usar o site da FerraTech, você concorda em cumprir e estar vinculado a estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não deve usar nosso serviço.
              </p>

              <h2 className="text-2xl font-semibold mb-4">2. Uso do Site</h2>
              <p className="text-gray-600 mb-6">
                O site da FerraTech é destinado para uso pessoal e não comercial. Você concorda em não usar o site para:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 ml-4">
                <li>Violar qualquer lei aplicável</li>
                <li>Transmitir conteúdo ilegal, ofensivo ou prejudicial</li>
                <li>Interferir no funcionamento do site</li>
                <li>Tentar acessar áreas restritas do sistema</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">3. Produtos e Serviços</h2>
              <p className="text-gray-600 mb-6">
                Todos os produtos são vendidos "no estado em que se encontram". A FerraTech se reserva o direito de:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-6 ml-4">
                <li>Modificar ou descontinuar produtos a qualquer momento</li>
                <li>Corrigir erros de preços ou descrições</li>
                <li>Limitar quantidades de compra</li>
                <li>Recusar pedidos quando necessário</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">4. Preços e Pagamento</h2>
              <p className="text-gray-600 mb-6">
                Todos os preços estão em Reais (R$) e incluem impostos aplicáveis. O pagamento deve ser realizado 
                no momento da compra através dos métodos aceitos. Reservamo-nos o direito de alterar preços sem aviso prévio.
              </p>

              <h2 className="text-2xl font-semibold mb-4">5. Entrega</h2>
              <p className="text-gray-600 mb-6">
                Os prazos de entrega são estimativas e podem variar conforme a região. A FerraTech não se responsabiliza 
                por atrasos causados por terceiros (transportadoras, correios, etc.).
              </p>

              <h2 className="text-2xl font-semibold mb-4">6. Política de Devolução</h2>
              <p className="text-gray-600 mb-6">
                Aceitamos devoluções em até 7 dias após o recebimento, desde que o produto esteja em sua embalagem original 
                e sem sinais de uso. Consulte nossa política completa de trocas e devoluções.
              </p>

              <h2 className="text-2xl font-semibold mb-4">7. Garantia</h2>
              <p className="text-gray-600 mb-6">
                Todos os produtos possuem garantia de fábrica conforme especificado pelo fabricante. A FerraTech atua como 
                intermediária e não se responsabiliza por defeitos de fabricação.
              </p>

              <h2 className="text-2xl font-semibold mb-4">8. Privacidade</h2>
              <p className="text-gray-600 mb-6">
                O uso de suas informações pessoais é regido por nossa Política de Privacidade, que faz parte destes termos.
              </p>

              <h2 className="text-2xl font-semibold mb-4">9. Propriedade Intelectual</h2>
              <p className="text-gray-600 mb-6">
                Todo o conteúdo do site, incluindo textos, imagens, logos e software, é propriedade da FerraTech ou de 
                nossos licenciadores e está protegido por leis de direitos autorais.
              </p>

              <h2 className="text-2xl font-semibold mb-4">10. Limitação de Responsabilidade</h2>
              <p className="text-gray-600 mb-6">
                A FerraTech não será responsável por danos indiretos, incidentais ou consequenciais decorrentes do uso 
                de nossos produtos ou serviços.
              </p>

              <h2 className="text-2xl font-semibold mb-4">11. Modificações</h2>
              <p className="text-gray-600 mb-6">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor 
                imediatamente após sua publicação no site.
              </p>

              <h2 className="text-2xl font-semibold mb-4">12. Contato</h2>
              <p className="text-gray-600 mb-6">
                Para dúvidas sobre estes termos, entre em contato conosco através do email: contato@ferratech.shop
              </p>

              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Última atualização:</strong> Janeiro de 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 