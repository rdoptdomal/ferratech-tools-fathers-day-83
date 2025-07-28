'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Shield, CreditCard, Award, Truck } from 'lucide-react';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';
import HeroBanner from './HeroBanner';
import { Product } from '@/types';

export default function HomePage() {
  const router = useRouter();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?limit=8');
      const data = await response.json();
      setFeaturedProducts(data.products);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <HeroBanner />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Compras acima de R$ 199</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Garantia</h3>
              <p className="text-gray-600">12 meses em todos os produtos</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Parcelamento</h3>
              <p className="text-gray-600">Até 12x sem juros</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Atendimento</h3>
              <p className="text-gray-600">Suporte especializado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Produtos em Destaque
              </h2>
              <p className="text-gray-600">
                As ferramentas mais vendidas da semana
              </p>
            </div>
            <button
              onClick={() => router.push('/produtos')}
              className="btn-outline"
            >
              Ver Todos
              <ChevronRight className="inline ml-2 h-4 w-4" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Fique por dentro das ofertas!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Cadastre-se e receba em primeira mão nossas promoções exclusivas
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 