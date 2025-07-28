'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Star, ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
      {/* Imagem do Produto */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={false}
        />
        
        {/* Badge de Desconto */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}
        
        {/* Botão de Favorito */}
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Informações do Produto */}
      <div className="p-4">
        {/* Categoria */}
        {product.category && typeof product.category === 'object' && (
          <div className="text-xs text-blue-600 font-medium mb-1">
            {product.category.name}
          </div>
        )}
        
        {/* Nome do Produto */}
        <Link href={`/produto/${product.slug}`} className="block">
          <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {/* Marca */}
        <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
        
        {/* Avaliação */}
        <div className="flex items-center mb-3">
          <div className="flex items-center" role="img" aria-label={`Avaliação: ${product.rating} de 5 estrelas`}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating || 0)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviews || 0})
          </span>
        </div>
        
        {/* Preços */}
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-gray-900">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
          </div>
          
          {/* Estoque */}
          <div className="text-xs text-gray-500">
            {product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}
          </div>
        </div>
        
        {/* Botão de Ação */}
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.stock === 0}
          aria-label={product.stock > 0 ? 'Adicionar ao carrinho' : 'Produto fora de estoque'}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">{product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}</span>
          <span className="sm:hidden">{product.stock > 0 ? 'Adicionar' : 'Indisponível'}</span>
        </button>
      </div>
    </div>
  );
} 