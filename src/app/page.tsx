import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        isFeatured: true
      },
      include: {
        category: true
      },
      take: 8,
      orderBy: [
        { isFeatured: 'desc' },
        { rating: 'desc' }
      ]
    });

    // Garantir que produtos tenham imagens válidas, originalPrice, brand e specifications nunca sejam null
    return products.map(product => {
      const { originalPrice, brand, category, specifications, ...rest } = product;
      return {
        ...rest,
        images: product.images && product.images.length > 0 
          ? product.images 
          : ['https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=800&h=600&fit=crop'],
        originalPrice: originalPrice === null ? undefined : originalPrice,
        brand: brand === null ? 'Sem marca' : brand,
        category: category ? category.name : undefined,
        specifications: Array.isArray(specifications) ? specifications : undefined
      };
    });
  } catch (error) {
    console.error('Erro ao buscar produtos em destaque:', error);
    return [];
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany({
      where: { isActive: true },
      take: 6,
      orderBy: { name: 'asc' }
    });
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
}

export default async function Home() {
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header categories={categories} />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            FerraTech - Ferramentas Profissionais
          </h1>
          
          {/* Produtos em Destaque */}
          {featuredProducts && featuredProducts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Produtos em Destaque ({featuredProducts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
                    <p className="text-lg font-bold text-blue-600">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Categorias */}
          {categories && categories.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Categorias ({categories.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-blue-600 text-white rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description || 'Produtos profissionais'}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 