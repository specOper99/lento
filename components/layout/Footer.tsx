import { getActiveSocialLinks, getContactAddress, siteConfig } from '@/lib/site-config';
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { CarpetCorner } from '../patterns/CarpetCorner';
import { CarpetPattern } from '../patterns/CarpetPattern';
import { Divider } from '../patterns/Divider';

interface FooterProps {
  locale: string;
}

// Map of social platform to icon component
const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
};

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tContact = useTranslations('contact');

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}`, label: tNav('home') },
    { href: `/${locale}/products`, label: tNav('products') },
    { href: `/${locale}/about`, label: tNav('about') },
    { href: `/${locale}/contact`, label: tNav('contact') },
  ];

  // Get active social links from site config
  const activeSocials = getActiveSocialLinks();
  const socialLinks = Object.entries(activeSocials)
    .filter(([, url]) => url && url.length > 0)
    .map(([platform, url]) => ({
      icon: socialIcons[platform] || Instagram,
      href: url as string,
      label: platform.charAt(0).toUpperCase() + platform.slice(1),
    }));

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted border-t-2 border-border overflow-hidden">
      {/* Decorative Carpet Corners */}
      <CarpetCorner position="top-left" size={150} />
      <CarpetCorner position="top-right" size={150} />
      
      {/* Top Carpet Pattern */}
      <div className="absolute top-0 left-0 right-0 h-4 overflow-hidden opacity-30">
        <CarpetPattern variant="border" className="w-full h-full" />
      </div>

      <div className="container-custom pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-amiri font-bold mb-4">
              {siteConfig.brand.name}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              {siteConfig.brand.tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-all hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-amiri font-bold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href as any}
                    className="text-muted-foreground hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-amiri font-bold mb-4">{tNav('contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {getContactAddress(locale)}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {siteConfig.contact.phone}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  {siteConfig.contact.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Divider variant="simple" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} {siteConfig.brand.name}. {t('rights')}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-secondary transition-colors">
              {t('privacy')}
            </Link>
            <Link href="#" className="hover:text-secondary transition-colors">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Carpet Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-2 overflow-hidden opacity-20">
        <div className="h-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </footer>
  );
}
