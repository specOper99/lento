import { Flying3DCoffeeCup } from '@/components/effects/Flying3DCoffeeCup';
import { MagicSparkles } from '@/components/effects/MagicSparkles';
import { CarpetPattern } from '@/components/patterns/CarpetPattern';
import { Divider } from '@/components/patterns/Divider';
import { FlyingCarpet } from '@/components/patterns/FlyingCarpet';
import { FeaturedProductsSection, FeaturedProductsSkeleton } from '@/components/sections/FeaturedProductsSection';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Suspense } from 'react';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  
  // Fetch translations for server component
  const t = await getTranslations('hero');
  const tAbout = await getTranslations('about');
  
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden carpet-texture">
        {/* Magic Sparkles */}
        <MagicSparkles count={30} />
        
        {/* Flying 3D Arabic Ornament */}
        <Flying3DCoffeeCup />
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="geometric" className="w-full h-full" />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />

        {/* Content */}
        <div className="relative z-10 container-custom text-center py-20">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Decorative Top Pattern */}
            <div className="flex justify-center mb-8">
              <CarpetPattern variant="medallion" size={120} className="opacity-60" />
            </div>

            <h1 className="text-5xl md:text-7xl font-amiri font-bold leading-tight text-border-bg">
              {t('title')}
            </h1>

            <p className="text-2xl md:text-3xl text-secondary font-semibold">
              {t('subtitle')}
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('tagline')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href={`/${locale}/products`}>
                <Button size="lg" variant="primary" className="group">
                  {t('cta')}
                  <ArrowRight className={`w-5 h-5 ${locale === 'ar' ? 'mr-2 rotate-180' : 'ml-2'} transition-transform group-hover:translate-x-1`} />
                </Button>
              </Link>
              <Link href={`/${locale}/about`}>
                <Button size="lg" variant="outline">
                  {t('learnMore')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-24 text-background">
            <path
              fill="currentColor"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Featured Products Section - Streamed with Suspense */}
      <Suspense fallback={<FeaturedProductsSkeleton />}>
        <FeaturedProductsSection locale={locale} />
      </Suspense>

      {/* Brand Story Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <CarpetPattern variant="diamond" className="w-full h-full" />
        </div>
        <MagicSparkles count={15} />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-amiri font-bold">
              {tAbout('story')}
            </h2>
            
            {/* Flying Carpet with Story */}
            <FlyingCarpet variant="large" className="mx-auto group animate-wave">
              <p className="text-lg leading-relaxed">
                {tAbout('storyText')}
              </p>
            </FlyingCarpet>

            <Divider variant="ornate" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              {[
                { 
                  key: 'quality', 
                  gradient: 'from-amber-500/15 to-orange-500/5',
                  accentColor: 'text-amber-500',
                  pattern: (
                    <svg className="w-20 h-20" viewBox="0 0 100 100" fill="currentColor" opacity="0.2">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="50" cy="50" r="10"/>
                    </svg>
                  )
                },
                { 
                  key: 'tradition', 
                  gradient: 'from-primary/15 to-secondary/5',
                  accentColor: 'text-primary',
                  pattern: (
                    <svg className="w-20 h-20" viewBox="0 0 100 100" fill="currentColor" opacity="0.2">
                      <polygon points="50,10 90,90 10,90" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <polygon points="50,30 75,75 25,75" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="50" cy="55" r="8"/>
                    </svg>
                  )
                },
                { 
                  key: 'craftsmanship', 
                  gradient: 'from-emerald-500/15 to-teal-500/5',
                  accentColor: 'text-emerald-500',
                  pattern: (
                    <svg className="w-20 h-20" viewBox="0 0 100 100" fill="currentColor" opacity="0.2">
                      <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
                      <rect x="30" y="30" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
                      <circle cx="50" cy="50" r="6"/>
                    </svg>
                  )
                },
              ].map((item, index) => (
                <div 
                  key={item.key}
                  className={`group relative p-6 pb-10 rounded-xl bg-gradient-to-br ${item.gradient} border border-border/50 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 animate-slide-up overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Unique pattern at bottom-right */}
                  <div className={`absolute -bottom-2 -right-2 ${item.accentColor} opacity-50 group-hover:opacity-80 transition-opacity`}>
                    {item.pattern}
                  </div>
                  
                  <div className="relative z-10 pr-6">
                    <h3 className="text-2xl font-amiri font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {tAbout(item.key)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tAbout(`${item.key}Text`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <Link href={`/${locale}/about`}>
                <Button size="lg" variant="secondary">
                  {tAbout('mission')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
