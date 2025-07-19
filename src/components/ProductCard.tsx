import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  discount?: number;
  specifications: string[];
  brand: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const installmentPrice = (product.price / 12).toFixed(2);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <Badge
          variant="destructive"
          className="absolute top-3 right-3 z-10 animate-pulse-glow"
        >
          -{discountPercent}%
        </Badge>
      )}

      {/* Favorite Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 left-3 z-10 bg-background/80 hover:bg-background"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <Heart
          className={`h-4 w-4 ${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
          }`}
        />
      </Button>

      <CardContent className="p-0">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square bg-gray-50 flex items-center justify-center p-6 group-hover:bg-gray-100 transition-colors relative">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            {/* Quick View Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="secondary" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem] hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({product.rating})
            </span>
          </div>

          {/* Specifications */}
          <div className="text-sm text-muted-foreground mb-3">
            <ul className="list-disc list-inside space-y-1">
              {product.specifications.slice(0, 2).map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="space-y-2">
            {product.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice.toFixed(2).replace(".", ",")}
              </div>
            )}
            <div className="text-2xl font-bold text-primary">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </div>
            <div className="text-sm text-muted-foreground">
              12x de R$ {installmentPrice.replace(".", ",")} sem juros
            </div>
            <div className="text-sm text-success font-semibold">
              💳 5% OFF no PIX
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="success"
          size="lg"
          className="w-full"
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? "Adicionar ao Carrinho" : "Fora de Estoque"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
export type { Product };