import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [cartItems] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItems.length} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            52 Anos de Tradição
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            A Ferratech é sinônimo de qualidade e confiança no mercado de ferramentas
          </p>
          <Button variant="secondary" size="lg" onClick={() => navigate('/products')}>
            Conheça Nossos Produtos
          </Button>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nossa História</h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Fundada em 1972, a Ferratech nasceu do sonho de dois irmãos apaixonados por ferramentas e tecnologia. Começamos como uma pequena loja de ferramentas manuais e, ao longo de mais de cinco décadas, nos tornamos referência no mercado nacional.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nossa missão sempre foi democratizar o acesso a ferramentas de qualidade profissional, oferecendo produtos que atendem desde o profissional mais exigente até o usuário doméstico que busca durabilidade e precisão.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary">52+</div>
                    <div className="text-sm text-muted-foreground">Anos de mercado</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary">500K+</div>
                    <div className="text-sm text-muted-foreground">Clientes atendidos</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="text-4xl mb-2">🏆</div>
                    <CardTitle>Tradição e Qualidade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Mais de meio século oferecendo as melhores ferramentas do mercado.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="text-4xl mb-2">🔧</div>
                    <CardTitle>Expertise Técnica</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Nossa equipe possui conhecimento técnico para te ajudar na escolha ideal.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <div className="text-6xl mb-4">💎</div>
                <CardTitle>Qualidade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Selecionamos apenas produtos que atendem aos mais altos padrões de qualidade e durabilidade.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="text-6xl mb-4">🤝</div>
                <CardTitle>Confiança</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Construímos relacionamentos duradouros baseados na transparência e honestidade.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <div className="text-6xl mb-4">⚡</div>
                <CardTitle>Inovação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Sempre buscamos as mais modernas tecnologias para oferecer o melhor aos nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a Ferratech?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="text-5xl">🚚</div>
              <h3 className="font-bold text-lg">Frete Grátis</h3>
              <p className="text-muted-foreground">Para compras acima de R$ 199 em todo o Brasil</p>
              <Badge variant="secondary">Entrega rápida</Badge>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-5xl">🛡️</div>
              <h3 className="font-bold text-lg">Garantia Estendida</h3>
              <p className="text-muted-foreground">12 meses em todos os produtos + suporte técnico</p>
              <Badge variant="secondary">Assistência especializada</Badge>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-5xl">💳</div>
              <h3 className="font-bold text-lg">Parcelamento</h3>
              <p className="text-muted-foreground">Até 12x sem juros nos cartões de crédito</p>
              <Badge variant="secondary">Sem taxas adicionais</Badge>
            </div>
            
            <div className="text-center space-y-4">
              <div className="text-5xl">📞</div>
              <h3 className="font-bold text-lg">Atendimento</h3>
              <p className="text-muted-foreground">Suporte especializado de segunda a sexta</p>
              <Badge variant="secondary">08:00 às 18:00</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
            <div>
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-bold text-lg mb-2">Endereço</h3>
              <p className="opacity-90">
                Rua das Ferramentas, 1972<br />
                Centro, São Paulo - SP<br />
                CEP: 01234-567
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-bold text-lg mb-2">Telefone</h3>
              <p className="opacity-90">
                (11) 1234-5678<br />
                WhatsApp: (11) 99999-8888<br />
                Seg-Sex: 08:00-18:00
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="font-bold text-lg mb-2">E-mail</h3>
              <p className="opacity-90">
                contato@ferratech.com.br<br />
                vendas@ferratech.com.br<br />
                suporte@ferratech.com.br
              </p>
            </div>
          </div>
          
          <Button variant="secondary" size="lg" onClick={() => navigate('/products')}>
            Explore Nossos Produtos
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;