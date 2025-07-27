import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Package, RefreshCw, FileText, Calendar, CheckCircle } from "lucide-react";

const Returns = () => {
  const [cartItems] = useState([]);
  const [returnType, setReturnType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmitReturn = async () => {
    setIsSubmitting(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Solicitação enviada!",
        description: "Sua solicitação de devolução/troca foi registrada. Protocolo: #DEV2024001",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um problema ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItems.length} />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Devoluções e Trocas</h1>
            <p className="text-xl text-muted-foreground">
              Precisando devolver ou trocar um produto? Estamos aqui para ajudar!
            </p>
          </div>

          {/* Política de Devolução */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Nossa Política
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-4xl">📦</div>
                  <h3 className="font-semibold">30 Dias</h3>
                  <p className="text-sm text-muted-foreground">
                    Prazo para solicitar devolução ou troca
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-4xl">🔄</div>
                  <h3 className="font-semibold">Produto Íntegro</h3>
                  <p className="text-sm text-muted-foreground">
                    Produto deve estar em perfeito estado
                  </p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="text-4xl">🚚</div>
                  <h3 className="font-semibold">Frete Grátis</h3>
                  <p className="text-sm text-muted-foreground">
                    Coletamos em sua casa sem custo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulário */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Solicitar Devolução/Troca
                </CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para iniciar o processo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Dados do Pedido */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Dados do Pedido</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="orderNumber">Número do Pedido</Label>
                      <Input id="orderNumber" placeholder="Ex: #12345" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customerEmail">Email do Cliente</Label>
                      <Input id="customerEmail" type="email" placeholder="seu@email.com" />
                    </div>
                  </div>
                </div>

                {/* Tipo de Solicitação */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Tipo de Solicitação</h3>
                  
                  <RadioGroup value={returnType} onValueChange={setReturnType}>
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="return" id="return" />
                      <Label htmlFor="return" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          <span className="font-medium">Devolução</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Produto com defeito ou não atendeu expectativas
                        </p>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="exchange" id="exchange" />
                      <Label htmlFor="exchange" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          <span className="font-medium">Troca</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Trocar por outro tamanho, cor ou modelo
                        </p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Motivo */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Motivo da Solicitação</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="defect">Produto com defeito</SelectItem>
                      <SelectItem value="damage">Produto danificado no transporte</SelectItem>
                      <SelectItem value="wrong">Produto diferente do pedido</SelectItem>
                      <SelectItem value="size">Tamanho incorreto</SelectItem>
                      <SelectItem value="expectation">Não atendeu expectativas</SelectItem>
                      <SelectItem value="other">Outro motivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição Detalhada</Label>
                  <Textarea 
                    id="description"
                    placeholder="Descreva detalhadamente o problema ou motivo da solicitação..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Produto Desejado (se for troca) */}
                {returnType === "exchange" && (
                  <div className="space-y-2">
                    <Label htmlFor="exchangeProduct">Produto Desejado para Troca</Label>
                    <Input 
                      id="exchangeProduct" 
                      placeholder="Especifique o produto que deseja receber"
                    />
                  </div>
                )}

                <Button 
                  onClick={handleSubmitReturn}
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                </Button>
              </CardContent>
            </Card>

            {/* Informações e Status */}
            <div className="space-y-6">
              {/* Status do Processo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Como Funciona
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Solicite a Devolução/Troca</h4>
                        <p className="text-sm text-muted-foreground">
                          Preencha o formulário com os dados do seu pedido
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">Análise da Solicitação</h4>
                        <p className="text-sm text-muted-foreground">
                          Nossa equipe analisará sua solicitação em até 24h
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Coleta do Produto</h4>
                        <p className="text-sm text-muted-foreground">
                          Agendaremos a coleta em sua casa sem custo
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Processamento</h4>
                        <p className="text-sm text-muted-foreground">
                          Estorno ou envio do novo produto em até 7 dias
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Políticas Importantes */}
              <Card>
                <CardHeader>
                  <CardTitle>Políticas Importantes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <strong>Prazo:</strong> 30 dias corridos após o recebimento
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <strong>Condição:</strong> Produto íntegro e na embalagem original
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <strong>Garantia:</strong> Produtos com defeito têm garantia estendida
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm">
                        <strong>Estorno:</strong> Reembolso em até 7 dias úteis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contato */}
              <Card>
                <CardHeader>
                  <CardTitle>Precisa de Ajuda?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Entre em contato conosco se tiver dúvidas
                    </p>
                    
                    <div className="space-y-2">
                      <Badge variant="outline" className="block">
                        📞 (11) 1234-5678
                      </Badge>
                      <Badge variant="outline" className="block">
                        💬 WhatsApp: (11) 99999-8888
                      </Badge>
                      <Badge variant="outline" className="block">
                        ✉️ devolucoes@ferratech.com.br
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Returns;