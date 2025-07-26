import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  RefreshCw, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Phone,
  Mail
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Returns = () => {
  const navigate = useNavigate();

  const returnSteps = [
    {
      step: 1,
      title: "Identifique o Problema",
      description: "Verifique se o produto apresenta defeito ou não atende às expectativas",
      icon: <Package className="h-5 w-5" />
    },
    {
      step: 2,
      title: "Entre em Contato",
      description: "Ligue ou envie e-mail informando o número do pedido e motivo",
      icon: <Phone className="h-5 w-5" />
    },
    {
      step: 3,
      title: "Aguarde Aprovação",
      description: "Nossa equipe analisará sua solicitação em até 24h",
      icon: <Clock className="h-5 w-5" />
    },
    {
      step: 4,
      title: "Envie o Produto",
      description: "Após aprovação, envie o produto em embalagem original",
      icon: <Truck className="h-5 w-5" />
    },
    {
      step: 5,
      title: "Receba a Solução",
      description: "Troca, reembolso ou reparo conforme o caso",
      icon: <CheckCircle className="h-5 w-5" />
    }
  ];

  const returnPolicies = [
    {
      title: "Prazo para Devolução",
      value: "7 dias corridos",
      description: "A partir da data de recebimento do produto"
    },
    {
      title: "Condições do Produto",
      value: "Embalagem Original",
      description: "Produto deve estar em perfeito estado e na embalagem original"
    },
    {
      title: "Frete de Devolução",
      value: "Por nossa conta",
      description: "Custo do frete de devolução é por nossa conta"
    },
    {
      title: "Prazo de Resolução",
      value: "Até 5 dias úteis",
      description: "Após recebimento do produto devolvido"
    }
  ];

  const warrantyInfo = [
    {
      category: "Ferramentas Elétricas",
      warranty: "12 meses",
      coverage: "Defeitos de fabricação e componentes elétricos"
    },
    {
      category: "Ferramentas Manuais",
      warranty: "6 meses",
      coverage: "Defeitos de fabricação e quebras por uso normal"
    },
    {
      category: "Acessórios",
      warranty: "3 meses",
      coverage: "Defeitos de fabricação"
    },
    {
      category: "EPIs",
      warranty: "6 meses",
      coverage: "Defeitos de fabricação e integridade estrutural"
    }
  ];

  const contactInfo = [
    {
      method: "Telefone",
      value: "(11) 9999-9999",
      description: "Segunda a Sexta, 8h às 18h",
      action: () => window.open('tel:11999999999')
    },
    {
      method: "E-mail",
      value: "devolucoes@ferratech.com.br",
      description: "Resposta em até 2 horas",
      action: () => window.open('mailto:devolucoes@ferratech.com.br')
    },
    {
      method: "WhatsApp",
      value: "(11) 99999-9999",
      description: "Atendimento rápido via WhatsApp",
      action: () => window.open('https://wa.me/5511999999999?text=Olá! Preciso solicitar uma devolução.')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
              Devoluções e Trocas
            </h1>
            <p className="text-lg text-text-secondary font-sans max-w-3xl mx-auto">
              Garantimos sua satisfação! Nossa política de devoluções é clara e transparente. 
              Se não ficou satisfeito com sua compra, estamos aqui para ajudar.
            </p>
          </div>

          {/* Processo de Devolução */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-6">
              Como Solicitar uma Devolução
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {returnSteps.map((step, index) => (
                <Card key={step.step} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-bold">{step.step}</span>
                    </div>
                    <div className="flex items-center justify-center mb-3">
                      {step.icon}
                    </div>
                    <h3 className="font-semibold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Políticas de Devolução */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Políticas de Devolução
                  </CardTitle>
                  <CardDescription>
                    Conheça nossas regras e prazos para devoluções
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {returnPolicies.map((policy, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-background-secondary">
                      <div className="flex-1">
                        <h4 className="font-semibold text-text-primary">{policy.title}</h4>
                        <p className="text-lg font-bold text-primary">{policy.value}</p>
                        <p className="text-sm text-text-secondary">{policy.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            {/* Garantias */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Garantias por Categoria
                  </CardTitle>
                  <CardDescription>
                    Prazos de garantia para cada tipo de produto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {warrantyInfo.map((item, index) => (
                    <div key={index} className="border-b border-border pb-3 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-text-primary">{item.category}</h4>
                        <Badge variant="secondary">{item.warranty}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary">{item.coverage}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Informações de Contato */}
          <section className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Entre em Contato
                </CardTitle>
                <CardDescription>
                  Escolha a forma mais conveniente para solicitar sua devolução
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {contactInfo.map((contact, index) => (
                    <div key={index} className="text-center p-4 rounded-lg border border-border hover:border-primary transition-colors">
                      <h4 className="font-semibold text-text-primary mb-2">{contact.method}</h4>
                      <p className="text-lg font-bold text-primary mb-1">{contact.value}</p>
                      <p className="text-sm text-text-secondary mb-3">{contact.description}</p>
                      <Button 
                        onClick={contact.action}
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        Entrar em Contato
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Casos Especiais */}
          <section className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Casos Especiais
                </CardTitle>
                <CardDescription>
                  Situações que merecem atenção especial
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Produto com Defeito</h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Não funciona ao ligar</li>
                      <li>• Peças quebradas na chegada</li>
                      <li>• Problemas de segurança</li>
                      <li>• Defeitos de fabricação</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-text-primary">Produto Errado</h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Produto diferente do pedido</li>
                      <li>• Quantidade incorreta</li>
                      <li>• Modelo ou cor errada</li>
                      <li>• Produto danificado no transporte</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-primary to-primary/90 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-heading font-bold mb-4">
                  Precisa de Ajuda com sua Devolução?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Nossa equipe está pronta para ajudar você a resolver qualquer problema
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contato')}
                    variant="secondary"
                    size="lg"
                  >
                    Falar com Atendimento
                  </Button>
                  <Button 
                    onClick={() => navigate('/meus-pedidos')}
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-primary"
                  >
                    Ver Meus Pedidos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Returns;