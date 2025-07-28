import { useRouter } from "next/navigation";
import { Shield, Award, Users, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Sobre a FerraTech</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nossa História</h2>
            <p className="text-gray-600 mb-4">
              A FerraTech nasceu da paixão por ferramentas de qualidade e do compromisso 
              em oferecer o melhor para profissionais e entusiastas do "faça você mesmo". 
              Com mais de 50 anos de experiência no mercado, construímos uma reputação 
              sólida baseada na confiança e na qualidade dos nossos produtos.
            </p>
            <p className="text-gray-600">
              Nossa missão é fornecer ferramentas profissionais que realmente fazem a 
              diferença no seu trabalho, com preços justos e um atendimento excepcional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Qualidade Garantida</h3>
              <p className="text-gray-600">
                Todos os nossos produtos possuem garantia de fábrica e são testados 
                rigorosamente antes de chegar até você.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Melhor Preço</h3>
              <p className="text-gray-600">
                Oferecemos os melhores preços do mercado, com promoções especiais e 
                descontos exclusivos para nossos clientes.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Atendimento Personalizado</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre pronta para ajudar você a encontrar a ferramenta 
                perfeita para o seu projeto.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Entregamos em todo o Brasil com agilidade e segurança, para que você 
                não perca tempo esperando.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Qualidade</h3>
                <p className="text-gray-600">
                  Trabalhamos apenas com as melhores marcas e produtos de alta qualidade, 
                  garantindo durabilidade e performance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Confiança</h3>
                <p className="text-gray-600">
                  Construímos relacionamentos duradouros baseados na transparência e 
                  no compromisso com nossos clientes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Inovação</h3>
                <p className="text-gray-600">
                  Estamos sempre atentos às novas tecnologias e tendências do mercado, 
                  oferecendo produtos modernos e eficientes.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Sustentabilidade</h3>
                <p className="text-gray-600">
                  Comprometidos com o meio ambiente, priorizamos produtos e práticas 
                  sustentáveis em nossas operações.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => router.push('/products')}
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
            >
              Conheça Nossos Produtos
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;