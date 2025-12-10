'use client';

import { siteConfig } from '@/lib/site-config';
import { Coffee, Menu, Sparkles, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CarpetPattern } from '../patterns/CarpetPattern';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for dynamic navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <>
      <nav 
        className={`
          sticky top-0 z-50 w-full transition-all duration-500 ease-out
          ${isScrolled 
            ? 'py-2 bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border/50' 
            : 'py-4 bg-background/60 backdrop-blur-md border-b border-border/30'
          }
        `}
      >
        {/* Decorative top border line with gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />
        
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo with enhanced animation */}
            <Link 
              href={`/${locale}`}
              className="flex items-center gap-3 group relative"
            >
              {/* Animated glow background */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-secondary/20 via-primary/10 to-secondary/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              {/* Logo container with subtle styling */}
              <div className="relative">
                {/* Inner coffee icon container */}
                <div className="relative p-2 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 group-hover:from-primary/15 group-hover:to-secondary/15 transition-all duration-300">
                  <Coffee className="w-6 h-6 text-primary group-hover:text-secondary transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  
                  {/* Sparkle decoration */}
                  <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
                </div>
              </div>
              
              {/* Brand name with elegant styling */}
              <div className="flex flex-col relative">
                <span className="text-xl sm:text-2xl font-amiri font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent group-hover:animate-shimmer transition-all duration-300">
                  {siteConfig.brand.name}
                </span>
                {/* Decorative underline */}
                <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-secondary via-primary to-secondary transition-all duration-500 ease-out" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href as any}
                  className="relative px-5 py-2.5 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Text with hover effect */}
                  <span className="relative z-10 text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                    {link.label}
                  </span>
                  
                  {/* Golden underline animation */}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent group-hover:w-4/5 transition-all duration-300 ease-out" />
                  
                  {/* Hover background */}
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-secondary/0 to-primary/0 group-hover:from-secondary/5 group-hover:to-primary/5 transition-all duration-300" />
                  
                  {/* Decorative dots on hover */}
                  <span className="absolute top-1/2 -translate-y-1/2 left-1 w-1 h-1 rounded-full bg-secondary opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                  <span className="absolute top-1/2 -translate-y-1/2 right-1 w-1 h-1 rounded-full bg-secondary opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Theme & Language toggles - clean, borderless design */}
              <div className="flex items-center rounded-lg bg-muted/30 backdrop-blur-sm">
                <ThemeToggle />
                <div className="w-px h-5 bg-border/30" />
                <LanguageSwitcher currentLocale={locale} />
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden relative p-2.5 rounded-lg hover:bg-muted/50 transition-all duration-300 group"
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5">
                  <X 
                    className={`absolute inset-0 w-5 h-5 text-foreground transition-all duration-300 ${
                      mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                    }`}
                  />
                  <Menu 
                    className={`absolute inset-0 w-5 h-5 text-foreground transition-all duration-300 ${
                      mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative bottom accent */}
        <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-0'}`} />
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-500 lg:hidden ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div 
          className={`absolute top-0 ${locale === 'ar' ? 'left-0' : 'right-0'} h-full w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-x border-border/30 shadow-2xl transition-transform duration-500 ease-out ${
            mobileMenuOpen 
              ? 'translate-x-0' 
              : locale === 'ar' ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Menu Header */}
          <div className="p-6 border-b border-border/30">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                <Coffee className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-amiri font-bold text-foreground">
                {siteConfig.brand.name}
              </span>
            </div>
          </div>
          
          {/* Menu Links */}
          <div className="p-4 space-y-1">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href as any}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-4 py-4 px-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group ${
                  mobileMenuOpen ? 'animate-slide-up' : ''
                }`}
                style={{ animationDelay: `${index * 75}ms` }}
              >
                {/* Decorative icon */}
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center group-hover:from-secondary/20 group-hover:to-primary/20 transition-all duration-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary group-hover:scale-150 transition-transform duration-300" />
                </div>
                
                {/* Link text */}
                <span className="text-lg font-medium text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                  {link.label}
                </span>
                
                {/* Arrow indicator */}
                <div className={`${locale === 'ar' ? 'mr-auto rotate-180' : 'ml-auto'} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1`}>
                  <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Decorative Pattern at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-center">
              <CarpetPattern variant="geometric" size={320} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
