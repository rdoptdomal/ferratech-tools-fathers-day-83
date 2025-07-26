import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Eye, Package, DollarSign, Users, TrendingUp, Search, Filter, Download, Settings, Image as ImageIcon, Tags, BarChart3 } from "lucide-react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [bulkPriceChange, setBulkPriceChange] = useState({ type: "percentage", value: 0 });
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    original_price: 0,
    brand: "Ferratech Pro",
    category: "ferramentas-eletricas",
    sku: "",
    specifications: [],
    in_stock: true,
    stock_quantity: 0,
    rating: 4.5,
    image: "",
    images: [],
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
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.sku) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios (nome, descrição, preço e SKU)",
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
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    try {
      await productService.deleteProduct(id);
      toast({ title: "Produto excluído com sucesso!" });
      await loadData();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao excluir produto",
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
      sku: "",
      specifications: [],
      in_stock: true,
      stock_quantity: 0,
      rating: 4.5,
      image: "",
      images: [],
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
      toast({ title: "Status do pedido atualizado!" });
      await loadData();
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
    <title>FerraTech Tools</title>
    <link>https://ferratech.shop</link>
    <description>Catálogo de produtos FerraTech</description>
    ${productList.map(product => `
    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description}</g:description>
      <g:link>https://ferratech.shop/product/${product.id}</g:link>
      <g:image_link>${product.image}</g:image_link>
      <g:availability>${product.in_stock ? 'in stock' : 'out of stock'}</g:availability>
      <g:price>${product.price.toFixed(2)} BRL</g:price>
      <g:brand>${product.brand}</g:brand>
      <g:condition>new</g:condition>
    </item>`).join('')}
  </channel>
</rss>`;

    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ferratech-products.xml';
    a.click();
    URL.revokeObjectURL(url);

    toast({ title: "XML do Google Merchant gerado com sucesso!" });
  };

  const getTotalRevenue = () => {
    return orderList
      .filter(order => order.payment_status === 'approved')
      .reduce((sum, order) => sum + order.total_amount, 0);
  };

  const getPendingOrders = () => {
    return orderList.filter(order => order.order_status === 'pending').length;
  };

  const filteredProducts = productList.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBulkPriceUpdate = async () => {
    if (selectedProducts.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos um produto",
        variant: "destructive"
      });
      return;
    }

    try {
      const updates = selectedProducts.map(async (productId) => {
        const product = productList.find(p => p.id === productId);
        if (!product) return;

        let newPrice = product.price;
        if (bulkPriceChange.type === "percentage") {
          newPrice = product.price * (1 + bulkPriceChange.value / 100);
        } else {
          newPrice = product.price + bulkPriceChange.value;
        }

        await productService.updateProduct(productId, { price: newPrice });
      });

      await Promise.all(updates);
      await loadData();
      setSelectedProducts([]);
      setShowBulkEdit(false);
      toast({ title: "Preços atualizados em massa com sucesso!" });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao atualizar preços",
        variant: "destructive"
      });
    }
  };

  const generateSKU = (name: string, brand: string) => {
    const prefix = brand.substring(0, 3).toUpperCase();
    const nameCode = name.substring(0, 5).replace(/\s/g, '').toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${nameCode}-${random}`;
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
          <p className="text-gray-600">Gerencie produtos, pedidos e configurações da loja</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produtos em Estoque</CardTitle>
              <Tags className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productList.filter(p => p.in_stock).length}</div>
              <p className="text-xs text-muted-foreground">
                Disponível para venda
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="analytics">Relatórios</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex items-center gap-4">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Produtos ({filteredProducts.length})</h2>
                  <p className="text-sm text-gray-600">Gerencie o catálogo de produtos</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button onClick={() => setIsAddingProduct(true)} className="flex-1 sm:flex-none">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
                <Button variant="outline" onClick={() => setShowBulkEdit(true)}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Preços em Massa
                </Button>
                <Button variant="outline" onClick={generateGoogleMerchantXML}>
                  <Download className="h-4 w-4 mr-2" />
                  Gerar XML
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, SKU ou marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  <SelectItem value="ferramentas-eletricas">Ferramentas Elétricas</SelectItem>
                  <SelectItem value="ferramentas-manuais">Ferramentas Manuais</SelectItem>
                  <SelectItem value="acessorios">Acessórios</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-2">
                        <Badge variant={product.in_stock ? "default" : "destructive"}>
                          {product.in_stock ? "Em Estoque" : "Fora de Estoque"}
                        </Badge>
                        {product.sku && (
                          <Badge variant="secondary" className="text-xs">
                            {product.sku}
                          </Badge>
                        )}
                      </div>
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
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      )}
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
                    {product.stock_quantity !== undefined && (
                      <p className="text-xs text-gray-500 mt-2">
                        Estoque: {product.stock_quantity} unidades
                      </p>
                    )}
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
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Relatórios e Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Vendas por Categoria</h3>
                    <div className="space-y-2">
                      {['ferramentas-eletricas', 'ferramentas-manuais', 'acessorios'].map(category => {
                        const categoryProducts = productList.filter(p => p.category === category);
                        const categoryRevenue = orderList
                          .filter(order => order.payment_status === 'approved')
                          .reduce((sum, order) => sum + order.total_amount, 0);
                        
                        return (
                          <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="capitalize">{category.replace('-', ' ')}</span>
                            <span className="font-medium">R$ {categoryRevenue.toFixed(2)}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Produtos Mais Vendidos</h3>
                    <div className="space-y-2">
                      {productList.slice(0, 5).map(product => (
                        <div key={product.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="truncate">{product.name}</span>
                          <Badge variant="secondary">R$ {product.price.toFixed(2)}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações da Loja
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome da Loja</Label>
                        <Input value="FerraTech Tools" disabled />
                      </div>
                      <div className="space-y-2">
                        <Label>Domínio</Label>
                        <Input value="ferratech.shop" disabled />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Integrações</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="font-medium">Google Analytics</span>
                        <Badge variant="default">Conectado</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="font-medium">BlackCat Pagamentos</span>
                        <Badge variant="default">Conectado</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <span className="font-medium">Supabase Database</span>
                        <Badge variant="default">Conectado</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Product Dialog */}
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="Nome do produto"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sku"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                      placeholder="SKU do produto"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setNewProduct({
                        ...newProduct, 
                        sku: generateSKU(newProduct.name || '', newProduct.brand || '')
                      })}
                    >
                      Gerar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand">Marca</Label>
                  <Input
                    id="brand"
                    value={newProduct.brand} 
                    onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                    placeholder="Marca"
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
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  placeholder="Descrição detalhada do produto"
                  rows={3}
                />
              </div>

              {/* Pricing */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$) *</Label>
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
                  <Label htmlFor="stockQuantity">Quantidade em Estoque</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={newProduct.stock_quantity}
                    onChange={(e) => setNewProduct({...newProduct, stock_quantity: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image">URL da Imagem Principal</Label>
                <Input
                  id="image"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              {/* Stock Status */}
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

        {/* Bulk Price Edit Dialog */}
        <Dialog open={showBulkEdit} onOpenChange={setShowBulkEdit}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Atualizar Preços em Massa</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Selecionar Produtos</Label>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {productList.map(product => (
                    <div key={product.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`product-${product.id}`}
                        checked={selectedProducts.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product.id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product.id));
                          }
                        }}
                      />
                      <Label htmlFor={`product-${product.id}`} className="text-sm">
                        {product.name} - R$ {product.price.toFixed(2)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de Alteração</Label>
                <Select value={bulkPriceChange.type} onValueChange={(value) => setBulkPriceChange({...bulkPriceChange, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Porcentagem (%)</SelectItem>
                    <SelectItem value="fixed">Valor Fixo (R$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Valor</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={bulkPriceChange.value}
                  onChange={(e) => setBulkPriceChange({...bulkPriceChange, value: parseFloat(e.target.value) || 0})}
                  placeholder={bulkPriceChange.type === "percentage" ? "10" : "5.00"}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleBulkPriceUpdate} className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Atualizar Preços
                </Button>
                <Button variant="outline" onClick={() => setShowBulkEdit(false)}>
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