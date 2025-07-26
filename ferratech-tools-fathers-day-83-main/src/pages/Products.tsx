import { useState, useEffect } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { 
  Filter, 
  Grid3X3, 
  List, 
  Search, 
  Star, 
  Truck, 
  Shield,
  ChevronDown,
  SlidersHorizontal,
  SortAsc,
  SortDesc
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import Pagination from "@/components/Pagination";
import { products, type Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // State
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);

  // Pagination settings
  const itemsPerPage = 12;

  // Get search query from URL
  const searchQuery = searchParams.get("search") || "";
  const pageParam = searchParams.get("page");
  const initialPage = pageParam ? parseInt(pageParam) : 1;

  // Categories for filters
  const categories = [
    "Ferramentas Elétricas",
    "Ferramentas Manuais", 
    "Ferramentas a Bateria",
    "Equipamentos de Segurança",
    "Compressores",
    "Acessórios para Ferramentas"
  ];

  const brands = [
    "Bosch", "Makita", "DeWalt", "Milwaukee", "Hitachi", "Metabo", "Hilti", "Festool"
  ];

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (category && product.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Brand filter
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false;
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }

    // Rating filter
    if (selectedRatings.length > 0 && !selectedRatings.includes(Math.floor(product.rating))) {
      return false;
    }

    // Stock filter
    if (inStockOnly && !product.inStock) {
      return false;
    }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Update displayed products when page changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      setDisplayedProducts(sortedProducts.slice(startIndex, endIndex));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentPage, sortedProducts, startIndex, endIndex]);

  // Initialize page from URL
  useEffect(() => {
    if (initialPage !== currentPage) {
      setCurrentPage(initialPage);
    }
  }, [initialPage]);

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

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setInStockOnly(false);
    setSortBy("relevance");
    setCurrentPage(1);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
  };

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { name: "Início", href: "/" },
      { name: "Produtos", href: "/products" }
    ];

    if (category) {
      breadcrumbs.push({ name: category, href: `/products/${category}` });
    }

    if (searchQuery) {
      breadcrumbs.push({ name: `Busca: ${searchQuery}`, href: "#" });
    }

    return breadcrumbs;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 bg-background-secondary">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6 font-sans">
            {getBreadcrumbs().map((breadcrumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                <a 
                  href={breadcrumb.href}
                  className="hover:text-primary transition-colors"
                >
                  {breadcrumb.name}
                </a>
              </div>
            ))}
          </nav>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold text-text-primary mb-2">
                {category ? category : "Todos os Produtos"}
              </h1>
              <p className="text-lg text-text-secondary font-sans">
                {sortedProducts.length} produtos encontrados
                {searchQuery && ` para "${searchQuery}"`}
              </p>
            </div>

            {/* Search and Controls */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <Input
                  placeholder="Buscar produtos..."
                  className="pl-10 w-64 font-sans"
                  defaultValue={searchQuery}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      setSearchParams({ search: value });
                      setCurrentPage(1);
                    }
                  }}
                />
              </div>

              {/* Sort */}
              <Select value={sortBy} onValueChange={(value) => {
                setSortBy(value);
                setCurrentPage(1);
              }}>
                <SelectTrigger className="w-48 font-sans">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Mais Relevantes</SelectItem>
                  <SelectItem value="price-low">Menor Preço</SelectItem>
                  <SelectItem value="price-high">Maior Preço</SelectItem>
                  <SelectItem value="rating">Melhor Avaliação</SelectItem>
                  <SelectItem value="reviews">Mais Avaliados</SelectItem>
                  <SelectItem value="name">Nome A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filters */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                    <SheetDescription>
                      Aplique filtros para encontrar os produtos ideais
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-6">
                    {/* Mobile filter content */}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-soft border p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-heading font-semibold text-lg text-text-primary">Filtros</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary hover:text-primary font-sans">
                    Limpar
                  </Button>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-heading font-medium mb-4 text-text-primary">Faixa de Preço</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={(value) => {
                      setPriceRange(value);
                      setCurrentPage(1);
                    }}
                    max={5000}
                    min={0}
                    step={50}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-text-secondary font-sans">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-heading font-medium mb-4 text-text-primary">Categorias</h4>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center space-x-2">
                        <Checkbox
                          id={cat}
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories(prev => [...prev, cat]);
                            } else {
                              setSelectedCategories(prev => prev.filter(c => c !== cat));
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <label htmlFor={cat} className="text-sm cursor-pointer font-sans text-text-secondary">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div className="mb-6">
                  <h4 className="font-heading font-medium mb-4 text-text-primary">Marcas</h4>
                  <div className="space-y-2">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedBrands(prev => [...prev, brand]);
                            } else {
                              setSelectedBrands(prev => prev.filter(b => b !== brand));
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer font-sans text-text-secondary">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ratings */}
                <div className="mb-6">
                  <h4 className="font-heading font-medium mb-4 text-text-primary">Avaliações</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRatings(prev => [...prev, rating]);
                            } else {
                              setSelectedRatings(prev => prev.filter(r => r !== rating));
                            }
                            setCurrentPage(1);
                          }}
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center font-sans text-text-secondary">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < rating ? "text-secondary fill-current" : "text-border"
                              }`}
                            />
                          ))}
                          <span className="ml-1">e acima</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => {
                        setInStockOnly(checked as boolean);
                        setCurrentPage(1);
                      }}
                    />
                    <label htmlFor="inStock" className="text-sm cursor-pointer font-sans text-text-secondary">
                      Apenas em estoque
                    </label>
                  </div>
                </div>

                {/* Active Filters */}
                {(selectedBrands.length > 0 || selectedCategories.length > 0 || selectedRatings.length > 0 || inStockOnly) && (
                  <div className="pt-6 border-t border-border">
                    <h4 className="font-heading font-medium mb-3 text-text-primary">Filtros Ativos</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBrands.map(brand => (
                        <Badge key={brand} variant="secondary" className="text-xs font-sans">
                          {brand} ×
                        </Badge>
                      ))}
                      {selectedCategories.map(cat => (
                        <Badge key={cat} variant="secondary" className="text-xs font-sans">
                          {cat} ×
                        </Badge>
                      ))}
                      {selectedRatings.map(rating => (
                        <Badge key={rating} variant="secondary" className="text-xs font-sans">
                          {rating}★ ×
                        </Badge>
                      ))}
                      {inStockOnly && (
                        <Badge variant="secondary" className="text-xs font-sans">
                          Em estoque ×
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <ProductSkeleton variant={viewMode === "list" ? "compact" : "default"} count={itemsPerPage} />
              ) : displayedProducts.length > 0 ? (
                <>
                  <div className={`grid gap-6 ${
                    viewMode === "grid" 
                      ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                      : "grid-cols-1"
                  }`}>
                    {displayedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={handleAddToCart}
                        onAddToWishlist={handleAddToWishlist}
                        variant={viewMode === "list" ? "compact" : "default"}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalItems={sortedProducts.length}
                      itemsPerPage={itemsPerPage}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">
                    Nenhum produto encontrado
                  </h3>
                  <p className="text-text-secondary mb-6 font-sans">
                    Tente ajustar os filtros ou fazer uma nova busca
                  </p>
                  <Button onClick={clearFilters} className="bg-primary hover:bg-primary/90 font-sans">
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;