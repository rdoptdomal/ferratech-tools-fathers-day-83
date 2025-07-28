'use client';

import React from 'react';
import { Product } from '@/types';
import { Star, Truck, Shield, RotateCcw, Heart, Share2 } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  // Dados estruturados para SEO
  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images.length > 0 ? product.images : ['/placeholder.svg'],
    description: product.shortDescription || product.description,
    sku: product.sku || product.id,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://www.ferratech.shop/produto/${product.slug}`,
      priceCurrency: 'BRL',
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'FerraTech',
        url: 'https://www.ferratech.shop'
      }
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews || 0,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    category: product.category?.name,
    mpn: product.sku || product.id,
    gtin: product.sku || product.id,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-600">Home</a>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <a href="/produtos" className="hover:text-blue-600">Produtos</a>
              </li>
              {product.category && (
                <>
                  <li className="flex items-center">
                    <span className="mx-2">/</span>
                    <a href={`/categoria/${product.category.slug}`} className="hover:text-blue-600">
                      {product.category.name}
                    </a>
                  </li>
                </>
              )}
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-900">{product.name}</span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Galeria de Imagens */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={product.images[0] || '/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square bg-white rounded-lg overflow-hidden shadow">
                      <img
                        src={image}
                        alt={`${product.name} - Imagem ${index + 2}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do Produto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
                
                {/* Avaliação */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating || 0)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} avaliações)
                  </span>
                </div>
              </div>

              {/* Preços */}
              <div className="space-y-2">
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-gray-900">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="inline-block bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Estoque */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-2 ${
                    product.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm text-gray-600">
                    {product.stock > 0 ? `${product.stock} unidades em estoque` : 'Fora de estoque'}
                  </span>
                </div>
              </div>

              {/* Descrição Curta */}
              {product.shortDescription && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h3>
                  <p className="text-gray-600">{product.shortDescription}</p>
                </div>
              )}

              {/* Ações */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    disabled={product.stock === 0}
                  >
                    {product.stock > 0 ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                  </button>
                  <button
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    aria-label="Adicionar aos favoritos"
                  >
                    <Heart className="w-6 h-6 text-gray-600" />
                  </button>
                  <button
                    className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    aria-label="Compartilhar produto"
                  >
                    <Share2 className="w-6 h-6 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Benefícios */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center">
                  <Truck className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Entrega Rápida</h4>
                    <p className="text-sm text-gray-600">Em até 2 dias úteis</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Garantia</h4>
                    <p className="text-sm text-gray-600">12 meses de garantia</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RotateCcw className="w-6 h-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900">Troca Fácil</h4>
                    <p className="text-sm text-gray-600">30 dias para troca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição Detalhada */}
          {product.description && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Descrição Detalhada</h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Especificações */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificações Técnicas</h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Características */}
          {product.features && product.features.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Características</h2>
              <div className="bg-white rounded-lg shadow-lg p-8">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
} 