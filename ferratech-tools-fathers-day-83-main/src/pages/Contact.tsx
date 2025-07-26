import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    orderNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em até 24 horas.",
      });

      // Resetar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        orderNumber: ''
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      toast({
        title: "Erro ao enviar",
        description: "Tente novamente em alguns minutos.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Telefone",
      value: "(11) 9999-9999",
      description: "Segunda a Sexta, 8h às 18h"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "E-mail",
      value: "contato@ferratech.com.br",
      description: "Resposta em até 2 horas"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Endereço",
      value: "Rua das Ferramentas, 123",
      description: "São Paulo - SP, 01234-567"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Horário de Funcionamento",
      value: "Segunda a Sexta",
      description: "8h às 18h | Sábado 8h às 12h"
    }
  ];

  const subjects = [
    "Dúvida sobre Produto",
    "Problema com Pedido",
    "Sugestão ou Reclamação",
    "Parceria Comercial",
    "Outros"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-text-primary mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-text-secondary font-sans max-w-2xl mx-auto">
              Estamos aqui para ajudar! Entre em contato conosco através dos canais abaixo 
              ou preencha o formulário e responderemos em até 24 horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Informações de Contato
                  </CardTitle>
                  <CardDescription>
                    Escolha a forma mais conveniente para entrar em contato
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-background-secondary transition-colors">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-text-primary">{info.title}</h3>
                        <p className="text-text-primary font-medium">{info.value}</p>
                        <p className="text-sm text-text-secondary">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* FAQ Rápido */}
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                  <CardDescription>
                    Respostas rápidas para as principais dúvidas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-text-primary">Como rastrear meu pedido?</h4>
                    <p className="text-sm text-text-secondary">
                      Acesse "Meus Pedidos" no menu superior e clique no pedido desejado.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-text-primary">Qual o prazo de entrega?</h4>
                    <p className="text-sm text-text-secondary">
                      Em média 3-5 dias úteis para todo o Brasil, com frete grátis em compras acima de R$ 199.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-text-primary">Como solicitar troca/devolução?</h4>
                    <p className="text-sm text-text-secondary">
                      Entre em contato conosco informando o número do pedido e o motivo da troca.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Envie sua Mensagem</CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato em até 24 horas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitSuccess ? (
                    <div className="text-center py-8">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-green-600 mb-2">
                        Mensagem Enviada!
                      </h3>
                      <p className="text-text-secondary">
                        Obrigado pelo contato. Responderemos em até 24 horas.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Nome Completo *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            placeholder="Seu nome completo"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">E-mail *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            required
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Assunto *</Label>
                          <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um assunto" />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="orderNumber">Número do Pedido (se aplicável)</Label>
                        <Input
                          id="orderNumber"
                          value={formData.orderNumber}
                          onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                          placeholder="Ex: ORD-001"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Mensagem *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          required
                          placeholder="Descreva sua dúvida, sugestão ou problema..."
                          rows={5}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <AlertCircle className="h-4 w-4 mr-2 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact; 