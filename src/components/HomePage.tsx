'use client';

import React from 'react';
import { Product } from '@/types';
import HeroBanner from './HeroBanner';
import PromoBanner from './PromoBanner';
import ProductCard from './ProductCard';
import CategoryBanner from './CategoryBanner';

interface HomePageProps {
  featuredProducts?: Product[];
  categories?: any[];
}

export default function HomePage({ featuredProducts = [], categories = [] }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Banners Promocionais */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <PromoBanner
            title="Ferramentas Profissionais"
            subtitle="Até 50% de desconto"
            ctaText="Ver Ofertas"
            ctaLink="/categoria/ferramentas-eletricas"
            discount="50% OFF"
          />
          <PromoBanner
            title="Equipamentos de Segurança"
            subtitle="Proteção garantida"
            ctaText="Ver Produtos"
            ctaLink="/categoria/equipamentos-seguranca"
            discount="30% OFF"
          />
        </div>
      </div>

      {/* Produtos em Destaque */}
      {featuredProducts && featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-lg text-gray-600">
              As melhores ferramentas selecionadas para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <a
              href="/produtos"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Ver Todos os Produtos
            </a>
          </div>
        </section>
      )}

      {/* Categorias */}
      {categories && categories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Nossas Categorias
            </h2>
            <p className="text-lg text-gray-600">
              Encontre exatamente o que você precisa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((category) => (
              <CategoryBanner
                key={category.id}
                title={category.name}
                subtitle={`${category.name} Profissionais`}
                description={`Encontre as melhores ${category.name.toLowerCase()} para seu trabalho.`}
                ctaText="Ver Produtos"
                onCtaClick={() => window.location.href = `/categoria/${category.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 