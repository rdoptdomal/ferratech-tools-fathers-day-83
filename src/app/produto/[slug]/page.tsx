import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import ProductDetailPage from '@/components/ProductDetailPage';

// Função para buscar o produto
async function getProduct(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: { category: true }
    });
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return {
      title: 'Produto não encontrado | FerraTech',
      description: 'O produto que você está procurando não foi encontrado.',
    };
  }

  return {
    title: `${product.name} | FerraTech`,
    description: product.shortDescription || product.description?.substring(0, 160) || `Confira ${product.name} na FerraTech. Melhores preços e qualidade garantida.`,
    keywords: `${product.name}, ${product.brand}, ferramentas, ${product.category?.name}, FerraTech`,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description?.substring(0, 160),
      images: product.images.length > 0 ? product.images : ['/hero-banner.jpg'],
      type: 'product',
      url: `https://www.ferratech.shop/produto/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.shortDescription || product.description?.substring(0, 160),
      images: product.images.length > 0 ? product.images : ['/hero-banner.jpg'],
    },
    alternates: {
      canonical: `https://www.ferratech.shop/produto/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <p className="text-gray-600 mb-6">O produto que você está procurando não existe ou foi removido.</p>
          <a href="/produtos" className="text-blue-600 hover:text-blue-800">
            Ver todos os produtos
          </a>
        </div>
      </div>
    );
  }

  return <ProductDetailPage product={product} />;
}

function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Imagem */}
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            
            {/* Informações */}
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 