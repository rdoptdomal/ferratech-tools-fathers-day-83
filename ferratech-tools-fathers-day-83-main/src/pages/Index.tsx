import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Star,
  Clock,
  Users,
  Award,
  Truck,
  Shield,
  CreditCard,
  ChevronRight,
  Play,
  BookOpen,
  Zap
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import PromoBanner from "@/components/PromoBanner";
import ProductCard from "@/components/ProductCard";
import CategoryBanner from "@/components/CategoryBanner";
import { products, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlistItems(prev => [...prev, product]);
  };

  // Organizar produtos por categoria
  const featuredProducts = products.slice(0, 8);
  const bestSellers = products.filter(p => p.rating >= 4.5).slice(0, 4);
  const newArrivals = products.slice(0, 4);
  const onSale = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  // Blog posts
  const blogPosts = [
    {
      id: 1,
      title: "Como Escolher a Furadeira Ideal para seu Projeto",
      excerpt: "Guia completo para escolher entre furadeiras de impacto, rotativas e parafusadeiras...",
      image: "/src/assets/drill-machine.jpg",
      category: "Dicas",
      readTime: "5 min",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Manutenção de Ferramentas Elétricas: Guia Completo",
      excerpt: "Aprenda a manter suas ferramentas em perfeito estado e prolongar sua vida útil...",
      image: "/src/assets/circular-saw.jpg",
      category: "Manutenção",
      readTime: "8 min",
      date: "2024-01-12"
    },
    {
      id: 3,
      title: "Segurança no Trabalho: EPIs Essenciais",
      excerpt: "Conheça os equipamentos de proteção indispensáveis para cada tipo de trabalho...",
      image: "/src/assets/hammer-drill.jpg",
      category: "Segurança",
      readTime: "6 min",
      date: "2024-01-10"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Promo Banner */}
      <PromoBanner
        title="🎉 ESPECIAL DIA DOS PAIS: ATÉ 50% OFF + FRETE GRÁTIS!"
        subtitle="Válido até 11/08/2024"
        ctaText="Ver Ofertas"
        ctaAction={() => navigate('/products')}
        backgroundColor="bg-gradient-to-r from-primary to-primary/90"
        textColor="text-white"
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Quick Stats */}
      <section className="py-8 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-2">2.500+</div>
              <div className="text-sm text-text-secondary font-sans">Produtos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-2">15.000+</div>
              <div className="text-sm text-text-secondary font-sans">Clientes Satisfeitos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-2">52</div>
              <div className="text-sm text-text-secondary font-sans">Anos de Tradição</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-heading font-bold text-primary mb-2">24h</div>
              <div className="text-sm text-text-secondary font-sans">Entrega Rápida</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Banner */}
      <CategoryBanner />

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">🔥 Produtos em Destaque</h2>
              <p className="text-xl text-text-secondary font-sans">As ferramentas mais vendidas da semana</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/products')}
              className="hidden md:flex font-sans"
            >
              Ver Todos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                variant="featured"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="bg-secondary text-text-primary font-heading font-bold px-4 py-2 text-sm mb-4">
              ⭐ MAIS VENDIDOS
            </Badge>
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">Produtos Mais Vendidos</h2>
            <p className="text-xl text-text-secondary font-sans">As ferramentas preferidas pelos nossos clientes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">📚 FerraTech Ensina</h2>
              <p className="text-xl text-text-secondary font-sans">Dicas, tutoriais e guias para profissionais</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/blog')}
              className="hidden md:flex font-sans"
            >
              Ver Todos os Artigos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-medium transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge variant="secondary" className="absolute top-3 left-3 font-sans">
                      {post.category}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-text-secondary mb-3 font-sans">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </span>
                      <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg mb-3 group-hover:text-primary transition-colors duration-300 text-text-primary">
                      {post.title}
                    </h3>

                    <p className="text-text-secondary mb-4 line-clamp-3 font-sans">
                      {post.excerpt}
                    </p>

                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 font-sans">
                      Ler mais
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-heading font-bold mb-4">📧 Fique por dentro das ofertas!</h2>
            <p className="text-xl mb-8 opacity-90 font-sans">
              Cadastre-se e receba em primeira mão nossas promoções exclusivas
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-text-primary font-sans"
              />
              <Button variant="secondary" size="lg" className="bg-secondary text-text-primary hover:bg-secondary/90 font-sans">
                Cadastrar
              </Button>
            </div>

            <p className="text-sm opacity-75 mt-4 font-sans">
              ✉️ Receba ofertas exclusivas • 🎁 Cupons de desconto • 📦 Novidades em primeira mão
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">Por que escolher a FerraTech?</h2>
            <p className="text-xl text-text-secondary font-sans">Compromisso com qualidade e satisfação do cliente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-3">Frete Grátis</h3>
              <p className="text-text-secondary font-sans">Compras acima de R$ 199 em todo o Brasil</p>
            </div>

            <div className="text-center">
              <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-secondary" />
              </div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-3">Garantia Estendida</h3>
              <p className="text-text-secondary font-sans">12 meses de garantia em todos os produtos</p>
            </div>

            <div className="text-center">
              <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CreditCard className="h-10 w-10 text-success" />
              </div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-3">Parcelamento</h3>
              <p className="text-text-secondary font-sans">Até 12x sem juros no cartão de crédito</p>
            </div>

            <div className="text-center">
              <div className="bg-warning/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-warning" />
              </div>
              <h3 className="font-heading font-bold text-xl text-text-primary mb-3">Atendimento Premium</h3>
              <p className="text-text-secondary font-sans">Suporte especializado e personalizado</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
