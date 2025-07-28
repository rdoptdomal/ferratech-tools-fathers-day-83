import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Star, ShoppingCart, Heart, Truck, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/types";

const ProductDetail = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    // Simular carregamento do produto
    const fetchProduct = async () => {
      try {
        // Aqui você faria a chamada real para a API
        const mockProduct: Product = {
          id: "1",
          name: "Furadeira de Impacto 650W Profissional",
          slug: "furadeira-impacto-650w-profissional",
          description: "Furadeira de impacto robusta com alta potência para trabalhos pesados em alvenaria, madeira e metal. Ideal para profissionais que precisam de ferramentas confiáveis e duráveis.",
          price: 189.90,
          originalPrice: 299.90,
          images: [
            "https://images.unsplash.com/photo-1581147033415-3ec054d3c3b7?w=800",
            "https://images.unsplash.com/photo-1581147033415-3ec054d3c3b7?w=800",
            "https://images.unsplash.com/photo-1581147033415-3ec054d3c3b7?w=800"
          ],
          stock: 15,
          rating: 4.8,
          reviews: 127,
          brand: "Ferratech Pro",
          inStock: true,
          category: "ferramentas-eletricas",
          specifications: [
            "Potência: 650W",
            "Velocidade: 0-3000 RPM",
            "Mandril: 13mm",
            "Função impacto: 48.000 IPM",
            "Peso: 1.8kg",
            "Garantia: 12 meses"
          ],
          detailedSpecs: {
            power: "650W",
            voltage: "220V",
            speed: "0-3000 RPM",
            capacity: "Mandril 13mm",
            weight: "1.8kg",
            dimensions: "25 x 8 x 22 cm",
            warranty: "12 meses",
            includes: ["Furadeira", "Mandril com chave", "Punho auxiliar", "Limitador de profundidade", "Maleta"]
          }
        };
        
        setProduct(mockProduct);
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    if (!product) return;
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    handleAddToCart();
    router.push('/checkout');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando produto...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <p className="text-gray-600 mb-4">O produto que você está procurando não foi encontrado.</p>
            <Button onClick={() => router.push('/products')}>
              Voltar aos Produtos
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <button onClick={() => router.push('/')} className="hover:text-primary">
                  Início
                </button>
              </li>
              <li>/</li>
              <li>
                <button onClick={() => router.push('/products')} className="hover:text-primary">
                  Produtos
                </button>
              </li>
              <li>/</li>
              <li className="text-gray-900">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-primary' : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviews} avaliações)</span>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    R$ {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Frete grátis para compras acima de R$ 199</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Garantia de 12 meses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-gray-600">Produto original com nota fiscal</span>
                  </div>
                </div>
              </div>

              {/* Controles de Compra */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-600">
                    {product.stock} unidades disponíveis
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1"
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Adicionar ao Carrinho
                  </Button>
                  
                  <Button 
                    onClick={handleBuyNow}
                    variant="outline"
                    size="lg"
                  >
                    Comprar Agora
                  </Button>
                  
                  <Button variant="ghost" size="lg">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Especificações */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Especificações Técnicas</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Características</h3>
                <ul className="space-y-2">
                  {(product.specifications || []).map((spec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Especificações Detalhadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.detailedSpecs || {}).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <span className="text-sm font-medium text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <p className="text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;