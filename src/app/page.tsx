import { Suspense } from 'react';
import { prisma } from '@/lib/prisma';
import HomePage from '@/components/HomePage';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function normalizeSpecifications(spec: any): string[] | undefined {
  if (!spec) return undefined;
  if (Array.isArray(spec) && spec.every((item) => typeof item === 'string')) {
    return spec as string[];
  }
  if (typeof spec === 'object' && !Array.isArray(spec)) {
    // Se for um objeto, transforma em array de "chave: valor"
    return Object.entries(spec).map(([k, v]) => `${k}: ${v}`);
  }
  return undefined;
}

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
        specifications: normalizeSpecifications(specifications)
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
        <Suspense fallback={<div>Carregando...</div>}>
          <HomePage featuredProducts={featuredProducts} categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
} 