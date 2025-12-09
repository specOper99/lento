'use client';

import { Coffee, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { CarpetPattern } from '../patterns/CarpetPattern';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b-2 border-border shadow-lg">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Coffee className="w-8 h-8 text-primary transition-transform group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute -inset-2 opacity-0 group-hover:opacity-20 transition-opacity">
                <CarpetPattern variant="medallion" size={48} />
              </div>
            </div>
            <span className="text-2xl font-amiri font-bold text-foreground">
              {t('brand')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className="text-foreground hover:text-secondary font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <LanguageSwitcher currentLocale={locale} />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container-custom py-4 space-y-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-4 rounded-lg hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
