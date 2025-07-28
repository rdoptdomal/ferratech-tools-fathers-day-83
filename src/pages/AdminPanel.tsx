import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, Upload, Eye, Package } from "lucide-react";
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
import { products, categories } from "@/data/products";
import { Product } from "@/types";

const AdminPanel = () => {
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const { toast } = useToast();

  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    brand: "Ferratech Pro",
    category: "ferramentas-eletricas",
    specifications: [],
    inStock: true,
    rating: 4.5,
    images: [""],
    detailedSpecs: {
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

  const handleSaveProduct = () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }

    const productToSave: Product = {
      id: editingProduct?.id || Date.now().toString(),
      name: newProduct.name!,
      slug: newProduct.name!.toLowerCase().replace(/\s+/g, '-'),
      description: newProduct.description!,
      price: newProduct.price!,
      originalPrice: newProduct.originalPrice || undefined,
      images: newProduct.images || ["/placeholder-product.jpg"],
      stock: 0,
      rating: newProduct.rating || 4.5,
      reviews: 0,
      specifications: newProduct.specifications || [],
      brand: newProduct.brand!,
      inStock: newProduct.inStock!,
      category: newProduct.category!,
      detailedSpecs: newProduct.detailedSpecs || {}
    };

    if (editingProduct) {
      setProductList(prev => prev.map(p => p.id === editingProduct.id ? productToSave : p));
      toast({ title: "Produto atualizado com sucesso!" });
    } else {
      setProductList(prev => [...prev, productToSave]);
      toast({ title: "Produto adicionado com sucesso!" });
    }

    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id));
    toast({ title: "Produto removido com sucesso!" });
  };

  const resetForm = () => {
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      originalPrice: 0,
      brand: "Ferratech Pro",
      category: "ferramentas-eletricas",
      specifications: [],
      inStock: true,
      rating: 4.5,
      images: [""],
      detailedSpecs: { warranty: "12 meses", includes: [] }
    });
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setIsAddingProduct(true);
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
      <g:image_link>https://ferratech.com.br${product.images[0]}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.inStock ? 'in_stock' : 'out_of_stock'}</g:availability>
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

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🔧 Painel Administrativo Ferratech
          </h1>
          <p className="text-gray-600">Gerencie produtos e configurações da loja</p>
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
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "Em Estoque" : "Fora de Estoque"}
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
                        src={product.images[0]}
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
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            R$ {product.originalPrice.toFixed(2)}
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

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Sistema de Pedidos</h3>
                  <p className="text-gray-600">
                    Funcionalidade em desenvolvimento. Integração com sistema de pagamento em breve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Produtos</p>
                      <p className="text-2xl font-bold">{productList.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Em Estoque</p>
                      <p className="text-2xl font-bold">{productList.filter(p => p.inStock).length}</p>
                    </div>
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Categorias</p>
                      <p className="text-2xl font-bold">{categories.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Valor Médio</p>
                      <p className="text-2xl font-bold">
                        R$ {(productList.reduce((sum, p) => sum + p.price, 0) / productList.length).toFixed(0)}
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add/Edit Product Modal */}
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Adicionar Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome do Produto *</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Furadeira de Impacto 650W"
                  />
                </div>
                
                <div>
                  <Label htmlFor="brand">Marca</Label>
                  <Select 
                    value={newProduct.brand} 
                    onValueChange={(value) => setNewProduct(prev => ({ ...prev, brand: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ferratech Pro">Ferratech Pro</SelectItem>
                      <SelectItem value="Bosch">Bosch</SelectItem>
                      <SelectItem value="Makita">Makita</SelectItem>
                      <SelectItem value="DeWalt">DeWalt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Select 
                    value={newProduct.category} 
                    onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Preço *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Preço Original</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      step="0.01"
                      value={newProduct.originalPrice}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, originalPrice: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    value={newProduct.images?.[0] || ""}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, images: [e.target.value] }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Descrição *</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Descrição detalhada do produto..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Especificações Técnicas</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Potência"
                      value={newProduct.detailedSpecs?.power || ""}
                      onChange={(e) => setNewProduct(prev => ({
                        ...prev,
                        detailedSpecs: { ...prev.detailedSpecs, power: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Voltagem"
                      value={newProduct.detailedSpecs?.voltage || ""}
                      onChange={(e) => setNewProduct(prev => ({
                        ...prev,
                        detailedSpecs: { ...prev.detailedSpecs, voltage: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Velocidade"
                      value={newProduct.detailedSpecs?.speed || ""}
                      onChange={(e) => setNewProduct(prev => ({
                        ...prev,
                        detailedSpecs: { ...prev.detailedSpecs, speed: e.target.value }
                      }))}
                    />
                    <Input
                      placeholder="Peso"
                      value={newProduct.detailedSpecs?.weight || ""}
                      onChange={(e) => setNewProduct(prev => ({
                        ...prev,
                        detailedSpecs: { ...prev.detailedSpecs, weight: e.target.value }
                      }))}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newProduct.inStock}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, inStock: e.target.checked }))}
                    />
                    <span>Em estoque</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={resetForm}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              <Button onClick={handleSaveProduct}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Produto
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminPanel;