import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProductDetailPage from '@/components/ProductDetailPage';

interface ProductDetailProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductDetailProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${params.slug}`);
    if (!response.ok) {
      return {
        title: 'Produto não encontrado',
        description: 'O produto solicitado não foi encontrado.'
      };
    }

    const product = await response.json();

    return {
      title: `${product.name} | FerraTech`,
      description: product.shortDescription || product.description,
      openGraph: {
        title: `${product.name} | FerraTech`,
        description: product.shortDescription || product.description,
        images: product.images,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Produto | FerraTech',
      description: 'Detalhes do produto.'
    };
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailPage slug={params.slug} />
    </Suspense>
  );
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