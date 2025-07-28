'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Heart, Eye } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    images: string[];
    brand: string;
    rating?: number;
    reviews?: number;
    isFeatured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Badge de Destaque */}
      {product.isFeatured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            DESTAQUE
          </span>
        </div>
      )}

      {/* Badge de Desconto */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            -{discountPercentage}%
          </span>
        </div>
      )}

      {/* Imagem do Produto */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay com ações */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2">
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
              <Heart className="h-5 w-5 text-gray-600" />
            </button>
            <Link href={`/product/${product.slug}`}>
              <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                <Eye className="h-5 w-5 text-gray-600" />
              </button>
            </Link>
            <button className="bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
              <ShoppingCart className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Informações do Produto */}
      <div className="p-4">
        {/* Marca */}
        <div className="text-xs text-blue-600 font-medium mb-1">
          {product.brand}
        </div>

        {/* Nome do Produto */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Avaliações */}
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Preços */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Botão Adicionar ao Carrinho */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
} 