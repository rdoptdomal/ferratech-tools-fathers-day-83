import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CategoryBanner from "@/components/CategoryBanner";
import { products, categories, getProductsByCategory, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const { category } = useParams();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  // Get products based on category
  const categoryProducts = category ? getProductsByCategory(category) : products;
  const currentCategory = categories.find(cat => cat.id === category);

  // Sort products
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Filter by price range
  const filteredProducts = sortedProducts.filter(
    product => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItems.length} />
      
      {currentCategory ? (
        <CategoryBanner
          title={currentCategory.name}
          subtitle={`${currentCategory.icon} ${currentCategory.description}`}
          description="Encontre as melhores ferramentas com qualidade profissional e preços imbatíveis"
        />
      ) : (
        <CategoryBanner
          title="Todos os Produtos"
          subtitle="🔧 Linha Completa de Ferramentas"
          description="Explore nossa seleção completa de ferramentas profissionais das melhores marcas"
        />
      )}

      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-sm border">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filtros
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categorias</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => window.location.href = '/products'}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      !category
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    🏪 Todos os Produtos
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => window.location.href = `/products/${cat.id}`}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        category === cat.id
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Faixa de Preço</h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPriceRange([0, 200])}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    Até R$ 200
                  </button>
                  <button
                    onClick={() => setPriceRange([200, 400])}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    R$ 200 - R$ 400
                  </button>
                  <button
                    onClick={() => setPriceRange([400, 1000])}
                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    Acima de R$ 400
                  </button>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-medium mb-3">Marcas</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked />
                    <span className="text-sm">Ferratech Pro</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" />
                    <span className="text-sm">Bosch</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" />
                    <span className="text-sm">Makita</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" />
                    <span className="text-sm">DeWalt</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {filteredProducts.length} produtos encontrados
                </span>
                {priceRange[0] > 0 || priceRange[1] < 1000 ? (
                  <Badge variant="secondary">
                    R$ {priceRange[0]} - R$ {priceRange[1]}
                  </Badge>
                ) : null}
              </div>

              <div className="flex items-center gap-3">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Mais Vendidos</SelectItem>
                    <SelectItem value="price-asc">Menor Preço</SelectItem>
                    <SelectItem value="price-desc">Maior Preço</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                    <SelectItem value="rating">Melhor Avaliado</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode */}
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Nenhum produto encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar os filtros ou procure por outros termos
                </p>
                <Button onClick={() => setPriceRange([0, 1000])}>
                  Limpar Filtros
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;