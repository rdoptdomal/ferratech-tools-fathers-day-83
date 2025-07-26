import { Card, CardContent } from "@/components/ui/card";

interface ProductSkeletonProps {
  variant?: "default" | "compact";
  count?: number;
}

const ProductSkeleton = ({ variant = "default", count = 1 }: ProductSkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <Card key={index} className="group relative overflow-hidden border-2 border-border animate-pulse">
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <div className="relative overflow-hidden">
          <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
          
          {/* Badge Skeleton */}
          <div className="absolute top-3 left-3">
            <div className="w-12 h-6 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Category Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-3 bg-gray-200 rounded"></div>
          </div>

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="w-12 h-3 bg-gray-200 rounded"></div>
          </div>

          {/* Specs Skeleton */}
          {variant === "default" && (
            <div className="flex flex-wrap gap-2">
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
              <div className="w-20 h-6 bg-gray-200 rounded"></div>
              <div className="w-14 h-6 bg-gray-200 rounded"></div>
            </div>
          )}

          {/* Price Skeleton */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-6 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>

          {/* Features Skeleton */}
          {variant === "default" && (
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-12 h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-200 rounded"></div>
                <div className="w-16 h-3 bg-gray-200 rounded"></div>
              </div>
            </div>
          )}

          {/* Actions Skeleton */}
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
            <div className="w-10 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  ));

  if (variant === "compact") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {skeletons.map((skeleton, index) => (
          <Card key={index} className="group relative overflow-hidden border-2 border-border animate-pulse">
            <CardContent className="p-4">
              <div className="relative mb-3">
                <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
                <div className="absolute top-2 left-2 w-8 h-4 bg-gray-300 rounded"></div>
              </div>
              
              <div className="space-y-2">
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="w-8 h-3 bg-gray-200 rounded"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="w-16 h-5 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skeletons}
    </div>
  );
};

export default ProductSkeleton; 