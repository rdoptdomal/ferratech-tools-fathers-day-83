import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Eye, Package, DollarSign, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { productService, type Product } from "@/services/products";
import { orderService, type OrderWithItems } from "@/services/orders";
import { blackCatClient } from "@/integrations/blackcat/client";

const AdminPanel = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [orderList, setOrderList] = useState<OrderWithItems[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    original_price: 0,
    brand: "Ferratech Pro",
    category: "ferramentas-eletricas",
    specifications: [],
    in_stock: true,
    rating: 4.5,
    image: "",
    detailed_specs: {
      power: "",
      voltage: "",
      speed: "",
      capacity: "",
      weight: "",
      dimensions: "",
      warranty: "12 meses",
      includes: []
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [products, orders] = await Promise.all([
        productService.getAllProducts(),
        orderService.getAllOrders()
      ]);
      setProductList(products);
      setOrderList(orders);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar dados",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    try {
    if (editingProduct) {
        await productService.updateProduct(editingProduct.id, newProduct as any);
      toast({ title: "Produto atualizado com sucesso!" });
    } else {
        await productService.createProduct(newProduct as any);
      toast({ title: "Produto adicionado com sucesso!" });
    }

      await loadData();
    resetForm();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao salvar produto",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await productService.deleteProduct(id);
    setProductList(prev => prev.filter(p => p.id !== id));
    toast({ title: "Produto removido com sucesso!" });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao remover produto",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      original_price: 0,
      brand: "Ferratech Pro",
      category: "ferramentas-eletricas",
      specifications: [],
      in_stock: true,
      rating: 4.5,
      image: "",
      detailed_specs: { warranty: "12 meses", includes: [] }
    });
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsAddingProduct(true);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await orderService.updateOrderStatus(orderId, status);
      await loadData();
      toast({ title: "Status do pedido atualizado!" });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar status",
        variant: "destructive"
      });
    }
  };

  const generateGoogleMerchantXML = () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Ferratech - Ferramentas Profissionais</title>
    <link>https://ferratech.com.br</link>
    <description>Loja de ferramentas profissionais com mais de 50 anos de tradição</description>
    ${productList.map(product => `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>https://ferratech.com.br/product/${product.id}</g:link>
      <g:image_link>https://ferratech.com.br${product.image}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.in_stock ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${product.price.toFixed(2)} BRL</g:price>
      <g:brand>${product.brand}</g:brand>
      <g:product_category>Ferramentas</g:product_category>
      <g:google_product_category>Hardware > Tools</g:google_product_category>
      <g:mpn>${product.id}</g:mpn>
      <g:gtin>${product.id}000</g:gtin>
    </item>`).join('')}
  </channel>
</rss>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'google-merchant-feed.xml';
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "Feed XML gerado com sucesso!" });
  };

  const getTotalRevenue = () => {
    return orderList
      .filter(order => order.payment_status === 'approved')
      .reduce((sum, order) => sum + order.total_amount, 0);
  };

  const getPendingOrders = () => {
    return orderList.filter(order => order.order_status === 'pending').length;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Painel Administrativo Ferratech
          </h1>
          <p className="text-gray-600">Gerencie produtos e configurações da loja</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {getTotalRevenue().toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Pedidos aprovados
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos Pendentes</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getPendingOrders()}</div>
              <p className="text-xs text-muted-foreground">
                Aguardando processamento
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productList.length}</div>
              <p className="text-xs text-muted-foreground">
                Produtos cadastrados
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="analytics">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Produtos ({productList.length})</h2>
                  <p className="text-sm text-gray-600">Gerencie o catálogo de produtos</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button onClick={() => setIsAddingProduct(true)} className="flex-1 sm:flex-none">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
                <Button variant="outline" onClick={generateGoogleMerchantXML}>
                  <Upload className="h-4 w-4 mr-2" />
                  Gerar XML
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productList.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant={product.in_stock ? "default" : "destructive"}>
                        {product.in_stock ? "Em Estoque" : "Fora de Estoque"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => startEditing(product)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 p-4 flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-lg font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        {product.original_price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            R$ {product.original_price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <Badge variant="secondary">{product.brand}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-xl font-semibold">Pedidos ({orderList.length})</h2>
                <p className="text-sm text-gray-600">Gerencie pedidos e pagamentos</p>
              </div>
            </div>

            <div className="space-y-4">
              {orderList.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Pedido #{order.id.slice(-8)}</CardTitle>
                        <p className="text-sm text-gray-600">{order.customer_name} - {order.customer_email}</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={order.payment_status === 'approved' ? 'default' : 'secondary'}>
                          {order.payment_status}
                        </Badge>
                        <Badge variant={order.order_status === 'completed' ? 'default' : 'outline'}>
                          {order.order_status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Itens do Pedido</h4>
                        <div className="space-y-2">
                          {order.order_items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>{item.quantity}x Produto #{item.product_id}</span>
                              <span>R$ {item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Informações</h4>
                        <div className="space-y-1 text-sm">
                          <p><strong>Total:</strong> R$ {order.total_amount.toFixed(2)}</p>
                          <p><strong>Método:</strong> {order.payment_method}</p>
                          <p><strong>Data:</strong> {new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Select value={order.order_status} onValueChange={(value) => handleUpdateOrderStatus(order.id, value)}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente</SelectItem>
                          <SelectItem value="processing">Processando</SelectItem>
                          <SelectItem value="shipped">Enviado</SelectItem>
                          <SelectItem value="completed">Concluído</SelectItem>
                          <SelectItem value="cancelled">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios e Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analytics Avançados</h3>
                  <p className="text-gray-600">
                    Relatórios detalhados e métricas de vendas em desenvolvimento.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Product Dialog */}
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            
              <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Nome do produto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={newProduct.brand} 
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    placeholder="Marca"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Descrição detalhada do produto"
                  rows={3}
                />
                </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Preço Original (R$)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={newProduct.original_price}
                    onChange={(e) => setNewProduct({...newProduct, original_price: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={newProduct.category} onValueChange={(value) => setNewProduct({...newProduct, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ferramentas-eletricas">Ferramentas Elétricas</SelectItem>
                      <SelectItem value="ferramentas-manuais">Ferramentas Manuais</SelectItem>
                      <SelectItem value="acessorios">Acessórios</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                </div>

              <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                  />
              </div>

              <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                  id="inStock"
                  checked={newProduct.in_stock}
                  onChange={(e) => setNewProduct({...newProduct, in_stock: e.target.checked})}
                    />
                <Label htmlFor="inStock">Em Estoque</Label>
            </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveProduct} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  {editingProduct ? "Atualizar" : "Adicionar"}
                </Button>
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;