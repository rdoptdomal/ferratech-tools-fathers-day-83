import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Truck, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { type Product } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  variant?: "default" | "compact" | "featured";
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onAddToWishlist,
  variant = "default" 
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    onAddToWishlist?.(product);
    toast({
      title: isWishlisted ? "Removido dos favoritos" : "Adicionado aos favoritos",
      description: `${product.name} ${isWishlisted ? "removido" : "adicionado"} aos favoritos.`,
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  const discount = calculateDiscount();

  if (variant === "compact") {
    return (
      <Card className="group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-medium">
        <CardContent className="p-4">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform duration-300"
            />
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2 font-heading font-bold">
                -{discount}%
              </Badge>
            )}
          </div>
          
          <h3 className="font-heading font-semibold text-sm mb-2 line-clamp-2 text-text-primary group-hover:text-primary transition-colors duration-300">{product.name}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < product.rating ? "text-secondary fill-current" : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-text-secondary font-sans">({product.reviews})</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="font-heading font-bold text-lg text-text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-sm text-text-secondary line-through ml-2 font-sans">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={`group relative overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-medium ${
        variant === "featured" ? "ring-2 ring-primary/20" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-48 object-cover transition-transform duration-300 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          
          {/* Overlay with actions */}
          <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white text-text-primary hover:bg-gray-100 transition-all duration-200 hover:scale-110"
              onClick={handleAddToWishlist}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current text-primary" : ""}`} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white text-text-primary hover:bg-gray-100 transition-all duration-200 hover:scale-110"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {discount > 0 && (
              <Badge variant="destructive" className="font-heading font-bold">
                -{discount}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="secondary" className="bg-text-secondary text-white font-sans">
                Esgotado
              </Badge>
            )}
            {product.brand && (
              <Badge variant="outline" className="bg-white/90 text-text-primary font-sans">
                {product.brand}
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs font-sans">
              {product.category}
            </Badge>
            {product.sku && (
              <span className="text-xs text-text-secondary font-sans">SKU: {product.sku}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300 text-text-primary">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating ? "text-secondary fill-current" : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-text-secondary font-sans">({product.reviews} avaliações)</span>
          </div>

          {/* Technical Specs Preview */}
          {product.specifications && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {product.specifications.power && (
                  <span className="text-xs bg-background-secondary px-2 py-1 rounded font-sans text-text-secondary">
                    {product.specifications.power}
                  </span>
                )}
                {product.specifications.voltage && (
                  <span className="text-xs bg-background-secondary px-2 py-1 rounded font-sans text-text-secondary">
                    {product.specifications.voltage}
                  </span>
                )}
                {product.specifications.warranty && (
                  <span className="text-xs bg-success/10 text-success px-2 py-1 rounded font-sans">
                    {product.specifications.warranty}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <span className="font-heading font-bold text-2xl text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-text-secondary line-through font-sans">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            
            {/* Installments */}
            <div className="text-sm text-text-secondary mt-1 font-sans">
              em até 12x de {formatPrice(product.price / 12)}
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 mb-4 text-xs text-text-secondary font-sans">
            <div className="flex items-center gap-1">
              <Truck className="h-3 w-3" />
              <span>Frete Grátis</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Garantia</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>Entrega Rápida</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-200 hover:scale-105"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddToWishlist}
              className={`transition-all duration-200 hover:scale-105 ${
                isWishlisted ? "text-primary border-primary" : "hover:text-primary hover:border-primary"
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;