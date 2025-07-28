import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Award, Users, Package } from 'lucide-react';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Sobre a FerraTech</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Especialistas em ferramentas profissionais desde 2010
          </p>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Nossa História
            </h2>
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-600 mb-6">
                A FerraTech nasceu da paixão por ferramentas e da vontade de democratizar o acesso 
                a equipamentos profissionais de qualidade. Fundada em 2010, nossa empresa começou 
                como uma pequena loja no centro de São Paulo, atendendo principalmente profissionais 
                da construção civil e entusiastas do faça-você-mesmo.
              </p>
              <p className="text-gray-600 mb-6">
                Ao longo dos anos, expandimos nossa atuação para todo o Brasil, sempre mantendo 
                o compromisso com a qualidade e o atendimento personalizado. Hoje, somos referência 
                no mercado de ferramentas elétricas e manuais, oferecendo produtos das melhores 
                marcas nacionais e internacionais.
              </p>
              <p className="text-gray-600">
                Nossa missão é fornecer ferramentas confiáveis que ajudem profissionais e 
                entusiastas a realizar seus projetos com segurança e eficiência, sempre com 
                o melhor custo-benefício do mercado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Qualidade</h3>
              <p className="text-gray-600">
                Selecionamos apenas produtos de marcas reconhecidas e testadas
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Excelência</h3>
              <p className="text-gray-600">
                Buscamos sempre a melhor experiência para nossos clientes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Confiança</h3>
              <p className="text-gray-600">
                Construímos relacionamentos duradouros com nossos clientes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Inovação</h3>
              <p className="text-gray-600">
                Sempre atentos às novas tecnologias e tendências do mercado
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Números que Orgulham
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">13+</div>
              <p className="text-gray-600">Anos de experiência</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50k+</div>
              <p className="text-gray-600">Clientes satisfeitos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-gray-600">Produtos no catálogo</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-gray-600">Suporte ao cliente</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Faça parte da nossa história!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Descubra por que milhares de profissionais confiam na FerraTech
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/produtos"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ver Produtos
            </a>
            <a
              href="/contato"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 