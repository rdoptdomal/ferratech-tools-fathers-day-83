'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  variations?: any;
  stock: number;
  rating: number;
  reviews: number;
  brand?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, variation?: any) => void;
  onAddToWishlist?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onAddToWishlist }: ProductCardProps) {
  const [selectedVariation, setSelectedVariation] = useState<any>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedVariation);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (onAddToWishlist) {
      onAddToWishlist(product);
    }
  };

  const handleVariationChange = (key: string, value: string) => {
    setSelectedVariation(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="group border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <Link href={`/produto/${product.slug}`}>
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <Image
            src={product.images[0] || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Brand */}
        {product.brand && (
          <p className="text-sm text-gray-500">{product.brand}</p>
        )}

        {/* Product Name */}
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviews})
          </span>
        </div>

        {/* Variations */}
        {product.variations && Object.keys(product.variations).length > 0 && (
          <div className="space-y-2">
            {Object.entries(product.variations).map(([key, values]) => (
              <div key={key}>
                <label className="text-xs text-gray-600 block mb-1">
                  {key}:
                </label>
                <select
                  onChange={(e) => handleVariationChange(key, e.target.value)}
                  className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="">Selecione {key}</option>
                  {Array.isArray(values) && values.map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          {product.originalPrice ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
        </button>

        {/* Stock Status */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-xs text-orange-600">
            Apenas {product.stock} em estoque!
          </p>
        )}
      </div>
    </div>
  );
} 