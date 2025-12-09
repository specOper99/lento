import { CarpetPattern } from '@/components/patterns/CarpetPattern';
import { Divider } from '@/components/patterns/Divider';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/Button';
import { getProductById, getProducts } from '@/lib/sanity/client';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Flame, Package, Star } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, id } = await params;
  
  const t = await getTranslations('products');
  const tCommon = await getTranslations('common');

  // Fetch product from Sanity
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const name = locale === 'ar' ? product.name.ar : product.name.en;
  const description = locale === 'ar' ? product.description.ar : product.description.en;
  
  // Get the first image URL
  const imageUrl = product.images?.[0] || null;
  const hasImage = imageUrl && imageUrl.length > 0;

  // Get related products (same category, excluding current)
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category?.slug === product.category?.slug && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="w-full">
      {/* Back Button */}
      <div className="container-custom py-6">
        <Link href={`/${locale}/products`}>
          <Button variant="ghost" size="sm" className="group">
            <ArrowLeft className={`w-4 h-4 ${locale === 'ar' ? 'ml-2 rotate-180' : 'mr-2'} transition-transform group-hover:-translate-x-1`} />
            {tCommon('backHome')}
          </Button>
        </Link>
      </div>

      {/* Product Details */}
      <section className="py-12 relative">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="diamond" className="w-full h-full" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden ornate-border">
              {hasImage ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <CarpetPattern variant="medallion" size={300} className="opacity-20" />
                </div>
              )}
              
              {/* Featured Badge */}
              {product.featured && (
                <div className="absolute top-6 left-6 z-10 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold">
                  ★ {t('featured')}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category */}
              <div className="inline-block px-4 py-2 bg-muted rounded-full">
                <span className="text-sm font-semibold text-secondary uppercase">
                  {locale === 'ar' ? product.category?.name?.ar : product.category?.name?.en}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-amiri font-bold">
                {name}
              </h1>

              {/* Rating & Stock */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-secondary text-secondary" />
                  <span className="text-2xl font-bold">{product.rating}</span>
                  <span className="text-muted-foreground">/ 5</span>
                </div>
                {product.inStock ? (
                  <span className="flex items-center gap-2 text-emerald-600">
                    <Package className="w-5 h-5" />
                    {t('inStock')}
                  </span>
                ) : (
                  <span className="text-red-600">{t('outOfStock')}</span>
                )}
              </div>

              {/* Price */}
              <div className="text-5xl font-bold text-primary">
                {formatPrice(product.price, locale)}
              </div>

              <Divider variant="simple" />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-amiri font-bold mb-4">{t('description')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Attributes */}
              <div className="grid grid-cols-2 gap-4">
                {product.roastLevel && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Flame className="w-5 h-5 text-secondary" />
                      <span className="font-semibold">{t('roastLevel')}</span>
                    </div>
                    <p className="text-muted-foreground capitalize">{product.roastLevel}</p>
                  </div>
                )}
                {product.origin && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-secondary" />
                      <span className="font-semibold">{t('origin')}</span>
                    </div>
                    <p className="text-muted-foreground">{product.origin}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <>
          <Divider variant="ornate" />
          <section className="py-16 bg-muted/30">
            <div className="container-custom">
              <h2 className="text-3xl md:text-4xl font-amiri font-bold text-center mb-12">
                {t('relatedProducts')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    locale={locale}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
