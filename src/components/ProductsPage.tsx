'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Grid3X3, List, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';

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

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    loadProducts();
  }, [page, search, category, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12'
      });

      if (search) {
        params.append('search', search);
      }

      if (category) {
        params.append('category', category);
      }

      const response = await fetch(`/api/products?${params}`);

      if (!response.ok) {
        throw new Error('Falha ao carregar produtos');
      }

      const data = await response.json();

      setProducts(data.products);
      setTotalPages(data.totalPages);
      setTotalProducts(data.totalProducts);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/produtos?${params.toString()}`);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleViewModeChange = () => {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Erro ao carregar produtos
            </h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={loadProducts}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header da Página */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Todos os Produtos
          </h1>
          <p className="text-gray-600">
            {loading ? "Carregando..." : `${totalProducts} produtos encontrados`}
          </p>
        </div>

        {/* Filtros e Controles */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Busca */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar produtos..."
              defaultValue={search}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Controles */}
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="relevance">Mais Relevantes</option>
              <option value="price_asc">Menor Preço</option>
              <option value="price_desc">Maior Preço</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
            </select>

            <button
              onClick={handleViewModeChange}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {viewMode === 'grid' ? (
                <List className="h-4 w-4" />
              ) : (
                <Grid3X3 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Grid de Produtos */}
        {loading ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid'
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90"
            >
              Voltar ao Início
            </button>
          </div>
        ) : (
          <>
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(pageNum =>
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      Math.abs(pageNum - currentPage) <= 1
                    )
                    .map((pageNum, index, array) => (
                      <div key={pageNum} className="flex items-center">
                        {index > 0 && array[index - 1] !== pageNum - 1 && (
                          <span className="px-2 text-gray-500">...</span>
                        )}
                        <button
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-lg ${
                            pageNum === currentPage
                              ? 'bg-primary text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      </div>
                    ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
} 