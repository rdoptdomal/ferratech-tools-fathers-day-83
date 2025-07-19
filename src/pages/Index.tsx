import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import PromoBanner from "@/components/PromoBanner";
import ProductCard from "@/components/ProductCard";
import CategoryBanner from "@/components/CategoryBanner";
import { products, getFeaturedProducts, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItems.length} />
      
      {/* Promo Banner */}
      <PromoBanner
        title="🎉 ESPECIAL DIA DOS PAIS: ATÉ 50% OFF + FRETE GRÁTIS!"
        subtitle="Válido até 11/08/2024"
        ctaText="Ver Ofertas"
        ctaAction={() => navigate('/products')}
        backgroundColor="bg-primary"
        textColor="text-primary-foreground"
      />

      {/* Hero Banner */}
      <HeroBanner />

      {/* Special Offers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🔥 Ofertas Especiais Dia dos Pais</h2>
            <p className="text-xl text-muted-foreground">
              Ferramentas profissionais com até 50% de desconto
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="hero" size="xl" onClick={() => navigate('/products')}>
              Ver Todas as Ofertas
            </Button>
          </div>
        </div>
      </section>

      {/* Category Banner */}
      <CategoryBanner
        title="FERRAMENTAS PROFISSIONAIS"
        subtitle="Para quem trabalha com qualidade"
        description="Linha completa de ferramentas elétricas, manuais e acessórios das melhores marcas do mercado"
        ctaText="Explorar Categorias"
        onCtaClick={() => navigate('/products')}
      />

      {/* Trust Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Frete Grátis</h3>
              <p className="text-muted-foreground">Compras acima de R$ 199</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Garantia Estendida</h3>
              <p className="text-muted-foreground">12 meses em todos os produtos</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Parcelamento</h3>
              <p className="text-muted-foreground">Até 12x sem juros</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-bold text-lg mb-2 text-primary">Tradição</h3>
              <p className="text-muted-foreground">52 anos no mercado</p>
            </div>
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">🔧 Todos os Produtos</h2>
            <p className="text-xl text-muted-foreground">
              Explore nossa linha completa de ferramentas profissionais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">📧 Fique por dentro das ofertas!</h2>
          <p className="text-xl mb-8 opacity-90">
            Cadastre-se e receba em primeira mão nossas promoções exclusivas
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button variant="secondary" size="lg">
              Cadastrar
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
