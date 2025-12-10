'use client';

/**
 * ConfigurableBrand Component
 * 
 * Displays the brand name from site configuration.
 * Use this in place of hardcoded brand names or translation keys
 * for the main brand name display.
 */

import { siteConfig } from '@/lib/site-config';

interface ConfigurableBrandProps {
  className?: string;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';
}

export function ConfigurableBrand({ 
  className = '', 
  as: Component = 'span' 
}: ConfigurableBrandProps) {
  return (
    <Component className={className}>
      {siteConfig.brand.name}
    </Component>
  );
}

/**
 * ConfigurableTagline Component
 * Displays the site tagline from configuration.
 */
export function ConfigurableTagline({ 
  className = '', 
  as: Component = 'span' 
}: ConfigurableBrandProps) {
  return (
    <Component className={className}>
      {siteConfig.brand.tagline}
    </Component>
  );
}

export default ConfigurableBrand;
