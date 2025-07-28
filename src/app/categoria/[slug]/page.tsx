import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import CategoryPage from '@/components/CategoryPage';

interface CategoryPageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
    const categories = await response.json();
    const category = categories.find((cat: any) => cat.slug === params.slug);

    if (!category) {
      return {
        title: 'Categoria não encontrada',
        description: 'A categoria solicitada não foi encontrada.'
      };
    }

    return {
      title: `${category.name} | FerraTech`,
      description: category.description || `Explore nossa seleção de ${category.name.toLowerCase()}. Encontre os melhores produtos com qualidade e preços competitivos.`,
      openGraph: {
        title: `${category.name} | FerraTech`,
        description: category.description || `Explore nossa seleção de ${category.name.toLowerCase()}.`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Categoria | FerraTech',
      description: 'Explore nossa seleção de produtos.'
    };
  }
}

export default function CategoryPageWrapper({ params, searchParams }: CategoryPageProps) {
  return (
    <Suspense fallback={<CategoryPageSkeleton />}>
      <CategoryPage slug={params.slug} />
    </Suspense>
  );
}

function CategoryPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 