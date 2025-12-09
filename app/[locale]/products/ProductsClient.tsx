'use client';

import { Divider } from '@/components/patterns/Divider';
import { ProductCard } from '@/components/products/ProductCard';
import { Category, Product } from '@/lib/types/product';
import { cn } from '@/lib/utils';
import { Filter, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

interface ProductsClientProps {
  products: Product[];
  categories: Category[];
  locale: string;
}

export default function ProductsClient({ products, categories, locale }: ProductsClientProps) {
  const t = useTranslations('products');
  // 'all' or category slug
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategorySlug === 'all' || product.category?.slug === selectedCategorySlug;

      const matchesSearch =
        searchQuery === '' ||
        product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.name.ar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.ar.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategorySlug, searchQuery]);

  return (
    <div className="w-full">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-6xl font-amiri font-bold mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <Divider variant="ornate" />

      {/* Filters */}
      <section className="py-8 bg-background sticky top-20 z-40 border-b border-border/30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground ${locale === 'ar' ? 'right-3' : 'left-3'}`} />
              <input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  'w-full py-3 px-10 rounded-lg border-2 border-border/30',
                  'bg-background text-foreground',
                  'focus:outline-none focus:border-secondary',
                  'transition-colors'
                )}
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-5 h-5 text-muted-foreground hidden md:block" />
              
              {/* All category button */}
              <button
                onClick={() => setSelectedCategorySlug('all')}
                className={cn(
                  'px-4 py-2 rounded-lg font-semibold transition-all',
                  selectedCategorySlug === 'all'
                    ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                )}
              >
                {t('categories.all')}
              </button>
              
              {/* Dynamic category buttons from CMS */}
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategorySlug(category.slug)}
                  className={cn(
                    'px-4 py-2 rounded-lg font-semibold transition-all',
                    selectedCategorySlug === category.slug
                      ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  )}
                >
                  {locale === 'ar' ? category.name.ar : category.name.en}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mt-4 text-sm text-muted-foreground">
            {t('count', {count: filteredProducts.length})}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} locale={locale} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-2xl text-muted-foreground">
                {t('noResults')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

