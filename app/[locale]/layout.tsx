import { DynamicThemeInjector } from '@/components/DynamicThemeInjector';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { locales } from '@/i18n/request';
import { ThemeProvider } from '@/lib/contexts/ThemeContext';
import { siteConfig } from '@/lib/site-config';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Use site config for branding, fall back to translations for localized content
  const t = await getTranslations({ locale, namespace: 'metadata' });
 
  return {
    title: siteConfig.brand.title,
    description: siteConfig.brand.description,
    keywords: siteConfig.brand.keywords,
    openGraph: {
      title: siteConfig.brand.title,
      description: siteConfig.brand.description,
      locale: locale === 'ar' ? 'ar_IQ' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get translations
  const messages = await getMessages();

  // Determine text direction
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <DynamicThemeInjector />
            <div className="flex flex-col min-h-screen">
              <Navbar locale={locale} />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
