import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Heart, ShoppingCart, Truck, Shield, CreditCard, ChevronLeft, Plus, Minus } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProductById, products, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();

  const product = id ? getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header cartItemsCount={cartItems.length} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Button onClick={() => navigate("/")}>Voltar à página inicial</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (productToAdd: Product, qty = quantity) => {
    for (let i = 0; i < qty; i++) {
      setCartItems(prev => [...prev, productToAdd]);
    }
    toast({
      title: "Produto adicionado!",
      description: `${qty}x ${productToAdd.name} adicionado ao carrinho.`,
    });
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const installmentPrice = (product.price / 12).toFixed(2);
  const pixPrice = (product.price * 0.95).toFixed(2);

  // Related products (same category, excluding current)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItems.length} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate("/")} className="hover:text-primary">
            Início
          </button>
          <span>/</span>
          <button onClick={() => navigate("/products")} className="hover:text-primary">
            Produtos
          </button>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-8 relative">
              {discountPercent > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute top-4 right-4 text-lg px-3 py-1"
                >
                  -{discountPercent}%
                </Badge>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating}) - 127 avaliações
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="space-y-3 p-6 bg-gray-50 rounded-lg">
              {product.originalPrice && (
                <div className="text-lg text-muted-foreground line-through">
                  De: R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                </div>
              )}
              <div className="text-4xl font-bold text-primary">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground">
                  12x de R$ {installmentPrice.replace(".", ",")} sem juros
                </div>
                <div className="text-lg font-semibold text-success">
                  💳 R$ {pixPrice.replace(".", ",")} no PIX (5% OFF)
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantidade:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 min-w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="success"
                  size="lg"
                  className="flex-1"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`h-5 w-5 ${
                      isFavorite ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </Button>
              </div>

              <Button variant="hero" size="lg" className="w-full">
                Comprar Agora
              </Button>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <div className="font-medium">Frete Grátis</div>
                  <div className="text-muted-foreground">Acima de R$ 199</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <div className="font-medium">Garantia</div>
                  <div className="text-muted-foreground">12 meses</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <div className="font-medium">Parcelamento</div>
                  <div className="text-muted-foreground">12x sem juros</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specs" className="mb-16">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações (127)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Especificações Técnicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.detailedSpecs).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <dt className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                        {key === 'power' && 'Potência'}
                        {key === 'voltage' && 'Voltagem'}
                        {key === 'speed' && 'Velocidade'}
                        {key === 'capacity' && 'Capacidade'}
                        {key === 'weight' && 'Peso'}
                        {key === 'dimensions' && 'Dimensões'}
                        {key === 'warranty' && 'Garantia'}
                        {key === 'includes' && 'Inclui'}
                      </dt>
                      <dd className="text-foreground">
                        {Array.isArray(value) ? (
                          <ul className="list-disc list-inside space-y-1">
                            {value.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="prose max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    {product.description}
                  </p>
                  <h3 className="text-xl font-semibold mb-4">Características principais:</h3>
                  <ul className="space-y-2">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⭐</div>
                  <h3 className="text-xl font-semibold mb-2">Avaliações em breve</h3>
                  <p className="text-muted-foreground">
                    Sistema de avaliações será implementado em breve.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;