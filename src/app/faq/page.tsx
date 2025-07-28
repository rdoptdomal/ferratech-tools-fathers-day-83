'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, ChevronUp, HelpCircle, CreditCard, Truck, Shield, Package } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const faqData: FAQItem[] = [
    // Pagamento
    {
      question: "Quais formas de pagamento vocês aceitam?",
      answer: "Aceitamos cartões de crédito (Visa, Mastercard, Elo, American Express), cartões de débito, PIX, boleto bancário e transferência bancária. Todos os pagamentos são processados de forma segura.",
      category: "pagamento"
    },
    {
      question: "Posso parcelar minha compra?",
      answer: "Sim! Oferecemos parcelamento em até 12x sem juros no cartão de crédito para compras acima de R$ 50,00. Para valores menores, o parcelamento é em até 6x sem juros.",
      category: "pagamento"
    },
    {
      question: "O pagamento é seguro?",
      answer: "Sim, utilizamos gateways de pagamento certificados e criptografia SSL para garantir a segurança de todas as transações. Seus dados nunca são armazenados em nossos servidores.",
      category: "pagamento"
    },
    {
      question: "Como funciona o PIX?",
      answer: "O PIX é processado instantaneamente. Após a confirmação do pagamento, seu pedido é liberado para envio imediatamente. Você receberá um e-mail de confirmação.",
      category: "pagamento"
    },

    // Entrega
    {
      question: "Qual o prazo de entrega?",
      answer: "O prazo varia de 1 a 5 dias úteis, dependendo da sua localização. Para a Grande São Paulo, entregamos em até 2 dias úteis. Para outras regiões, o prazo é de 3 a 5 dias úteis.",
      category: "entrega"
    },
    {
      question: "Vocês fazem entrega em todo o Brasil?",
      answer: "Sim, entregamos em todo o território nacional através de transportadoras parceiras. O frete é calculado automaticamente no momento da compra.",
      category: "entrega"
    },
    {
      question: "Como funciona o frete grátis?",
      answer: "Oferecemos frete grátis para compras acima de R$ 199,00 em todo o Brasil. Para valores menores, o frete é calculado automaticamente baseado no peso e localização.",
      category: "entrega"
    },
    {
      question: "Posso rastrear meu pedido?",
      answer: "Sim! Após o envio, você receberá um e-mail com o código de rastreamento. Você também pode acompanhar o status do pedido em sua conta no site.",
      category: "entrega"
    },

    // Garantia
    {
      question: "Qual a garantia dos produtos?",
      answer: "Todos os nossos produtos possuem garantia de fábrica de 12 meses. Para produtos com garantia estendida, o prazo pode ser maior. Consulte a descrição de cada produto.",
      category: "garantia"
    },
    {
      question: "Como funciona a garantia?",
      answer: "Em caso de defeito de fabricação, você pode solicitar a troca ou reparo do produto. Entre em contato conosco e nossa equipe técnica avaliará o caso.",
      category: "garantia"
    },
    {
      question: "A garantia cobre danos por mau uso?",
      answer: "Não, a garantia cobre apenas defeitos de fabricação. Danos causados por mau uso, quedas ou uso inadequado não são cobertos pela garantia.",
      category: "garantia"
    },

    // Produtos
    {
      question: "Os produtos são originais?",
      answer: "Sim, todos os produtos são 100% originais e importados diretamente dos fabricantes ou seus representantes autorizados no Brasil.",
      category: "produtos"
    },
    {
      question: "Vocês têm loja física?",
      answer: "Atualmente operamos apenas online, o que nos permite oferecer preços mais competitivos e atendimento personalizado 24/7.",
      category: "produtos"
    },
    {
      question: "Posso testar o produto antes de comprar?",
      answer: "Infelizmente não é possível testar produtos antes da compra, mas oferecemos 7 dias para troca ou devolução caso o produto não atenda suas expectativas.",
      category: "produtos"
    },

    // Conta e Pedidos
    {
      question: "Preciso criar uma conta para comprar?",
      answer: "Não é obrigatório, mas recomendamos criar uma conta para acompanhar seus pedidos, histórico de compras e receber ofertas exclusivas.",
      category: "conta"
    },
    {
      question: "Como alterar dados da minha conta?",
      answer: "Acesse 'Minha Conta' no menu superior e clique em 'Editar Perfil'. Você pode alterar seus dados pessoais, endereços e preferências.",
      category: "conta"
    },
    {
      question: "Esqueci minha senha, o que fazer?",
      answer: "Na página de login, clique em 'Esqueci minha senha' e siga as instruções enviadas por e-mail para redefinir sua senha.",
      category: "conta"
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todas', icon: HelpCircle },
    { id: 'pagamento', name: 'Pagamento', icon: CreditCard },
    { id: 'entrega', name: 'Entrega', icon: Truck },
    { id: 'garantia', name: 'Garantia', icon: Shield },
    { id: 'produtos', name: 'Produtos', icon: Package },
    { id: 'conta', name: 'Conta', icon: HelpCircle }
  ];

  const filteredFAQs = activeCategory === 'todos' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Perguntas Frequentes</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Category Filter */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Escolha uma categoria
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        activeCategory === category.id
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-gray-900">
                      {item.question}
                    </span>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-12 bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Não encontrou o que procurava?
              </h3>
              <p className="text-gray-600 mb-6">
                Nossa equipe está pronta para ajudar com suas dúvidas
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:atendimento@ferratech.shop"
                  className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Enviar E-mail
                </a>
                <a
                  href="tel:11999999999"
                  className="border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
                >
                  Ligar Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 