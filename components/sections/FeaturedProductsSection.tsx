import { LazyProductGrid } from '@/components/products/LazyProductGrid';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { getFeaturedProducts } from '@/lib/sanity/client';

interface FeaturedProductsSectionProps {
  locale: string;
}

// Skeleton for products only (no wrapper section)
export function FeaturedProductsSkeleton() {
  return (
    <div className="py-4">
      <ProductGridSkeleton count={3} />
    </div>
  );
}

// Async component that fetches and renders featured products (products only, no wrapper)
export async function FeaturedProductsSection({ locale }: FeaturedProductsSectionProps) {
  // Fetch featured products from Sanity CMS
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="py-4">
      <LazyProductGrid products={featuredProducts} locale={locale} />
    </div>
  );
}
