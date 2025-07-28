'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';
import { Product } from '@/types';

interface CategoryPageProps {
  slug: string;
}

export default function CategoryPage({ slug }: CategoryPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');

  const page = parseInt(searchParams?.get('page') || '1');
  const search = searchParams?.get('search') || '';

  useEffect(() => {
    loadCategoryAndProducts();
  }, [slug, page, search, sortBy]);

  const loadCategoryAndProducts = async () => {
    try {
      setLoading(true);
      
      // Carregar categoria
      const categoryResponse = await fetch(`/api/categories/${slug}`);
      if (categoryResponse.ok) {
        const categoryData = await categoryResponse.json();
        setCategory(categoryData);
      }

      // Carregar produtos da categoria
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        category: slug,
        ...(search && { search }),
        ...(sortBy && { sortBy })
      });

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Erro ao carregar produtos');
      }

      const data = await response.json();
      setProducts(data.products || []);
      setTotalPages(data.totalPages || 1);
      setTotalProducts(data.totalProducts || 0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('page', newPage.toString());
    router.push(`/categoria/${slug}?${params.toString()}`);
  };

  const handleSort = (sort: string) => {
    setSortBy(sort);
    const params = new URLSearchParams(searchParams?.toString() || '');
    params.set('sortBy', sort);
    params.set('page', '1');
    router.push(`/categoria/${slug}?${params.toString()}`);
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar categoria</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Tentar novamente
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
        {/* Header da Categoria */}
        {category && (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
            {category.description && (
              <p className="text-gray-600 mb-4">{category.description}</p>
            )}
            <p className="text-gray-600">
              {totalProducts} produtos encontrados
            </p>
          </div>
        )}

        {/* Filtros e Ordenação */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="relevance">Mais relevantes</option>
              <option value="price_asc">Menor preço</option>
              <option value="price_desc">Maior preço</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
              <option value="newest">Mais recentes</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleViewModeChange}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title={viewMode === 'grid' ? 'Visualização em lista' : 'Visualização em grade'}
            >
              {viewMode === 'list' ? (
                <Grid className="h-4 w-4" />
              ) : (
                <List className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Produtos */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-4">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isCurrentPage = pageNum === currentPage;
              const isNearCurrent = Math.abs(pageNum - currentPage) <= 2;

              if (isCurrentPage || isNearCurrent || pageNum === 1 || pageNum === totalPages) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 border rounded-lg transition-colors ${
                      isCurrentPage
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                return <span key={pageNum} className="px-2">...</span>;
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 