/**
 * Site Configuration
 * 
 * Central configuration file for all customizable site properties.
 * This enables creating unlimited website clones with different branding,
 * contact info, and theme colors from a single codebase.
 */

import { generateColorScheme, GeneratedTheme, LENTO_BRAND_COLOR } from './color-scheme';

// ============================================
// Type Definitions
// ============================================

export interface BrandConfig {
    /** Display name (e.g., "Lento Coffee") */
    name: string;
    /** Full page title for SEO */
    title: string;
    /** Short tagline */
    tagline: string;
    /** Meta description for SEO */
    description: string;
    /** SEO keywords */
    keywords: string[];
}

export interface ContactConfig {
    address: {
        en: string;
        ar: string;
    };
    phone: string;
    email: string;
    hours?: {
        en: string;
        ar: string;
    };
}

export interface SocialConfig {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
}

export interface SiteConfig {
    brand: BrandConfig;
    contact: ContactConfig;
    social: SocialConfig;
    /** The single brand color that generates the entire color scheme */
    brandColor: string;
    /** Auto-generated theme colors based on brandColor */
    theme: GeneratedTheme;
}

// ============================================
// Environment Variable Helpers
// ============================================

function getEnv(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
}

// ============================================
// Configuration
// ============================================

// Get the brand color from environment or use default
const brandColor = getEnv('NEXT_PUBLIC_BRAND_COLOR', LENTO_BRAND_COLOR);

// Generate the complete color scheme from the brand color
const generatedTheme = generateColorScheme(brandColor);

/**
 * Main site configuration object
 * 
 * All values can be overridden via environment variables for easy customization.
 * This allows deploying multiple sites from the same codebase.
 */
export const siteConfig: SiteConfig = {
    brand: {
        name: getEnv('NEXT_PUBLIC_SITE_NAME', 'Lento Coffee'),
        title: getEnv('NEXT_PUBLIC_SITE_TITLE', 'Lento Coffee - Crafted Slowly, Inspired by Heritage'),
        tagline: getEnv('NEXT_PUBLIC_SITE_TAGLINE', 'Crafted Slowly. Inspired by Heritage.'),
        description: getEnv(
            'NEXT_PUBLIC_SITE_DESCRIPTION',
            'Experience luxury coffee with Arabian carpet aesthetics. Slow-roasted, artisanal coffee blends inspired by traditional craftsmanship.'
        ),
        keywords: getEnv(
            'NEXT_PUBLIC_SITE_KEYWORDS',
            'coffee,luxury coffee,Arabian coffee,artisan coffee,specialty coffee'
        ).split(','),
    },

    contact: {
        address: {
            en: getEnv('NEXT_PUBLIC_ADDRESS_EN', 'Mosul, Iraq'),
            ar: getEnv('NEXT_PUBLIC_ADDRESS_AR', 'الموصل، العراق'),
        },
        phone: getEnv('NEXT_PUBLIC_PHONE', '+964 XXX XXX XXXX'),
        email: getEnv('NEXT_PUBLIC_EMAIL', 'hello@lentocoffee.com'),
        hours: {
            en: getEnv('NEXT_PUBLIC_HOURS_EN', 'Sat - Thu: 8:00 AM - 10:00 PM'),
            ar: getEnv('NEXT_PUBLIC_HOURS_AR', 'السبت - الخميس: 8:00 ص - 10:00 م'),
        },
    },

    social: {
        instagram: getEnv('NEXT_PUBLIC_SOCIAL_INSTAGRAM', ''),
        twitter: getEnv('NEXT_PUBLIC_SOCIAL_TWITTER', ''),
        facebook: getEnv('NEXT_PUBLIC_SOCIAL_FACEBOOK', ''),
        tiktok: getEnv('NEXT_PUBLIC_SOCIAL_TIKTOK', ''),
        youtube: getEnv('NEXT_PUBLIC_SOCIAL_YOUTUBE', ''),
    },

    brandColor,
    theme: generatedTheme,
};

// ============================================
// Utility Functions
// ============================================

/**
 * Get translated contact address based on locale
 */
export function getContactAddress(locale: string): string {
    return locale === 'ar' ? siteConfig.contact.address.ar : siteConfig.contact.address.en;
}

/**
 * Get translated hours based on locale
 */
export function getContactHours(locale: string): string | undefined {
    if (!siteConfig.contact.hours) return undefined;
    return locale === 'ar' ? siteConfig.contact.hours.ar : siteConfig.contact.hours.en;
}

/**
 * Get active social links (non-empty ones)
 */
export function getActiveSocialLinks(): Partial<SocialConfig> {
    const { social } = siteConfig;
    return Object.fromEntries(
        Object.entries(social).filter(([, value]) => value && value.length > 0)
    );
}

/**
 * Generate metadata object for Next.js pages
 */
export function getSiteMetadata(locale: string = 'en') {
    return {
        title: siteConfig.brand.title,
        description: siteConfig.brand.description,
        keywords: siteConfig.brand.keywords.join(', '),
        openGraph: {
            title: siteConfig.brand.title,
            description: siteConfig.brand.description,
            locale: locale === 'ar' ? 'ar_IQ' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: siteConfig.brand.title,
            description: siteConfig.brand.description,
        },
    };
}
