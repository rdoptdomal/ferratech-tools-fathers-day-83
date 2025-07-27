import { Suspense } from 'react';
import HomePage from '@/components/HomePage';

export default function Page() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <HomePage />
    </Suspense>
  );
}

function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="bg-gradient-to-r from-primary to-primary/90 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="h-12 bg-white/20 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-white/20 rounded w-1/2 mb-8"></div>
            <div className="h-4 bg-white/20 rounded w-2/3"></div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="container mx-auto px-4 py-16">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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