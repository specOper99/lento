'use client';

/**
 * DynamicThemeInjector
 * 
 * Injects CSS custom properties based on the site configuration.
 * This enables dynamic theming from environment variables without
 * needing to rebuild the CSS.
 */

import { ThemeColors } from '@/lib/color-scheme';
import { siteConfig } from '@/lib/site-config';
import { useEffect } from 'react';

function applyThemeColors(root: HTMLElement, colors: ThemeColors, isDark: boolean = false) {
  const prefix = isDark ? '' : '';
  
  root.style.setProperty(`${prefix}--color-primary`, colors.primary);
  root.style.setProperty(`${prefix}--color-primary-foreground`, colors.primaryForeground);
  root.style.setProperty(`${prefix}--color-secondary`, colors.secondary);
  root.style.setProperty(`${prefix}--color-secondary-foreground`, colors.secondaryForeground);
  root.style.setProperty(`${prefix}--color-accent`, colors.accent);
  root.style.setProperty(`${prefix}--color-accent-foreground`, colors.accentForeground);
  root.style.setProperty(`${prefix}--color-background`, colors.background);
  root.style.setProperty(`${prefix}--color-foreground`, colors.foreground);
  root.style.setProperty(`${prefix}--color-border`, colors.border);
  root.style.setProperty(`${prefix}--color-muted`, colors.muted);
  root.style.setProperty(`${prefix}--color-muted-foreground`, colors.mutedForeground);
}

export function DynamicThemeInjector() {
  useEffect(() => {
    const root = document.documentElement;
    const { theme } = siteConfig;
    
    // Create a style element for light/dark mode switching
    const styleId = 'dynamic-theme-styles';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    // Generate CSS for both light and dark modes
    styleEl.textContent = `
      :root {
        --color-primary: ${theme.light.primary};
        --color-primary-foreground: ${theme.light.primaryForeground};
        --color-secondary: ${theme.light.secondary};
        --color-secondary-foreground: ${theme.light.secondaryForeground};
        --color-accent: ${theme.light.accent};
        --color-accent-foreground: ${theme.light.accentForeground};
        --color-background: ${theme.light.background};
        --color-foreground: ${theme.light.foreground};
        --color-border: ${theme.light.border};
        --color-muted: ${theme.light.muted};
        --color-muted-foreground: ${theme.light.mutedForeground};
      }

      .dark {
        --color-primary: ${theme.dark.primary};
        --color-primary-foreground: ${theme.dark.primaryForeground};
        --color-secondary: ${theme.dark.secondary};
        --color-secondary-foreground: ${theme.dark.secondaryForeground};
        --color-accent: ${theme.dark.accent};
        --color-accent-foreground: ${theme.dark.accentForeground};
        --color-background: ${theme.dark.background};
        --color-foreground: ${theme.dark.foreground};
        --color-border: ${theme.dark.border};
        --color-muted: ${theme.dark.muted};
        --color-muted-foreground: ${theme.dark.mutedForeground};
      }
    `;

    // Cleanup on unmount
    return () => {
      // Keep the styles - they should persist
    };
  }, []);

  return null;
}

export default DynamicThemeInjector;
